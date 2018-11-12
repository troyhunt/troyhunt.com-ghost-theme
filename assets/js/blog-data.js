var xmlhttp = new XMLHttpRequest();
var url = 'https://bloghelpers.troyhunt.com/api/BlogData';

xmlhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    var blogData = JSON.parse(this.responseText);
    if (blogData === null || blogData === undefined) {
      showUnsponsored();
      showNoEvents();
    } else {
      showSponsor(blogData.currentSponsor);
      showEvents(blogData.events);
    }
  }
  else if (this.readyState === 4 && this.status !== 200) {
    showUnsponsored();
    showNoEvents();
  }
};
xmlhttp.open('GET', url, true);
xmlhttp.send();

function showUnsponsored() {
  document.getElementById('sponsor_message').innerHTML = '<a href="/sponsorship"><strong>Sponsored by:</strong> I\'m unsponsored today, click to learn more</a>';
}

function showNoEvents() {
  document.getElementById('events_list').innerHTML = '<p>No upcoming events were found</p>';
}

function showSponsor(sponsorMessage) {
  if (sponsorMessage === null) {
    showUnsponsored();
  }
  else {
    document.getElementById('sponsor_message').innerHTML = '<a href="' + sponsorMessage.campaignUrl + '" target="_blank" rel="noopener"><strong>Sponsored by:</strong> ' + sponsorMessage.message + ' <i class="fa fa-external-link" aria-hidden="true"></i></a>';
  }
}

function showEvents(events) {
  if (events.length === 0) {
    showNoEvents();
  } else {
    var eventsData = '<ol>';
    events.forEach(function (event) {
      eventsData += '<li><a href="' + event.url + '">' + event.name + ': ' + event.date + ', ' + event.location + '</a></li>';
    });
    eventsData += '</ol>';
    document.getElementById('events_list').innerHTML = eventsData;
  }
}