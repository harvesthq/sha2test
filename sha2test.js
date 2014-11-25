// sha2test
// by Patrick Filler, for Harvest
// Full source at https://github.com/pfiller/sha2test
// MIT License, https://github.com/pfiller/sha2test/blob/master/LICENSE.md
(function(window) {
  var TEST_CALLBACK, COOKIE_NAME;

  COOKIE_NAME = "sha2supported";
  TEST_CALLBACK = null;

  function callTestCallback(status){
    if(TEST_CALLBACK){
      TEST_CALLBACK.call(this, status==="supported");
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

    callTestCallback(status);
  }

  function testForSha2support(){
    var testImage;
    testImage = new Image()
    testImage.onload = function(){ setSha2support("supported"); };
    testImage.onerror = function(){ setSha2support("notsupported"); };
    testImage.src = "https://www.zendesk.com/public/assets/images/favicon.png"
  }

  window.sha2test = function(callback){
    var sha2support;

    TEST_CALLBACK = callback;
    sha2support = getSha2support();

    if(sha2support !== ""){
      callTestCallback(sha2support);
    }
    else {
      testForSha2support();
    }
  }

})(window);
