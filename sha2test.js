(function(window) {
  var COOKIE_NAME, createCookie, getCookie, notsupported, sha2support, testImage;

  COOKIE_NAME = "sha2supported";

  getSupportStatus = function() {
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

  setSha2support = function(status){
    expires = "; expires=" + Infinity;
    document.cookie = COOKIE_NAME + "=" + status + expires + "; path=/";

    announceSha2status(status);
  }

  announceSha2status = function(status){
    if(sha2callback){
      sha2callback.call(this, status);
    }
  }

  testforsupport = function(){
    testImage = new Image()
    testImage.onload = function(){ setSha2support("supported"); };
    testImage.onerror = function(){ setSha2support("notsupported"); };
    testImage.src = "https://www.zendesk.com/public/assets/images/favicon.png"
  }

  sha2callback = null;

  window.sha2supportTest = function(callback){
    sha2callback = callback;
    sha2support = getSupportStatus();

    if(sha2support !== ""){
      announceSha2status(sha2support);
    }
    else {
      testforsupport();
    }
  }

})(window);
