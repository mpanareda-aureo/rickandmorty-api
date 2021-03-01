var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "./database.sqlite3";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          console.log("user created");
          // Table just created, creating some rows
          var insert =
            "INSERT INTO user (name, email, password) VALUES (?,?,?)";
          db.run(insert, ["admin", "admin@example.com", md5("admin123456")]);
          db.run(insert, ["user", "user@example.com", md5("user123456")]);
        }
      }
    );
    db.run(
      `CREATE TABLE IF NOT EXISTS fav (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER, 
            character_id INTEGER,
            CONSTRAINT fav_unique UNIQUE (user_id, character_id)
            )`,
      (err) => {
        if (err) {
          // Table already created
          console.log(err);
        } else {
          console.log("fav created");
        }
      }
    );
  }
});

module.exports = db;
