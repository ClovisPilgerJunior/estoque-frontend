const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target: "http://localhost:8080", // Change this to the address of your backend server
    secure: false
  }
];

module.exports = PROXY_CONFIG;
