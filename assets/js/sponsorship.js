// Developer media ads
function _dmBootstrap(file) {
  var _dma = document.createElement('script');
  _dma.type = 'text/javascript';
  _dma.async = true;
  _dma.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + file;
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(_dma);
}
function _dmFollowup(file) { if (typeof DMAds === 'undefined') _dmBootstrap('cdn2.DeveloperMedia.com/a.min.js'); }

// Sponsorship
var xmlhttp = new XMLHttpRequest();
var url = "https://bloghelpers.troyhunt.com/api/CurrentSponsor";

xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var sponsorMessage = JSON.parse(this.responseText);
    if (sponsorMessage == null) {
      showUnsponsored();
    } else { 
      showSponsor(sponsorMessage);
    }
  }
  else if (this.readyState === 4 && this.status !== 200){
    showUnsponsored();
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function showUnsponsored(){
  document.getElementById('message_contents').innerHTML = "<a href='/sponsorship'><strong>Sponsored by:</strong> I'm unsponsored today, click to learn more</a>";
  (function () { _dmBootstrap('cdn1.DeveloperMedia.com/a.min.js'); setTimeout(_dmFollowup, 2000); })();
}

function showSponsor(sponsorMessage){
  document.getElementById('message_contents').innerHTML = '<a href="' + sponsorMessage.campaignUrl + '" target="_blank" rel="noopener"><strong>Sponsored by:</strong> ' + sponsorMessage.message + ' <i class="fa fa-external-link" aria-hidden="true"></i></a>';
  [].forEach.call(document.querySelectorAll('.ad'), function (el) {
    el.style.display = 'none';
  });
}