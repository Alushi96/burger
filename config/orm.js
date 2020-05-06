var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function objToSql(ob) {
  var arr = [];
  for (var key in ob) {
    var value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
    if (typeof value === "string" && value.indexOf(" ") >= 0) {
      value = "'" + value + "'";
    }
    arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

var orm = {
  selectAll: function(table, cb) {
    var query = "SELECT * FROM " + table + ";";
    connection.query(query, function(err, result) {
      if (err) throw err;
        cb(result);
    });
  },
  insertOne: function(table, col, val, cb) {
    var query = "INSERT INTO " + table;
    query += " (";
    query += col.toString();
    query += ")";
    query += " VALUES (";
    query += printQuestionMarks(val.length);
    query += ")";

    connection.query(query, val, function(err, result) {
      if (err) throw err;
        cb(result);
      });
  },
  updateOne: function(table, objColVal, condition, cb) {
    var query = "UPDATE " + table;
    query += " SET ";
    query += objToSql(objColVal);
    query += " WHERE ";
    query += condition;

    connection.query(query, function(err, result) {
      if (err) throw err;
        cb(result);
      });
  }
};

module.exports = orm;