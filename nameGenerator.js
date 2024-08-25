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

async function generateName() {
    try {
        const jsonURL = document.body.getAttribute('data-json-url');
        const data = await fetchData(jsonURL);
        
        const h1Format = getRandomElement(data.h1formats);
        const pFormat = getRandomElement(data.pformats);
        
        const name = h1Format.replace(/{(\w+)}/g, (_, key) => getRandomElement(data[key]));
        const description = pFormat.replace(/{(\w+)}/g, (_, key) => getRandomElement(data[key]));
        
        document.getElementById('generatedName').innerHTML = `<h1>${name}</h1><p>${description}</p>`;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        document.getElementById('generatedName').innerHTML = '<h1>Error generating name</h1><p>Please check the console for details.</p>';
    }
}

function copyName() {
    const generatedName = document.getElementById('generatedName').innerText;
    navigator.clipboard.writeText(generatedName).then(() => {
        alert('Name copied to clipboard!');
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}