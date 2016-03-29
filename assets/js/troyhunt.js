// Developer media ads
function _dmBootstrap(file) {
  var _dma = document.createElement('script');
  _dma.type = 'text/javascript';
  _dma.async = true;
  _dma.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + file;
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(_dma);
}
function _dmFollowup(file) { if (typeof DMAds === 'undefined') _dmBootstrap('cdn2.DeveloperMedia.com/a.min.js'); }
(function () { _dmBootstrap('cdn1.DeveloperMedia.com/a.min.js'); setTimeout(_dmFollowup, 2000); })();

// Diqqus
var disqus_shortname = 'troyhunt';
(function () {
    var s = document.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = '//' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
}());