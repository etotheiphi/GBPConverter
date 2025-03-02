const apiKey = '4110c42ad6b1de029572a2ceb7939cab'; 
const baseUrl = 'http://data.fixer.io/api/latest';

async function fetchExchangeRates() {
    try {
        const response = await fetch(`${baseUrl}?access_key=${apiKey}&base=EUR`);
        const data = await response.json();
        
        if (data.success) {
            displayRates(data.rates);
        } else {
            throw new Error('Failed to fetch exchange rates');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('rates-container').innerHTML = 'Failed to load exchange rates';
    }
}

function displayRates(rates) {
    const container = document.getElementById('rates-container');
    container.innerHTML = '';

    for (const [currency, rate] of Object.entries(rates)) {
        const rateElement = document.createElement('div');
        rateElement.className = 'rate';
        rateElement.textContent = `${currency}: ${rate.toFixed(4)}`;
        container.appendChild(rateElement);
    }
}

fetchExchangeRates();
