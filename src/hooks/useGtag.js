// src/hooks/useGtag.js
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'aWQ9R1RNLU5MU1RSUzRIJmVudj0xJmF1dGg9VXRlTV9UV1k4OGxHaXdBeUxNRFdydw=='; // ← your real GA4 ID here
const GTM_SERVER_URL   = 'https://demo01.gtmtest.com'; 

export function useGtag() {
  useEffect(() => {
    // Prevent double-loading
    if (document.getElementById('gtag-js')) return;

    // 1. Inject gtag.js
    const script = document.createElement('script');
    script.id    = 'gtag-js';
    script.async = true;
    script.src   = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // 2. Initialize once loaded
    script.onload = () => {
      // Ensure dataLayer exists
      window.dataLayer = window.dataLayer || [];
      function gtag(...args) {
        window.dataLayer.push(args);
        // Optional debug logging
        console.log('[gtag]', ...args);
      }

      // Expose for manual events
      window.gtag = gtag;

      // 3. gtag init
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        transport_url: GTM_SERVER_URL,
        debug_mode: true,
      });

      // 4. Initial page_view (optional; GA4 auto-tracks page_view by default)
      gtag('event', 'page_view');
    };

    // Cleanup: remove script if component unmounts
    return () => {
      script.onload = null;
      document.head.removeChild(script);
      delete window.gtag;
      delete window.dataLayer;
    };
  }, []);
}
