function createAccount(pin, amount = 0) {
    return {
        checkBalance(enteredPin) {
            if (enteredPin !== pin) {
                return "Invalid PIN.";
            } else {
                return `$${amount}`;
            }
        },
        deposit(enteredPin, depositAmt) {
            if (enteredPin !== pin) {
                return "Invalid PIN.";
            } else {
                amount = amount + depositAmt;
                return `Succesfully deposited $${depositAmt}. Current balance: $${amount}.`;
            }
        },
        withdraw(enteredPin, amt) {
            if (enteredPin !== pin) {
                return "Invalid PIN.";
            } else {
                if (amt > amount) {
                    return "Withdrawal amount exceeds account balance. Transaction cancelled.";
                } else {
                    amount = amount - amt;
                    return `Succesfully withdrew $${amt}. Current balance: $${amount}.`;
                }
            }
        },
        changePin(enteredPin, newPin) {
            if (enteredPin !== pin) {
                return "Invalid PIN.";
            } else {
                pin = newPin;
                return "PIN successfully changed!";
            }
        },
    };
}

module.exports = { createAccount };
