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
      constructor(callback, options) {
        this.callback = callback;
        this.options = options;
        this.observedElements = new Set();
        this.unobservedElements = new Set();
        if (!IntersectionObserver.instances) {
          IntersectionObserver.instances = [];
        }
        IntersectionObserver.instances.push(this);
      }
      observe(element) {
        this.observedElements.add(element);
      }
      unobserve(element) {
        this.unobservedElements.add(element);
      }
      disconnect() {}
    }
    IntersectionObserver.instances = [];

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.IntersectionObserver = IntersectionObserver;
      }
    });
    document = dom.window.document;
    window = dom.window;
  });

  describe('scroll reveal IntersectionObserver', () => {
    let revealObserver;

    beforeEach(() => {
      // Find the specific instance for scroll reveal (threshold: 0.08)
      revealObserver = window.IntersectionObserver.instances.find(
        obs => obs.options && obs.options.threshold === 0.08
      );
    });

    it('should initially observe all .reveal elements', () => {
      const revealElements = document.querySelectorAll('.reveal');
      expect(revealElements.length).toBeGreaterThan(0);
      revealElements.forEach(el => {
        expect(revealObserver.observedElements.has(el)).toBe(true);
      });
    });

    it('should add "on" class and unobserve when intersecting', () => {
      const targetElement = document.createElement('div');
      targetElement.classList.add('reveal');

      // Simulate observing
      revealObserver.observe(targetElement);

      // Simulate intersection
      revealObserver.callback([{
        isIntersecting: true,
        target: targetElement
      }]);

      expect(targetElement.classList.contains('on')).toBe(true);
      expect(revealObserver.unobservedElements.has(targetElement)).toBe(true);
    });

    it('should not add "on" class or unobserve when not intersecting', () => {
      const targetElement = document.createElement('div');
      targetElement.classList.add('reveal');

      // Simulate observing
      revealObserver.observe(targetElement);

      // Simulate non-intersection
      revealObserver.callback([{
        isIntersecting: false,
        target: targetElement
      }]);

      expect(targetElement.classList.contains('on')).toBe(false);
      expect(revealObserver.unobservedElements.has(targetElement)).toBe(false);
    });
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
