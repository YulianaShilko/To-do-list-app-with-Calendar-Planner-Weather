"use strict";
exports.__esModule = true;
var gear = require("./img/gear.svg");
function importSVG() {
    var element = (document.createElement('div'));
    element.innerHTML = gear;
    var gearDiv = document.getElementById('config__visible');
    gearDiv.appendChild(element);
}
exports.importSVG = importSVG;
