// findEventById, listEvents, listEventsSummary, addNewEvent, bookEvent, showBookings

(function (root, publicFns) {
  root["ticketCentral"]["events"] = publicFns(root.ticketCentral.auth);
})(window, function (authFns) {
  var userData = {};

  var eventsData = {}

  var findEventById = function (id) {
    return eventsData[id];
  };

  var listEvents = function () {
    return eventsData;
  };

  var listEventsSummary = function () {
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

  var addNewEvent = function (eventData) {
    // console.log(validateEventKeys(eventData));
    if (
      typeof eventData === "object" &&
      Object.keys(eventData).length === 1 &&
      typeof findEventById(Object.keys(eventData)[0]) === "undefined" &&
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

  var bookEvent = function (eventId, slot, seatCount) {
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

  var showBookings = function () {
    var loggedInUser = authFns.getLoggedInUser();
    console.log(loggedInUser);
    if (typeof loggedInUser === "undefined" || loggedInUser === null) {
      return "No user logged in.";
    }
    // add checks if no bookings present
    return userData[loggedInUser]["bookings"];
  };

  return {
    findEventById: findEventById,
    listEvents: listEvents,
    listEventsSummary: listEventsSummary,
    addNewEvent: addNewEvent,
    bookEvent: bookEvent,
    showBookings: showBookings,
  };
});
