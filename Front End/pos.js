let quantity = document.querySelector('.product-quantity');
let add = document.querySelector(".add");
let minus = document.querySelector(".minus");
let num = 0;

console.log(quantity);
console.log(add);
console.log(minus);

// Update the event listeners to handle multiple products
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    let quantityElement = card.querySelector('.product-quantity');
    let addButton = card.querySelector('.add');
    let minusButton = card.querySelector('.minus');
    let priceElement = card.querySelector('.price');
    let slip = document.querySelector('.board-quantity');
    let partial = document.querySelector('.item-price2');

    let num = 0;

    addButton.addEventListener('click', () => {
        num += 1;
        quantityElement.innerHTML = num;
        count();
    });

    minusButton.addEventListener('click', () => {
        if (num > 0) {
            num--;
            quantityElement.innerHTML = num;
            count();
        }
    });

    function count() {
        slip.innerHTML = num;
        let total = num * parseFloat(priceElement.innerHTML);
        partial.innerHTML = total.toFixed(2); // Format the total to 2 decimal places
    }
});

// Payment functionality
const amountDisplay = document.getElementById('amountDisplay');
const changeOutput = document.getElementById('changeOutput');
let totalAmount = 0;

// Calculate total amount based on selected products
function calculateTotal() {
    totalAmount = 0;
    productCards.forEach(card => {
        let quantityElement = card.querySelector('.product-quantity');
        let priceElement = card.querySelector('.price');
        let productQuantity = parseInt(quantityElement.innerHTML);
        let productPrice = parseFloat(priceElement.innerHTML);
        
        totalAmount += productQuantity * productPrice;
    });
    // Optionally, you can log the total amount to the console for debugging
    console.log(`Total Amount: ₱${totalAmount.toFixed(2)}`);
}

// Keypad functionality for payment input
const numberButtons = document.querySelectorAll('.number-btn');
let paymentInput = '';

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentInput += button.dataset.value;
        amountDisplay.innerHTML = `₱${parseFloat(paymentInput).toFixed(2)}`;
    });
});

// Backspace functionality
document.getElementById('backspace').addEventListener('click', () => {
    paymentInput = paymentInput.slice(0, -1); // Remove the last character
    amountDisplay.innerHTML = paymentInput ? `₱${parseFloat(paymentInput).toFixed(2)}` : '₱0.00';
});

// Clear input functionality
document.getElementById('clearInput').addEventListener('click', () => {
    paymentInput = '';
    amountDisplay.innerHTML = '₱0.00';
    changeOutput.innerHTML = ''; // Reset the change output
    totalAmount = 0; // Reset the total amount
});

// Calculate change functionality
document.getElementById('calculateChange').addEventListener('click', () => {
    const paymentAmount = parseFloat(paymentInput);
    if (isNaN(paymentAmount) || paymentAmount < totalAmount) {
        changeOutput.innerHTML = "Insufficient payment.";
    } else {
        const change = paymentAmount - totalAmount;
        changeOutput.innerHTML = `Change: ₱${change.toFixed(2)}`;
    }
});

// Call calculateTotal whenever an item is added or removed
productCards.forEach(card => {
    card.querySelector('.add').addEventListener('click', calculateTotal);
    card.querySelector('.minus').addEventListener('click', calculateTotal);
});