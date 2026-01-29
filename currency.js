async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    
    // Validate input
    if (isNaN(amount) || amount <= 0) {
        const alertValidAmount = document.getElementById('alertValidAmount');
        alertValidAmount.innerText = "Please enter a valid amount";
        return;
    }
    else {
        alertValidAmount.innerText = "";
    }
    
    // Show loading, hide result and error
    document.getElementById('loading').classList.remove('d-none');
    document.getElementById('result').classList.add('d-none');
    document.getElementById('error').classList.add('d-none');
    
    try {
        // Make API request
        const response = await fetch(`https://api.fxratesapi.com/latest?base=${fromCurrency}&currencies=${toCurrency}`);
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        // Parse JSON response
        const data = await response.json();
        
        // Get exchange rate
        const rate = data.rates[toCurrency];
        
        // Calculate converted amount
        const convertedAmount = (amount * rate).toFixed(2);
        
        // Display result
        document.getElementById('convertedAmount').textContent = 
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        document.getElementById('result').classList.remove('d-none');
        
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').classList.remove('d-none');
    } finally {
        // Hide loading spinner
        document.getElementById('loading').classList.add('d-none');
    }
}

// Add event listeners for real-time conversion
document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('fromCurrency').addEventListener('change', convertCurrency);
document.getElementById('toCurrency').addEventListener('change', convertCurrency);

// Convert on page load
window.addEventListener('load', convertCurrency);