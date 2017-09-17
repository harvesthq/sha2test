## shasha2test detects SHA-2 browser support

If a browser doesn't support SHA-2, it cannot load a page with a SHA-2 SSL certificate. At all. There's no warning message or diminished experience. There is only a browser error message along the lines of "unable to complete secure transaction".

The purpose of this tool is to help you determine if your customer base is techically ready for a SHA-2 SSL certificate. The tool can be used to count affected parties and educate them about upcoming changes. Many parts of the internet are already broken for people with bad browsers and it's only a matter of time before they're shut out of all the best parties.

## sha2test Usage

Using the test is simple. Insert [the script](sha2test.js) into your page and call the test with a callback. The callback will be fired with a <code>true</code> or <code>false</code> value indicating SHA-2 support. Use that information to track usage, issue warnings, and educate.

```JavaScript
<script type="text/javascript" src="sha2test.js"></script>
<script type="text/javascript">
  sha2test(function(sha2supported){
    //if sha2supported is false, do something about it!
  });
</script>
```

## How it works

It's simple, really. Once initiated, the test will attempt to load an image from a domain that has been signed with a SHA-2 SSL certificate. If the image loads successfully, the browser is SHA-2 compatibile. If it errors out, you've got a bad browser.

The script sets a cookie so that the image test only happens once per browser. If you call the function a second time, it will retrieve the value from cookie storage.

## Contribute

If you see some way in which this script or page can be improved, feel free to open a pull request. For obvious reasons, any changes must work in ancient browsers. Remember to be polite and nice in your issues and pull requests – this software was made by people.

## Credits

This tool was built by [Patrick Filler](https://twitter.com/pfiller) and [Warwick Poole](https://twitter.com/warwickp) for [Harvest](https://www.getharvest.com).
