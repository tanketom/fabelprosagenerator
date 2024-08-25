async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function calculateCombinations(data) {
    const h1Combinations = data.h1formats.length;
    const pCombinations = data.pformats.length;
    const keys = Object.keys(data).filter(key => Array.isArray(data[key]));
    const keyCombinations = keys.reduce((acc, key) => acc * data[key].length, 1);
    return h1Combinations * pCombinations * keyCombinations;
}

async function generateName() {
    try {
        const jsonURL = document.body.getAttribute('data-json-url');
        const data = await fetchData(jsonURL);
        
        const h1Format = getRandomElement(data.h1formats);
        const pFormat = getRandomElement(data.pformats);
        
        const name = h1Format.replace(/{(\w+)}/g, (_, key) => getRandomElement(data[key]));
        const description = pFormat.replace(/{(\w+)}/g, (_, key) => getRandomElement(data[key]));
        
        document.getElementById('generatedName').innerHTML = `<h1>${name}</h1><p>${description}</p>`;
        
        const combinations = calculateCombinations(data);
        document.getElementById('combinations').innerText = `1 av ${combinations} moglegheiter i denne generatoren.`;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        document.getElementById('generatedName').innerHTML = '<h1>Ånei, noko skjedde.</h1><p>Ikkje spør meg, eg er berre eit HTML-ark.</p>';
    }
}

function copyName() {
    const generatedName = document.getElementById('generatedName').innerText;
    navigator.clipboard.writeText(generatedName).then(() => {
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

// Generate name on page load
document.addEventListener('DOMContentLoaded', generateName);