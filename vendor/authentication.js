
window["ticketCentral"] = {};

// register, login, logout, getRegistered
(function (root, publicFns) {
  root["ticketCentral"]["auth"] = publicFns();
})(window, function () {
  var authList = {};
  var loggedInUser = null;

  var register = function (username, password) {
    if (username in authList) {
      return "Username already in use.";
    }
    authList[username] = password;
    return "User added";
  };

  var login = function (username, password) {
    if (password === authList[username]) {
      loggedInUser = username;
      return "Successfully logged in.";
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
    logout: logout,
    getLoggedInUser: getLoggedInUser,
  };
});
