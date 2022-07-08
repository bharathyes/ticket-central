window["ticketCentral"] = {};

// register, login, changePassword, logout, getLoggedInUser

(function (root, publicFns) {
  root["ticketCentral"]["auth"] = publicFns();
})(window, function () {
  var authList = {};
  var loggedInUser = null;

  function isNull(username, password) {
    return typeof username === "undefined" || typeof password === "undefined";
  }

  function isEmpty(username, password) {
    return username === "" || password === "";
  }


  var User = function (username, password) {
    this.username = username;
    this.password = password;

  };

  User.prototype.getUsername = function() {
    return this.username;
  }

  User.prototype.getPassword = function () {
    return this.password;
  }

  User.prototype.setPassword = function (password) {
    this.password = password;
  }

  var register = function (username, password) {
    if (isNull(username, password)) {
      return "Invalid username/password entered.";
    }
    if (isEmpty(username, password)) {
      return "Empty username/password entered.";
    }
    if (username in authList) {
      return "Username already in use.";
    }

    authList[username] = new User(username, password);
    return "Successfully registered.";

  };

  var login = function (username, password) {
    if (isNull(username, password)) {
      return "Invalid username/password entered.";
    }
    if (isEmpty(username, password)) {
      return "Empty username/password entered.";
    }
    var userObj = authList[username];

    if(typeof userObj === "undefined") {
      return " User not found."
    }

    if (password === authList[username].getPassword()) {
      loggedInUser = username;
      return "Successfully logged in.";
    }
    return "Invalid username / password.";
  };

  var changePassword = function (username, oldPassword, newPassword) {
    if (isNull(username, newPassword)) {
      return "Invalid username/password entered.";
    }
    if (isEmpty(username, newPassword)) {
      return "Empty username/password entered.";
    }
    var userObj = authList[username];

    if(typeof userObj === "undefined") {
      return " User not found."
    }

    if (oldPassword === authList[username].getPassword()) {
      userObj.setPassword(newPassword);
      return "Successfully changed password.";
    }
    return "Invalid username / password.";
  };

  var logout = function () {
    loggedInUser = null;
    return "Successfully logged out.";
  };

  var getLoggedInUser = function () {
    return loggedInUser;
  };


  return {
    register: register,
    login: login,
    changePassword: changePassword,
    logout: logout,
    getLoggedInUser: getLoggedInUser,
  };
});
