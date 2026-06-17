const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

// Extract the handleForm function from index.html
const html = fs.readFileSync('index.html', 'utf8');
const scriptContents = html.match(/<script>([\s\S]*?)<\/script>/g);
let handleFormCode = null;
for (let script of scriptContents) {
  if (script.includes('function handleForm(e)')) {
    const handleFormMatch = script.match(/(function handleForm\(e\) \{[\s\S]*?\n\})/);
    if (handleFormMatch) {
      handleFormCode = handleFormMatch[1];
    }
  }
}

if (!handleFormCode) {
  throw new Error("Could not find handleForm function");
}

// Define test suite
test('handleForm testing suite', async (t) => {
  // Common mocks setup before each test
  let globalFetchMock;
  let globalAlertMock;
  let domElements;

  t.beforeEach(() => {
    // Reset DOM mocks
    domElements = {
      'f-btn': { textContent: 'Send Message \u2192', disabled: false },
      'f-inner': { style: { display: 'block' } },
      'f-success': { classList: { classes: [], add: function(c) { this.classes.push(c); } } }
    };

    global.document = {
      getElementById: (id) => domElements[id]
    };

    global.FormData = class {
      constructor(target) {
        this.data = target ? target.data : {};
      }
      entries() {
        return Object.entries(this.data);
      }
      *[Symbol.iterator]() {
        for (let entry of this.entries()) {
          yield entry;
        }
      }
    };

    global.URLSearchParams = class {
      constructor(formData) {
        this.params = formData ? [...formData] : [];
      }
      toString() {
        return this.params.map(([k, v]) => `${k}=${v}`).join('&');
      }
    };

    // Keep references to global fetch and alert
    globalFetchMock = undefined;
    globalAlertMock = undefined;

    global.fetch = async (url, options) => {
      if (globalFetchMock) return globalFetchMock(url, options);
      return { ok: true };
    };

    global.alert = (msg) => {
      if (globalAlertMock) globalAlertMock(msg);
    };

    // Load handleForm function globally
    const script = new Function('return (' + handleFormCode + ')');
    global.handleForm = script();
  });

  t.afterEach(() => {
    delete global.document;
    delete global.FormData;
    delete global.URLSearchParams;
    delete global.fetch;
    delete global.alert;
    delete global.handleForm;
  });

  await t.test('successful form submission', async () => {
    // Arrange
    let fetchCalled = false;
    let fetchUrl = '';
    let fetchOptions = null;

    globalFetchMock = async (url, options) => {
      fetchCalled = true;
      fetchUrl = url;
      fetchOptions = options;
      return { ok: true };
    };

    const mockEvent = {
      preventDefault: () => {},
      target: { data: { name: 'John Doe', email: 'john@example.com' } }
    };

    // Act
    await global.handleForm(mockEvent); // handleForm doesn't return a promise but fetch inside it does

    // wait a tick for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert
    assert.strictEqual(fetchCalled, true);
    assert.strictEqual(fetchUrl, 'https://formsubmit.co/ajax/info@emergenceadvisors.com');
    assert.strictEqual(fetchOptions.method, 'POST');
    assert.strictEqual(fetchOptions.headers['Content-Type'], 'application/json');
    assert.strictEqual(fetchOptions.body, '{"name":"John Doe","email":"john@example.com"}');

    assert.strictEqual(domElements['f-btn'].disabled, true);
    assert.strictEqual(domElements['f-btn'].textContent, 'Sending...');

    assert.strictEqual(domElements['f-inner'].style.display, 'none');
    assert.ok(domElements['f-success'].classList.classes.includes('show'));
  });

  await t.test('server error handling (non-200 OK)', async () => {
    // Arrange
    globalFetchMock = async () => {
      return { ok: false };
    };

    let alertCalled = false;
    let alertMessage = '';
    globalAlertMock = (msg) => {
      alertCalled = true;
      alertMessage = msg;
    };

    const mockEvent = {
      preventDefault: () => {},
      target: { data: {} }
    };

    // Act
    await global.handleForm(mockEvent);

    // wait a tick for promise rejection
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert
    assert.strictEqual(alertCalled, true);
    assert.ok(alertMessage.includes('Something went wrong'));

    assert.strictEqual(domElements['f-btn'].disabled, false);
    assert.strictEqual(domElements['f-btn'].textContent, 'Send Message \u2192');

    // The success UI shouldn't be shown
    assert.strictEqual(domElements['f-inner'].style.display, 'block');
    assert.strictEqual(domElements['f-success'].classList.classes.length, 0);
  });

  await t.test('network error handling (fetch throws)', async () => {
    // Arrange
    globalFetchMock = async () => {
      throw new Error("Network error");
    };

    let alertCalled = false;
    globalAlertMock = () => {
      alertCalled = true;
    };

    const mockEvent = {
      preventDefault: () => {},
      target: { data: {} }
    };

    // Act
    await global.handleForm(mockEvent);

    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert
    assert.strictEqual(alertCalled, true);
    assert.strictEqual(domElements['f-btn'].disabled, false);
    assert.strictEqual(domElements['f-btn'].textContent, 'Send Message \u2192');
  });
});
