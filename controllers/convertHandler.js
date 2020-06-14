/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const math = require("mathjs");

function ConvertHandler() {
  this.getNum = function(input) {
    if (!input) return "invalid number and unit";
    var result;
    var index = input.search(/[a-z]/i);
    result = input.slice(0, index) || "1";
    
    var match = result.match(/\//g)
    
    var hasDoubleFraction = match ? match.length >= 2 : false;
    var isNumberValid = typeof +result === "number";
    
    console.log(result, isNumberValid);
    
    if (!isNumberValid || hasDoubleFraction) return "invalid number";
    return math.evaluate(result);
  };

  this.getUnit = function(input) {
    if (!input) return 'invalid number and unit';
    var result;
    var index = input.search(/[a-z]/i);
    result = input.slice(index).toLowerCase();
    
    if (!result) return 'no unit';

    var units = ["gal", "L", "lbs", "kg", "mi", "km"];
    var isUnitValid = units.find(
      unit => unit.toLowerCase() === result
    );
    if (!isUnitValid) {
      return 'invalid unit';
    }

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result;
    var MAP = {
      gal: "l",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };
    result = MAP[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    var MAP = {
      gal: "gallons",
      l: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };
    result = MAP[unit];

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    var MAP = {
      gal: galToL,
      l: 1 / galToL,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
      mi: miToKm,
      km: 1 / miToKm
    };

    result = initNum * MAP[initUnit.toLowerCase()];

    return +result.toFixed(5);
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
