class CalculationEngine {
    
    // Iteration 1: start1
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
    multiply(a, b) { return a * b; }
    percentage(a) { return a / 100; }
    // Iteration 1: end1

    // Iteration 4: start4
    divide(a, b) { 
        if (b === 0) throw new Error("Division by zero");
        return a / b; 
    }
    // Iteration 4: end4

    // Iteration 2 & 3: start2_3
    squareRoot(a) { 
        if (a < 0) throw new Error("Invalid domain for root");
        return Math.sqrt(a); 
    }
    power(base, exp) { return Math.pow(base, exp); }
    sin(a) { return Math.sin(a * Math.PI / 180); }
    cos(a) { return Math.cos(a * Math.PI / 180); }
    // Iteration 2 & 3: end2_3
}

class InputHandler {
    constructor() {
        this.expression = "";
    }
    
    processInput(val) { this.expression += val; }
    deleteInput() { this.expression = this.expression.slice(0, -1); }
    clearInput() { this.expression = ""; }
}

class CalculatorUI {
    constructor() {
        this.displayValue = "0";
        this.currentExpression = "";
        this.inputHandler = new InputHandler();
        this.engine = new CalculationEngine();
    }

    enterInput(value) {
        this.inputHandler.processInput(value);
        this.currentExpression = this.inputHandler.expression;
        this.updateDisplay();
    }

    selectOperation(op) {
        this.inputHandler.processInput(` ${op} `);
        this.currentExpression = this.inputHandler.expression;
        this.updateDisplay();
    }

    async displayResult() {
        try {
            const result = eval(this.currentExpression);
            
            // Iteration 4: start4
            if (!isFinite(result)) throw new Error("Math Error");
            // Iteration 4: end4
            
            const expressionText = this.currentExpression;
            const resultText = String(result);

            document.getElementById('history').innerText = `${expressionText} = ${resultText}`;

            // Iteration 6: start6
            await fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression: expressionText, result: resultText })
            });
            // Iteration 6: end6

            this.displayValue = resultText;
            this.currentExpression = resultText;
            this.inputHandler.expression = resultText;
        } catch (error) {
            // Iteration 4: start4
            this.displayValue = "Error";
            document.getElementById('display').innerText = "Error";
            this.inputHandler.clearInput();
            this.currentExpression = "";
            return;
            // Iteration 4: end4
        }
        this.updateDisplay();
    }

    // Iteration 2 & 3: start2_3
    async applyScientific(funcName) {
        try {
            let val = parseFloat(this.currentExpression);
            if (isNaN(val)) {
                val = eval(this.currentExpression || "0");
            }
            if (isNaN(val)) throw new Error("Invalid Input");

            let result;
            let expressionText;

            if (funcName === 'pow') {
                const exponentStr = prompt("Enter exponent (y):", "2");
                if (exponentStr === null) return;
                const exp = parseFloat(exponentStr);
                if (isNaN(exp)) throw new Error("Invalid Exponent");

                result = this.engine.power(val, exp);
                expressionText = `${val}^${exp}`;
            } else {
                switch(funcName) {
                    case 'sqrt': result = this.engine.squareRoot(val); expressionText = `√(${val})`; break;
                    case 'sin': result = this.engine.sin(val); expressionText = `sin(${val})`; break;
                    case 'cos': result = this.engine.cos(val); expressionText = `cos(${val})`; break;
                    default: return;
                }
            }

            if (!isFinite(result)) throw new Error("Math Error");
            const resultText = String(result);

            document.getElementById('history').innerText = `${expressionText} = ${resultText}`;

            // Iteration 6: start6
            await fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ expression: expressionText, result: resultText })
            });
            // Iteration 6: end6

            this.currentExpression = resultText;
            this.inputHandler.expression = resultText;
        } catch (err) {
            this.displayValue = "Error";
            document.getElementById('display').innerText = "Error";
            this.inputHandler.clearInput();
            this.currentExpression = "";
            return;
        }
        this.updateDisplay();
    }
    // Iteration 2 & 3: end2_3

    // Iteration 6: start6
    async toggleHistory() {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            
            if (data.length === 0) {
                alert("No history found in database.");
                return;
            }

            let historyList = "Recent Database History:\n";
            data.forEach((item, index) => {
                historyList += `${index + 1}. ${item.expression} = ${item.result}\n`;
            });
            alert(historyList);
        } catch (error) {
            alert("Could not connect to database server.");
        }
    }
    // Iteration 6: end6

    clearDisplay() {
        this.inputHandler.clearInput();
        this.currentExpression = "";
        this.displayValue = "0";
        document.getElementById('history').innerText = "";
        this.updateDisplay();
    }

    deleteInput() {
        this.inputHandler.deleteInput();
        this.currentExpression = this.inputHandler.expression;
        this.updateDisplay();
    }

    // Iteration 5: start5
    updateDisplay() {
        document.getElementById('display').innerText = this.currentExpression === "" ? "0" : this.currentExpression;
    }
    // Iteration 5: end5
}

const calculatorUI = new CalculatorUI();