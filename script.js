const display = document.getElementById("display");
const history = document.getElementById("history");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
    history.textContent = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {

    if (display.value === "") {
        return;
    }

    try {

        let expression = display.value;

        history.textContent = expression + " =";

        expression = expression.replace(/%/g, "/100");

        let result = eval(expression);

        if (!isFinite(result)) {
            throw new Error();
        }

        display.value = result;

    } catch (error) {

        display.value = "Error";

        setTimeout(() => {
            clearDisplay();
        }, 1200);
    }
}


/* Keyboard Support */

document.addEventListener("keydown", function(event) {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {

        appendValue(key);

    }

    else if (key === "Enter" || key === "=") {

        event.preventDefault();

        calculate();

    }

    else if (key === "Backspace") {

        deleteLast();

    }

    else if (key === "Escape") {

        clearDisplay();

    }

});