window["ticketCentral"] = {};

// register, login, logout, getRegistered

var Auth = function () {
  var authList = {};
  var loggedInUser = null;

  function isNull(username, password) {
    return typeof username === "undefined" || typeof password === "undefined";
  }

  function isEmpty(username, password) {
    return username === "" || password === "";
  }

  this.register = function (username, password) {
    if (isNull(username, password)) {
      return "Invalid username/password entered.";
    }
    if (isEmpty(username, password)) {
      return "Empty username/password entered.";
    }
    if (username in authList) {
      return "Username already in use.";
    }
    authList[username] = password;
    return "User added";
  };

  this.login = function (username, password) {
    if (isNull(username, password)) {
      return "Invalid username/password entered.";
    }
    if (isEmpty(username, password)) {
      return "Empty username/password entered.";
    }
    if (password === authList[username]) {
      loggedInUser = username;
      return "Successfully logged in.";
    }
    return "Invalid username / password.";
  };

  this.logout = function () {
    loggedInUser = null;
    return "Successfully logged out.";
  };

  this.getLoggedInUser = function () {
    return loggedInUser;
  };
};

