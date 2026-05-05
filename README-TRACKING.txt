Comfort Dynamics tracking notes

What was added:
- tracking.js records page views and phone-call button clicks.
- It works locally in the browser for testing.
- If Google Analytics 4 is added later, the same events will be sent to GA4 automatically.

How to test locally:
1. Open index.html in Chrome.
2. Click a phone button.
3. Press F12, open Console, and type:
   ComfortDynamicsTracking.view()

Important:
This tracks phone-button clicks, not completed phone calls. To track real answered calls by page/source, use a call tracking number provider such as CallRail or another call tracking service.

Recommended next step:
Create a free Google Analytics 4 property and add the GA4 tag to the site. Once the gtag code is installed, phone_call_click events from tracking.js will show in GA4.
