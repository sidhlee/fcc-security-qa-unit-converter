/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    console.log("'/api/convert' GET success");
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);

    // validation
    const isUnitInvalid = !!initUnit.match(/invalid/);
    const isNoUnit = initUnit.match(/no/);

    if (!initNum || typeof initNum !== "number") {
      if (isUnitInvalid) {
        return res.status(422).json({ error: "invalid number and unit" });
      }
      return res.status(422).json({ error: "invalid number" });
    } else if (isUnitInvalid) {
      return res.status(422).json({ error: "invalid unit" });
    } else if (isNoUnit) {
      return res.status(422).json({ error: "no unnit" });
    }

    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    //res.json
    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    });
  });
};
