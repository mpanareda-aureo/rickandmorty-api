const db = require("./db");
var md5 = require("md5");

exports.authenticate = (email, password, cb) => {
  db.get(
    "SELECT id, email, password FROM user WHERE email = ?",
    [email],
    (err, row) => {
      if (err) return cb(err);

      if (row && row.password && md5(password) === row.password) {
        cb(null, row);
      } else {
        cb();
      }
    }
  );
};

exports.get = (id, cb) => {
  db.get("SELECT id, email, password FROM user where id = ?", [id], cb);
};
