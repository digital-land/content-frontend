/*
  Cookie Helpers
*/
function getCookie (name) {
  // Check if cookie exists
  var cookieExists = document.cookie.split(';').some(function (item) {
    return item.trim().indexOf(name + '=') === 0
  })

  var value = cookieExists

  // If cookie does exist, get the value
  if (cookieExists) {
    value = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
    value = value ? value.pop() : false
  }

  return value // This returns either false or the value of the cookie
}

function setCookie (name, value) {
  // Set cookie expiry to a month from now
  var now = new Date()
  now.setMonth(now.getMonth() + 1)
  document.cookie = name + '=' + value + '; expires=' + now
}

/*
  Cookie Banner
*/
function hideGlobalCookieBanner (element) {
  document.getElementById('global-cookie-message').style.display = 'none'

  // Check whether a user has accepted analytics cookies
  analytics()
}

function setCookieButtonEvents () {
  var buttons = document.querySelectorAll('[data-accept-cookies]')

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (event) {
      var element = event.target || event.srcElement
      setCookie('cookies', JSON.stringify(element.dataset.acceptCookies))
      hideGlobalCookieBanner()
    })
  }
}

var cookies = getCookie('cookies')

if (cookies) {
  hideGlobalCookieBanner()
} else {
  setCookieButtonEvents()
}

/*
  Google Analytics
*/
function analytics () {
  var cookies = getCookie('cookies')

  if (cookies) {
    if (cookies.indexOf('analytics') !== -1) {
      (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

      ga('create', 'UA-127566551-1', 'auto')
      ga('send', 'pageview')
    }
  }
}
