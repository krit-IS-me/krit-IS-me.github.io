function calculateVAT() {
            const basePrice = parseFloat(document.getElementById('basePrice').value);
            const vatRate = parseFloat(document.getElementById('vatRate').value);
            if (isNaN(basePrice) || isNaN(vatRate)) {
                document.getElementById('vatResult').textContent = "Please enter valid numbers.";
                return;
            }
            const vatAmount = basePrice * vatRate / 100;
            const totalPrice = basePrice + vatAmount;
            document.getElementById('vatResult').innerHTML =
                `VAT Amount: ${vatAmount.toFixed(2)}<br>Total Price (incl. VAT): ${totalPrice.toFixed(2)}`;
        }

        function reverseVAT() {
            const totalPrice = parseFloat(document.getElementById('totalPrice').value);
            const vatRate = parseFloat(document.getElementById('reverseVatRate').value);
            if (isNaN(totalPrice) || isNaN(vatRate) || vatRate === -100) {
                document.getElementById('reverseVatResult').textContent = "Please enter valid numbers.";
                return;
            }
            const basePrice = totalPrice / (1 + vatRate / 100);
            const vatAmount = totalPrice - basePrice;
            document.getElementById('reverseVatResult').innerHTML =
                `Base Price (excl. VAT): ${basePrice.toFixed(2)}<br>VAT Amount: ${vatAmount.toFixed(2)}`;
        }