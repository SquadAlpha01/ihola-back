// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        user: "username",
        password: "password",
        database: "ihola",
      },
      migrations: {
        directory: __dirname + "/db/migrations",
      },
      seeds: {
        directory: __dirname + "/db/seeds",
      },
    },
    production: {
      client: "pg",
      connection: {
        host: "127.0.0.1",
        user: "username",
        password: "password",
        database: "ihola",
      },
      migrations: {
        directory: __dirname + "/db/migrations",
      },
      seeds: {
        directory: __dirname + "/db/seeds",
      },
    },
  };
