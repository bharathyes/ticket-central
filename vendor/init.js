// add data from here


ticketCentral.auth = new Auth();

ticketCentral.events = new Events();

var eventsData = {
  1234: {
    name: "KGF2",
    price: 70,
    showings: {
      1: {
        theatre: "Vetri",
        timePeriod: "10 AM - 12 PM",
        openSeats: 100,
      },
      2: {
        theatre: "Sathyam",
        timePeriod: "12 AM - 2 PM",
        openSeats: 80,
      },
      3: {
        theatre: "Sangam",
        timePeriod: "2 AM - 4 PM",
        openSeats: 70,
      },
    },
  },
  1212: {
    name: "Avatar 2",
    price: 100,
    showings: {
      1: {
        theatre: "Vetri",
        timePeriod: "10 AM - 12 PM",
        openSeats: 100,
      },
      2: {
        theatre: "Sathyam",
        timePeriod: "12 AM - 2 PM",
        openSeats: 80,
      },
      3: {
        theatre: "Sangam",
        timePeriod: "2 AM - 4 PM",
        openSeats: 70,
      },
    },
  },
};

var newEvent = {
  1200: {
    name: "My way 3",
    price: 100,
    showings: {
      1: {
        theatre: "Vetri",
        timePeriod: "10 AM - 12 PM",
        openSeats: 100,
      },
      2: {
        theatre: "Sathyam",
        timePeriod: "12 AM - 2 PM",
        openSeats: 80,
      },
      3: {
        theatre: "Sangam",
        timePeriod: "2 AM - 4 PM",
        openSeats: 70,
      },
    },
  },
};


(function init() {

  var keys = Object.keys(eventsData);
  for (var i = 0 ; i < keys.length ; ++i ) {
    ticketCentral.events.addNewEvent({ [keys[i]]: eventsData[keys[i]] });
  }

})();
ticketCentral.events.addNewEvent(newEvent);


ticketCentral.auth.register("bharath", "pass");
ticketCentral.auth.login("bharath", "pass");
