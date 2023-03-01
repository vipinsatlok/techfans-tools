"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addZero = void 0;
function addZero(num, length) {
    let output = String(num);
    // get num length
    const numLenght = String(num).length;
    // if length is less then num length
    if (numLenght > length)
        return output;
    // get diff length
    const diff = length - numLenght;
    // for in loop length
    for (let i = 0; i < length; i++) {
        output = "0" + output;
    }
    return output;
}
exports.addZero = addZero;
