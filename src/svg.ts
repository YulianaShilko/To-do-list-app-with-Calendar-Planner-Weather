const gear = require("./img/gear.svg") as string;
function importSVG(): void {
    const element = <HTMLDivElement>(document.createElement('div'));
    element.innerHTML = gear;
    const gearDiv: HTMLElement = document.getElementById('config__visible');
    gearDiv.appendChild(element);
}

export {importSVG} 