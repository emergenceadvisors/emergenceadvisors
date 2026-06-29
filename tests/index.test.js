const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  let dom;
  let document;
  let window;

  let mockIntersectionObserverCallbacks;

  beforeEach(() => {
    mockIntersectionObserverCallbacks = [];
    // Mock IntersectionObserver before initializing JSDOM
    class IntersectionObserver {
      constructor(callback, options) {
        this.callback = callback;
        mockIntersectionObserverCallbacks.push(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.IntersectionObserver = IntersectionObserver;
        window.mockIntersectionObserverCallbacks = mockIntersectionObserverCallbacks;
      }
    });
    document = dom.window.document;
    window = dom.window;
  });

  describe('active navigation links', () => {
    it('updates active class based on section visibility', () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.sidenav a');

      // Ensure we have captured the IntersectionObserver callback
      expect(window.mockIntersectionObserverCallbacks.length).toBeGreaterThan(0);
      const activeObsCallback = window.mockIntersectionObserverCallbacks[0];

      // Initial state - first link should be active, others not
      expect(navLinks[0].classList.contains('active')).toBe(true);
      expect(navLinks[1].classList.contains('active')).toBe(false);

      // Simulate the first section intersecting
      activeObsCallback([{
        target: sections[0],
        isIntersecting: true
      }]);

      // Since section 0 is visible, link 0 should be active
      expect(navLinks[0].classList.contains('active')).toBe(true);
      expect(navLinks[1].classList.contains('active')).toBe(false);

      // Simulate scrolling: section 0 is out, section 1 is in
      activeObsCallback([
        {
          target: sections[0],
          isIntersecting: false
        },
        {
          target: sections[1],
          isIntersecting: true
        }
      ]);

      // Now link 1 should be active and link 0 inactive
      expect(navLinks[0].classList.contains('active')).toBe(false);
      expect(navLinks[1].classList.contains('active')).toBe(true);
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
