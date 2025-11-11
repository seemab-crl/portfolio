/**
* PHP Email Form Validation - v3.9 (patched)
* Improvements:
* - guard DOM element accesses
* - safe error display using textContent
* - fetch timeout via AbortController
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      const loadingEl = thisForm.querySelector('.loading');
      const errorEl = thisForm.querySelector('.error-message');
      const sentEl = thisForm.querySelector('.sent-message');

      if (loadingEl) loadingEl.classList.add('d-block');
      if (errorEl) errorEl.classList.remove('d-block');
      if (sentEl) sentEl.classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    const loadingEl = thisForm.querySelector('.loading');
    const errorEl = thisForm.querySelector('.error-message');
    const sentEl = thisForm.querySelector('.sent-message');

    // Setup timeout
    const controller = new AbortController();
    const timeout = 15000; // 15s
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'},
      signal: controller.signal
    })
    .then(response => {
      clearTimeout(timeoutId);
      if( response.ok ) {
        return response.text();
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`);
      }
    })
    .then(data => {
      if (loadingEl) loadingEl.classList.remove('d-block');
      const trimmed = (data || '').trim();
      if (trimmed === 'OK') {
        if (sentEl) sentEl.classList.add('d-block');
        thisForm.reset();
      } else {
        // If server returned JSON like {status:"OK"} you can parse here
        throw new Error(trimmed ? trimmed : 'Form submission failed and no error message returned from: ' + action);
      }
    })
    .catch((error) => {
      if (loadingEl) loadingEl.classList.remove('d-block');
      if (error.name === 'AbortError') {
        displayError(thisForm, 'Request timed out. Please try again.');
      } else {
        displayError(thisForm, error.message || error);
      }
    });
  }

  function displayError(thisForm, error) {
    const errorEl = thisForm.querySelector('.error-message');
    const loadingEl = thisForm.querySelector('.loading');
    if (loadingEl) loadingEl.classList.remove('d-block');
    if (!errorEl) {
      // nothing to show
      console.error('Form error:', error);
      return;
    }
    // use textContent to avoid inserting HTML from server
    errorEl.textContent = String(error);
    errorEl.classList.add('d-block');
  }

})();