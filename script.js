const API_KEY = 8122aae49bfd87bb911ac452;
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const result = document.getElementById('result');

// Fetch currency data and populate dropdowns
fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data); // For debugging
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                fromCurrency.appendChild(option);
                toCurrency.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => console.error('Error fetching data:', error));

// Conversion logic
convertButton.addEventListener('click', () => {
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    const amountValue = amount.value;

    fetch(`${API_URL}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rates[toCurrencyValue] / data.conversion_rates[fromCurrencyValue];
            const convertedAmount = (amountValue * rate).toFixed(2);
            result.innerHTML = `${amountValue} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
        });
});
