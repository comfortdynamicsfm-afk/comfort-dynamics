// Comfort Dynamics lightweight tracking
// This tracks page views and phone-button clicks locally in the browser.
// If Google Analytics 4 is installed later, the same events will be sent to GA4 automatically.
(function () {
  function pageName() {
    var name = window.location.pathname.split('/').pop() || 'index.html';
    return name;
  }

  function saveLocal(eventName, data) {
    try {
      var key = 'comfortDynamicsTracking';
      var existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(Object.assign({ event: eventName, time: new Date().toISOString() }, data));
      localStorage.setItem(key, JSON.stringify(existing.slice(-200)));
    } catch (e) {}
  }

  function track(eventName, data) {
    data = data || {};
    data.page = pageName();
    data.path = window.location.pathname;

    // If GA4 is added later, this will report events there.
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, data);
    }

    saveLocal(eventName, data);
  }

  document.addEventListener('DOMContentLoaded', function () {
    track('page_view_custom', { title: document.title });

    document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
      link.addEventListener('click', function () {
        track('phone_call_click', {
          phone_number: link.getAttribute('href').replace('tel:', ''),
          link_text: (link.textContent || '').trim(),
          section: link.closest('section') ? (link.closest('section').className || 'section') : 'header_or_footer'
        });
      });
    });
  });

  window.ComfortDynamicsTracking = {
    view: function () {
      try { return JSON.parse(localStorage.getItem('comfortDynamicsTracking') || '[]'); }
      catch (e) { return []; }
    },
    clear: function () { localStorage.removeItem('comfortDynamicsTracking'); }
  };
})();
