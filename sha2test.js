(function() {
  var COOKIE_NAME, createCookie, getCookie, notsupported, sha2support, testImage;

  COOKIE_NAME = "sha2supported";

  if (typeof window.console === 'undefined') {
    window.console = {
      log: function() {}
    };
  }

  setSupported = function(status) {
    expires = "; expires=" + Infinity;
    document.cookie = COOKIE_NAME + "=" + status + expires + "; path=/";
  }

  getSupported = function() {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(COOKIE_NAME + "=");
      if (c_start != -1) {
          c_start = c_start + COOKIE_NAME.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) {
              c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start, c_end));
      }
    }
    return "";
  }

  notsupported = function(){
    setSupported("notsupported");
    alert("This is a bad browser! No SHA2 support!");
  }

  supported = function(){
    console.log("supported");
    setSupported("supported");
  }

  sha2support = getSupported();

  if(sha2support === "supported"){
    console.log("already tested, all good");
    supported();
  }
  else if(sha2support === "notsupported"){
    console.log("already testsed, not supported");
    notsupported();
  }
  else {
    console.log("testing");
    testImage = new Image()
    testImage.onload = supported;
    testImage.onerror = notsupported;
    testImage.src = "https://www.zendesk.com/public/assets/images/favicon.png"
  }

})();
