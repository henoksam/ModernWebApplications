angular.module("meanGames").factory("AuthFactory", AuthFactory);

function AuthFactory() {
  let auth = { isLoggedIn: false };
  return {
    auth: auth,
  };
}
