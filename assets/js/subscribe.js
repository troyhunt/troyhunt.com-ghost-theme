document.getElementById('subscribe_form').addEventListener('submit', function (evt) {
  evt.preventDefault();

  // Hide the email field
  document.getElementById('new_subscription').style.display = 'none';

  // The reCAPTCHA may be on the page already if we've arrived here after an earlier error
  if (!window['___grecaptcha_cfg']) {
    // Write the reCAPTCHA script tag to the page
    var reCaptchaScript = document.createElement('script');
    reCaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
    document.head.appendChild(reCaptchaScript);

    // Write the reCAPTCHA element to the page
    var reCaptchaDiv = document.createElement('div');
    reCaptchaDiv.setAttribute('class', 'g-recaptcha');
    reCaptchaDiv.setAttribute('data-sitekey', '6LdqYhoUAAAAADieTdwsCSDl0-zIpp6Ga-JzatIZ');
    reCaptchaDiv.setAttribute('data-callback', 'reCaptchaSolved');
    document.getElementById('confirm_captcha').appendChild(reCaptchaDiv);
  } else {
    grecaptcha.reset();
  }

  document.getElementById('confirm_captcha').style.display = 'inline-block';
});

function reCaptchaSolved() {
  // Hide the button and show the loader
  document.getElementById('subscribe_loading').style.display = 'block';

  // Hide the CAPTCHA
  document.getElementById('confirm_captcha').style.display = 'none';

  var email = encodeURIComponent(document.getElementById('subscribe_email').value);

  var emailCadence;
  var radios = document.getElementsByName('email_cadence');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      emailCadence = radios[i].value;
      break;
    }
  }

  var reCaptchaResponse = document.getElementById('g-recaptcha-response').value;
  var postData = 'Email=' + email +
                 '&EmailCadence=' + emailCadence +
                 '&g-recaptcha-response=' + reCaptchaResponse;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', 'http://bloghelpers.troyhunt.com/api/subscribe', true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.onload = function () {
    document.getElementById('subscribe_loading').style.display = 'none';
    if (this.status === 200) {
      document.getElementById('subscribe_successful').style.display = 'block';
    }
    else {
      var errorResponse = JSON.parse(this.responseText);
      var errorMessage = errorResponse === 'FakeOrInvalid'
        ? 'Uh oh, apparently that\'s a fake or invalid email, sorry!'
        : 'Uh oh, that didn\'t work.Try submitting it again.';

      document.getElementById('subscribe_unsuccessful').innerHTML = '<p>' + errorMessage + '</p >';
      document.getElementById('subscribe_unsuccessful').style.display = 'block';
      document.getElementById('new_subscription').style.display = 'block';
    }
  };
  xmlhttp.send(postData);
}
