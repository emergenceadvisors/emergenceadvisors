const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

function setupMocks(initialToggleClasses = [], initialNavClasses = [], initialAriaExpanded = 'false') {
  global.mobToggle = {
    classList: {
      classes: [...initialToggleClasses],
      remove: function(cls) {
        this.classes = this.classes.filter(c => c !== cls);
      },
      contains: function(cls) {
          return this.classes.includes(cls);
      }
    },
    attributes: { 'aria-expanded': initialAriaExpanded },
    setAttribute: function(attr, val) {
      this.attributes[attr] = val;
    },
    getAttribute: function(attr) {
        return this.attributes[attr];
    }
  };

  global.mobNav = {
    classList: {
      classes: [...initialNavClasses],
      remove: function(cls) {
        this.classes = this.classes.filter(c => c !== cls);
      },
      contains: function(cls) {
          return this.classes.includes(cls);
      }
    }
  };
}

test('closeMob function tests', async (t) => {
  const scriptContent = fs.readFileSync('main.js', 'utf8');
  const match = scriptContent.match(/function closeMob\(\) \{[\s\S]*?\}/);
  assert.ok(match, 'closeMob function not found in main.js');

  // Evaluate the function into the current scope
  eval(match[0]);

  await t.test('removes open class and sets aria-expanded to false when mobile menu is open', () => {
    setupMocks(['open'], ['open'], 'true');
    closeMob();

    assert.strictEqual(mobToggle.classList.contains('open'), false, 'mobToggle should not have open class');
    assert.strictEqual(mobNav.classList.contains('open'), false, 'mobNav should not have open class');
    assert.strictEqual(mobToggle.getAttribute('aria-expanded'), 'false', 'aria-expanded should be false');
  });

  await t.test('does not error when classes are already removed', () => {
    setupMocks([], [], 'false');
    closeMob();

    assert.strictEqual(mobToggle.classList.contains('open'), false, 'mobToggle should still not have open class');
    assert.strictEqual(mobNav.classList.contains('open'), false, 'mobNav should still not have open class');
    assert.strictEqual(mobToggle.getAttribute('aria-expanded'), 'false', 'aria-expanded should still be false');
  });

  await t.test('preserves other classes when removing open', () => {
    setupMocks(['open', 'other-class'], ['nav-class', 'open'], 'true');
    closeMob();

    assert.strictEqual(mobToggle.classList.contains('open'), false, 'mobToggle should not have open class');
    assert.strictEqual(mobToggle.classList.contains('other-class'), true, 'mobToggle should still have other class');
    assert.strictEqual(mobNav.classList.contains('open'), false, 'mobNav should not have open class');
    assert.strictEqual(mobNav.classList.contains('nav-class'), true, 'mobNav should still have other class');
    assert.strictEqual(mobToggle.getAttribute('aria-expanded'), 'false', 'aria-expanded should be false');
  });
});
