
let totalAmount = 99;
let currentInput = "";

document.getElementById('amountDisplay').textContent = currentInput;

document.querySelectorAll('.number-btn').forEach(button => {
    button.addEventListener('click', function() {
        currentInput += this.getAttribute('data-value');
        document.getElementById('amountDisplay').textContent = currentInput;
    });
});

document.getElementById('clearInput').addEventListener('click', function() {
    currentInput = "";
    document.getElementById('amountDisplay').textContent = currentInput;
});

document.getElementById('calculateChange').addEventListener('click', function() {
    let inputAmount = parseFloat(currentInput);
    
    if (isNaN(inputAmount)) {
        alert("Please enter a valid amount.");
        return;
    }


    let change = inputAmount - totalAmount;

    if (change < 0) {
        alert("Insufficient amount. Please enter a higher amount.");
    } else {
        document.getElementById('changeOutput').textContent = "Change: ₱" + change.toFixed(2);
    }
});