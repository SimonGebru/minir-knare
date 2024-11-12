document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".buttons button");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    let currentValue = "";
    let operator = "";
    let result = 0;
    let expectingOperator = false;
    let inputString = ""; // Håller reda på hela inmatningssträngen

    function updateDisplay(value) {
        display.textContent = value;
    }

    function resetCalculator() {
        currentValue = "";
        operator = "";
        result = 0;
        inputString = "";
        updateDisplay("0");
        disableButtons(operatorButtons, true);
        disableButtons(numberButtons, false);
        expectingOperator = false;
    }

    function disableButtons(buttons, status) {
        buttons.forEach(button => {
            button.disabled = status;
        });
    }

    function calculate() {
        if (operator === "+") {
            result += parseFloat(currentValue);
        } else if (operator === "-") {
            result -= parseFloat(currentValue);
        } else if (operator === "*") {
            result *= parseFloat(currentValue);
        } else if (operator === "/") {
            result /= parseFloat(currentValue);
        } else {
            result = parseFloat(currentValue);
        }
        currentValue = "";
        operator = "";
    }

    function handleButtonPress(button) {
        const value = button.getAttribute("data-value");

        if (button.classList.contains("number")) {
            currentValue += value;
            inputString += value;
            updateDisplay(inputString);
            disableButtons(operatorButtons, false);
            disableButtons(numberButtons, true);
            expectingOperator = true;
        }

        if (button.classList.contains("operator")) {
            if (expectingOperator && currentValue !== "") {
                calculate();
                operator = value;
                inputString += " " + operator + " ";
                updateDisplay(inputString);
                disableButtons(operatorButtons, true);
                disableButtons(numberButtons, false);
                expectingOperator = false;
            }
        }

        if (button.classList.contains("equals")) {
            if (currentValue !== "" && operator) {
                calculate();
                inputString += " = " + result;
                updateDisplay(inputString);
                currentValue = "";
                operator = "";
                inputString = result.toString();
                disableButtons(operatorButtons, true);
                disableButtons(numberButtons, false);
                expectingOperator = false;
            }
        }

        if (button.classList.contains("clear")) {
            resetCalculator();
        }

        if (button.id === "sqrt") {
            result = Math.sqrt(parseFloat(currentValue) || result);
            inputString = "√" + inputString + " = " + result;
            updateDisplay(result);
            currentValue = "";
            disableButtons(operatorButtons, true);
            disableButtons(numberButtons, false);
            expectingOperator = false;
        }

        if (button.id === "square") {
            result = (parseFloat(currentValue) || result) ** 2;
            inputString = inputString + "² = " + result;
            updateDisplay(result);
            currentValue = "";
            disableButtons(operatorButtons, true);
            disableButtons(numberButtons, false);
            expectingOperator = false;
        }

        if (button.id === "restart") {
            resetCalculator();
        }
    }

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            handleButtonPress(this);
        });
    });

    document.addEventListener("keydown", function(event) {
        const key = event.key;
        const button = Array.from(buttons).find(btn => btn.getAttribute("data-value") === key || btn.textContent === key);
        if (button) {
            handleButtonPress(button);
        }
        if (key === "Enter") {
            handleButtonPress(document.getElementById("equals"));
        }
        if (key === "Escape") {
            handleButtonPress(document.getElementById("clear"));
        }
    });

    resetCalculator();
});


