(function(window) {
  var COOKIE_NAME, createCookie, getCookie, notsupported, sha2support, testImage;

  COOKIE_NAME = "sha2supported";

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
    if(sha2support==""){
      sha2support = "notsupported";
      setSupported(sha2support);
    }
    if(sha2callback){ sha2callback.call(sha2support); }
  }

  supported = function(){
    if(sha2support==""){
      sha2support = "supported";
      setSupported(sha2support);
    }
    if(sha2callback){ sha2callback.call(this, sha2support); }
  }

  testforsupport = function(){
    testImage = new Image()
    testImage.onload = supported;
    testImage.onerror = notsupported;
    testImage.src = "https://www.zendesk.com/public/assets/images/favicon.png"
  }

  sha2support = "";
  sha2callback = null;

  window.sha2supportTest = function(callback){
    sha2support = getSupported();
    sha2callback = callback;

    if(sha2support === "supported"){
      supported();
    }
    else if(sha2support === "notsupported"){
      notsupported();
    }
    else {
      testforsupport();
    }
  }

})(window);
