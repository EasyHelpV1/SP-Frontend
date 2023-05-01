const { devices } = require("playwright");

module.exports = {
  browsers: [{ name: "chromium", ...devices["Desktop Chrome"] }],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
};
