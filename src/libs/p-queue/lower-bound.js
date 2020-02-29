"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Port of lower_bound from https://en.cppreference.com/w/cpp/algorithm/lower_bound
// Used to compute insertion inder to keep queue sorted after insertion
function lowerBound(array, value, comparator) {
  var first = 0;
  var count = array.length;
  while (count > 0) {
    var step = (count / 2) | 0;
    var it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}
exports.default = lowerBound;
