// findEventById, listEvents, listEventsSummary, addNewEvent, bookEvent, showBookings

(function (root, publicFns) {
  root["ticketCentral"]["events"] = publicFns(root.ticketCentral.auth);
})(window, function (authFns) {
  var authFns = window.ticketCentral.auth;

  var userData = {};

  var eventsData = {};

  var User = function (username, bookings) {
    this.username = username;
    this.bookings = bookings;

    this.getUsername = function() {
      return this.username;
    }

    this.getBookings = function () {
      return this.bookings;
    }

    this.setBookings = function (bookings) {
      this.bookings = bookings;
    }

  };

  var Booking = function(theatre, timePeriod, seats) {
    this.theatre = theatre;
    this.timePeriod = timePeriod;
    this.seats = seats;
  }

  Booking.prototype.getTheatre = function() {
    return this.theatre;
  }
  Booking.prototype.setTheatre = function(theatre) {
    this.theatre = theatre;
  }
  Booking.prototype.getTimePeriod = function() {
    return time.timePeriod;
  }
  Booking.prototype.setTimePeriod = function(timePeriod) {
    this.timePeriod = timePeriod;
  }
  Booking.prototype.getSeats = function() {
    return this.seats;
  }
  Booking.prototype.setSeats = function(seats) {
    this.seats = seats;
  }

  var Event = function (name, price, showings) {

    this.name = name;
    this.price = price;
    this.showings = showings;
    
  };

  Event.prototype.getName = function() {
    return this.name;
  }
  Event.prototype.setName = function(name) {
    this.name = name;
  }

  Event.prototype.getPrice = function() {
    return this.price;
  }
  Event.prototype.setPrice = function(price) {
    this.price = price;
  }

  Event.prototype.getShowings = function() {
    return this.showings;
  }
  Event.prototype.setShowings = function(showings) {
    this.showings = showings;
  }

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
      typeof this.findEventById(Object.keys(eventData)[0]) === "undefined" &&
      validateEventKeys(eventData, Object.keys(eventData)[0])
    ) {
      var key = Object.keys(eventData)[0];

      var event = eventData[key];
      var eventObj = new Event(event.name, event.price, event.showings);
      eventsData[key] = eventObj;
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


  return {
    findEventById: findEventById,
    listEvents: listEvents,
    listEventsSummary: listEventsSummary,
    addNewEvent: addNewEvent,
    bookEvent: bookEvent,
    showBookings: showBookings,
  };
});
