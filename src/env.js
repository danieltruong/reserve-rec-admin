(function (window) {
  window.__env = window.__env || {};

  window.__env.logLevel = 0; // All

  // Get config from remote host?
  window.__env.configEndpoint = false;

  // Environment name
  window.__env.ENVIRONMENT = "local"; // local | dev | test | prod

  window.__env.API_LOCATION = "https://6kbrprs1r7.execute-api.ca-central-1.amazonaws.com";
  window.__env.API_PATH = "/api";
  window.__env.GH_HASH = "local-build";
  window.__env.OAUTH_DOMAIN = "reserve-rec-dev.auth.ca-central-1.amazoncognito.com";
  window.__env.USER_POOL_ID = "ca-central-1_7slkQMBQ9";
  window.__env.USER_POOL_CLIENT_ID = "5116tjrobjtubo0atj4f7k1m08";
  window.__env.IDENTITY_POOL_ID = "ca-central-1:dffcad14-ba1d-49f9-8a0c-1429c02a46a0";
  window.__env.OAUTH_DOMAIN = "reserve-rec-dev.auth.ca-central-1.amazoncognito.com";
  window.__env.WEBSOCKET_URL = "wss://id7kh3hg1d.execute-api.ca-central-1.amazonaws.com/api/";

  // Add any feature-toggles
  // window.__env.coolFeatureActive = false;
})(this);
