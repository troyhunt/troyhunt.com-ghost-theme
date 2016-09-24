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
var url = "http://local.bloghelpers.troyhunt.com/api/CurrentSponsor";

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
  document.getElementById('sponsor_message').innerHTML = "<a href='/sponsorship'><strong>Presently sponsored by:</strong> I'm unsponsored today, click to learn more</a>";
  (function () { _dmBootstrap('cdn1.DeveloperMedia.com/a.min.js'); setTimeout(_dmFollowup, 2000); })();
}

function showSponsor(sponsorMessage){
  document.getElementById('sponsor_message').innerHTML = '<a href="' + sponsorMessage.campaignUrl + '"><strong>Presently sponsored by:</strong> ' + sponsorMessage.message + ' <i class="fa fa-external-link" aria-hidden="true"></i></a>';
  document.getElementById('ad1').style.display = 'none';
  document.getElementById('ad2').style.display = 'none';
  document.getElementById('ad3').style.display = 'none';
  document.getElementById('ad4').style.display = 'none';
}