(function(window) {
  var SUPPORT_CALLBACK, COOKIE_NAME;

  COOKIE_NAME = "sha2supported";
  SUPPORT_CALLBACK = null;

  function supportCallback(status){
    if(SUPPORT_CALLBACK){
      SUPPORT_CALLBACK.call(this, status==="supported");
    }
  }

  function getSha2support() {
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

  function setSha2support(status){
    expires = "; expires=" + Infinity;
    document.cookie = COOKIE_NAME + "=" + status + expires + "; path=/";

    supportCallback(status);
  }

  function testForSha2support(){
    var testImage;
    testImage = new Image()
    testImage.onload = function(){ setSha2support("supported"); };
    testImage.onerror = function(){ setSha2support("notsupported"); };
    testImage.src = "https://www.zendesk.com/public/assets/images/favicon.png"
  }

  window.sha2supported = function(callback){
    var sha2support;

    SUPPORT_CALLBACK = callback;
    sha2support = getSha2support();

    if(sha2support !== ""){
      supportCallback(sha2support);
    }
    else {
      testForSha2support();
    }
  }

})(window);
