const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Mock IntersectionObserver before initializing JSDOM
    class IntersectionObserver {
      constructor(callback, options) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.IntersectionObserver = IntersectionObserver;
      }
    });
    document = dom.window.document;
    window = dom.window;

    // Load main.js manually since JSDOM doesn't load external scripts automatically by default
    const scriptContent = fs.readFileSync(path.resolve(__dirname, '../main.js'), 'utf8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptContent;
    document.body.appendChild(scriptEl);
  });

  describe('handleForm', () => {
    let mockFetch;
    let btn;
    let inner;
    let success;
    let mockEvent;

    beforeEach(() => {
      mockFetch = jest.fn();
      window.fetch = mockFetch;
      window.alert = jest.fn();

      // Get elements
      btn = document.getElementById('f-btn');
      inner = document.getElementById('f-inner');
      success = document.getElementById('f-success');

      mockEvent = {
        preventDefault: jest.fn(),
        target: document.querySelector('form[name="contact"]')
      };
    });

    it('handles form submission error correctly', async () => {
      // Mock fetch to simulate server error
      mockFetch.mockResolvedValueOnce({
        ok: false
      });

      // Call the form handler
      await window.handleForm(mockEvent);

      // Verify the error handling behavior
      expect(mockFetch).toHaveBeenCalled();

      // Wait for promise chain
      await new Promise(process.nextTick);

      expect(btn.textContent).toBe('Send Message \u2192');
      expect(btn.disabled).toBe(false);
      expect(window.alert).toHaveBeenCalledWith('Something went wrong. Email info@emergenceadvisors.com or call (949) 409-5407.');
      expect(inner.style.display).not.toBe('none'); // ensure it doesn't hide the form
      expect(success.classList.contains('show')).toBe(false); // ensure it doesn't show success
    });

    it('handles form submission fetch rejection correctly', async () => {
      // Mock fetch to simulate network error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      // Call the form handler
      await window.handleForm(mockEvent);

      // Verify the error handling behavior
      expect(mockFetch).toHaveBeenCalled();

      // Wait for promise chain
      await new Promise(process.nextTick);

      expect(btn.textContent).toBe('Send Message \u2192');
      expect(btn.disabled).toBe(false);
      expect(window.alert).toHaveBeenCalledWith('Something went wrong. Email info@emergenceadvisors.com or call (949) 409-5407.');
      expect(inner.style.display).not.toBe('none'); // ensure it doesn't hide the form
      expect(success.classList.contains('show')).toBe(false); // ensure it doesn't show success
    });

    it('handles successful form submission correctly', async () => {
      // Mock fetch to simulate success
      mockFetch.mockResolvedValueOnce({
        ok: true
      });

      // Call the form handler
      await window.handleForm(mockEvent);

      // Wait for promise chain
      await new Promise(process.nextTick);

      // Verify success behavior
      expect(mockFetch).toHaveBeenCalled();
      expect(inner.style.display).toBe('none');
      expect(success.classList.contains('show')).toBe(true);
      expect(window.alert).not.toHaveBeenCalled();
    });
  });
});
