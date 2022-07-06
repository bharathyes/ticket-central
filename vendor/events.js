// findEventById, listEvents, listEventsSummary, addNewEvent, bookEvent, showBookings

var Events = function () {
  var authFns = window.ticketCentral.auth;

  var userData = {};

  var eventsData = {};

  this.findEventById = function (id) {
    return eventsData[id];
  };

  this.listEvents = function () {
    return eventsData;
  };

  this.listEventsSummary = function () {
    var eventsSummary = {};
    var keyList = Object.keys(eventsData);
    for (var i = 0; i < eventsData.length; ++i) {
      eventsSummary[keyList[i]] = eventsData[keyList[i]]["name"];
    }
    return eventsSummary;
  };

  function validateShowingKeys(showings) {
    if (typeof showings !== "undefined") {
      var keys = Object.keys(showings);
      if (keys.length >= 1) {
        for (var i = 0; i < keys.length; ++i) {
          var showing = showings[keys[i]];
          if (
            showing["theatre"] === undefined ||
            showing["timePeriod"] === undefined ||
            showing["openSeats"] === undefined
          ) {
            console.log("inside false");
            return false;
          }
        }
        return true;
      }
    }
    console.log("outside false");
    return false;
  }

  function validateEventKeys(eventData, id) {
    return (
      eventData[id].name !== undefined &&
      eventData[id].price !== undefined &&
      eventData[id].showings !== undefined &&
      validateShowingKeys(eventData[id].showings)
    );
  }

  this.addNewEvent = function (eventData) {
    // console.log(validateEventKeys(eventData));
    if (
      typeof eventData === "object" &&
      Object.keys(eventData).length === 1 &&
      typeof this.findEventById(Object.keys(eventData)[0]) === "undefined" &&
      validateEventKeys(eventData, Object.keys(eventData)[0])
    ) {
      var key = Object.keys(eventData)[0];
      eventsData[key] = eventData[key];
      return "Data added successfully.";
    } else {
      return "Invalid data not added.";
    }
  };

  function initializeAccount(id) {
    userData[id] = {
      bookings: {},
    };
  }

  function validateCart(id, eventId) {
    if (typeof userData[id] === "undefined") {
      initializeAccount(id);
      return false;
    }
    return userData[id].bookings[eventId];
  }

  this.bookEvent = function (eventId, slot, seatCount) {
    if (!(eventId in eventsData)) {
      return "Invalid event ID.";
    }
    if (eventsData[eventId].showings[slot]["openSeats"] < seatCount) {
      return "Exceeded available seat count.";
    } else {
      var loggedInUser = authFns.getLoggedInUser();
      if (typeof loggedInUser === "undefined" || loggedInUser === null) {
        return "No user logged in.";
      }
      if (validateCart(loggedInUser, eventId)) {
        return "Event already registered.";
      }
      userData[loggedInUser]["bookings"][eventId] = {
        theatre: eventsData[eventId].showings[slot]["theatre"],
        timeslot: slot,
        seatCount: seatCount,
      };
      eventsData[eventId].showings[slot]["openSeats"] =
        eventsData[eventId].showings[slot]["openSeats"] - seatCount;
      return "Successfully booked seats.";
    }
  };

  this.showBookings = function () {
    var loggedInUser = authFns.getLoggedInUser();
    if (typeof loggedInUser === "undefined" || loggedInUser === null) {
      return "No user logged in.";
    }
    var data = userData[loggedInUser];
    if (typeof data === "undefined") {
      return "No userdata available.";
    } else {
      return data.bookings;
    }
  };
};
