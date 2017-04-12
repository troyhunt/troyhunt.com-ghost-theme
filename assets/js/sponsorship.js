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
}

function showSponsor(sponsorMessage){
  document.getElementById('message_contents').innerHTML = '<a href="' + sponsorMessage.campaignUrl + '" target="_blank" rel="noopener"><strong>Sponsored by:</strong> ' + sponsorMessage.message + ' <i class="fa fa-external-link" aria-hidden="true"></i></a>';
}