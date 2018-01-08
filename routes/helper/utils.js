function round(value, dp) {
  let thousands = Math.pow(10, dp);
  return Math.round(value * thousands) / thousands;
}

module.exports.round = round;