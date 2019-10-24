//* Pobiera xmla i zwraca go jako tekst
async function getData() {
    const resp = await fetch('./xml/uop_ready.xml');
    const data = await resp.text();
    return data;
};

async function prepareData() {

    //* Asynchronicznie woła getData()
    const uopArray = [];
    const response = await getData();
    const parser = new DOMParser();

    //* Podstawowe uporządkowanie otrzymanego tesktu + jego parsowanie
    uopXML = parser.parseFromString(response, 'text/xml');
    uopXML = uopXML.getElementsByTagName('element');

    //* Trwa 35-40ms więc funkcja będzie wołana asynchronicznie
    //console.time('Timer1');
    for (let i = 0; i < uopXML.length; i++) {
        /*let currentElementFamily = uopXML[i].attributes[0].textContent;
        let currentElementNumber = uopXML[i].children[0].innerHTML;
        let currentElementSymbol = uopXML[i].children[1].innerHTML;
        let currentElementName = uopXML[i].children[2].innerHTML;
        let currentElementMass = uopXML[i].children[3].innerHTML;*/

        const element = {};
        element.family = uopXML[i].attributes[0].textContent;
        element.number = uopXML[i].children[0].innerHTML;
        element.symbol = uopXML[i].children[1].innerHTML;
        element.name = uopXML[i].children[2].innerHTML;
        element.mass = uopXML[i].children[3].innerHTML;

        uopArray.push(element);
        //console.log(`${i + 1} : ${currentElementFamily}, ${currentElementNumber}, ${currentElementSymbol}, ${currentElementName}, ${currentElementMass}`);
    }
    //console.timeEnd('Timer1');
    return uopArray;
};


async function addElementsToDOM() {
    const arr = await prepareData();
    const ulElement = document.querySelector('#display');
    arr.forEach(obj => {
        const liElement = document.createElement('li');
        liElement.classList.add(classify(obj.family));
        liElement.textContent = obj.name;
        liElement.addEventListener('click', updateDisplay);
        ulElement.appendChild(liElement);
    });

};

//* Klasyfikuje po obj.family
function classify(prop) {
    if (prop === 'nonmetal')
        return 'type-nm';
    if (prop === 'alkali metal')
        return 'type-am';
    if (prop === 'alkaline earth metal')
        return 'type-aem';
    if (prop === 'metalloid')
        return 'type-md';
    if (prop === 'halogen')
        return 'type-h';
    if (prop === 'noble gas')
        return 'type-ng';
    if (prop === 'transition metal')
        return 'type-tm';
    if (prop === 'lanthanoid')
        return 'type-ld';
    if (prop === 'metal')
        return 'type-m';
    if (prop === 'actinoid')
        return 'type-ad';
};


async function updateDisplay(e) {
    const arr = await prepareData();
    const displayEl = document.querySelector('#element-display');
    const numberEl = document.querySelector('#element-number');
    const symbolEl = document.querySelector('#element-symbol');
    const nameEl = document.querySelector('#element-name');
    const massEl = document.querySelector('#element-mass');

    arr.find((obj) => {
        if (obj.name === e.target.textContent) {
            //console.log(`${obj.number}, ${obj.symbol}, ${obj.name}, ${obj.mass}`);
            numberEl.textContent = obj.number;
            symbolEl.textContent = obj.symbol;
            nameEl.textContent = obj.name;
            massEl.textContent = obj.mass;
            displayEl.classList.replace(displayEl.classList[0], classify(obj.family));
            //displayEl.classList.add(classify(obj.family));
        }
    });
}

addElementsToDOM();
//* Działa wszystko C: