// const button = document.getElementById('button');
// function displayTip() {
//     const inputElement = document.getElementById('bill');
//     const inputValue = parseFloat(inputElement.value);
//     let tipValue = inputValue * 0.2;
//     document.getElementById('tipDisplay').textContent = tipValue.toFixed(2);
//     document.getElementById('output').textContent = (inputValue + tipValue).toFixed(2);
//     console.log("The user entered: ", inputValue);
// }



// inputElement.addEventListener('keyup', function (event) {
//     if (event.key === 'Enter') { 
//         event.preventDefault();
//         alert("clicked!");
//     }
// });

function displayTip() {
    const inputElement = document.getElementById('bill');
    const inputValue = parseFloat(inputElement.value);
    const percentageElement = document.getElementById('percentage');
    const percentValue = parseFloat(percentageElement.value) / 100; // Convert percentage to decimal
    document.getElementById('percentDisplay').textContent = percentageElement.value;
    // // Check if input is valid
    // if (isNaN(inputValue) || inputValue <= 0) {
    //     return;
    // }
        // Validate input
    if (isNaN(inputValue) || inputValue <= 0) {
        const alertValidAmount = document.getElementById('alertValidAmount');
        alertValidAmount.innerText = "Please enter a valid amount";
        return;
    }
    else {
        alertValidAmount.innerText = "";
    }
    
    let tipValue = inputValue * percentValue;
    document.getElementById('tipDisplay').textContent = tipValue.toFixed(2);
    document.getElementById('output').textContent = (inputValue + tipValue).toFixed(2);
    console.log("The user entered: ", inputValue);
}

// Add event listener for Enter key on the input field
document.getElementById('bill').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        displayTip();
    }
});

// Add event listener for when the percentage select changes
document.getElementById('percentage').addEventListener('change', function() {
    document.getElementById('percentDisplay').textContent = this.value;
    displayTip();
});