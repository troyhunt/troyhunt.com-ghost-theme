var eventsElement = document.getElementById('Events');
if (eventsElement === null) {
  showNoEventsForYear();
}
else {
  var year = eventsElement.getAttribute('data-year');
  if (year === null) {
    showNoEventsForYear();
  }
  else {
    getEventData();
  }
}

function getEventData() {
  var xmlhttp = new XMLHttpRequest();
  var url = 'https://bloghelpers.troyhunt.com/api/events/' + year;

  xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var events = JSON.parse(this.responseText);
      if (events === null || events === undefined) {
        showNoEventsForYear();
      } else {
        showEventsForYear(events);
      }
    }
    else if (this.readyState === 4 && this.status !== 200) {
      showNoEventsForYear();
    }
  };
  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function showNoEventsForYear() {
  document.getElementById('Events').innerHTML = '<p>No upcoming events were found</p>';
}

function showEventsForYear(events) {
  if (events.length === 0) {
    showNoEventsForYear();
  } else {
    var eventsData = '<ol>';
    events.forEach(function (event) {
      if (event.url !== null) {
        eventsData += '<li><a href="' + event.url + '">' + event.name + ': ' + event.date + ', ' + event.location + '</a></li>';
      }
      else {
        eventsData += '<li>' + event.name + ': ' + event.date + ', ' + event.location + '</li>';
      }
      if (event.talks.length > 0) {
        eventsData += '<ol>';
        event.talks.forEach(function (talk) {
          var talkDisplay = talk.name;
          if (talk.eval !== "" && talk.eval !== null && talk.eval !== undefined) {
            talkDisplay += ' &mdash; eval: ' + talk.eval;
          }
          eventsData += '<li>' + talkDisplay + '</li>';
        });
        eventsData += '</ol>';
      }
      eventsData += '</li>';
    });
    eventsData += '</ol>';
    document.getElementById('Events').innerHTML = eventsData;
  }
}