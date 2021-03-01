const db = require("./db");

exports.getByUser = (user_id, cb) => {
  db.all(
    "SELECT character_id FROM fav WHERE user_id = ?",
    [user_id],
    (err, rows) => {
      if (err) return cb(err);

      cb(
        null,
        rows.map((row) => row.character_id)
      );
    }
  );
};

exports.add = (user_id, character_id, cb) => {
  db.run(
    "INSERT INTO fav (user_id, character_id) VALUES (?, ?)",
    [user_id, character_id],
    cb
  );
};

exports.remove = (user_id, character_id, cb) => {
  db.run(
    "DELETE FROM fav WHERE user_id = ? and character_id = ?",
    [user_id, character_id],
    cb
  );
};
