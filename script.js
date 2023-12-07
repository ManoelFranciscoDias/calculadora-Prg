//SELECIONANDO BOTÕES E SELETORES

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

//MANIPULAÇÃO DE ELMENTOS

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //FORMATAÇÃO NUMERO

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let intergerDisplay;

    if (isNaN(integerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    //ARMAZENANDO O RESULTADO

    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);


    //VERIFICANDO NUMERO

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;


    //CALCULANDO AS OPERAÇÕES

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "/":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  //CALCULAR O NUMERO ATUAL JUNTO COM O HISTORICO

  chooseOperation(operation) {
    if (this.previousOperand != "") {
      this.calculate();
    }

    if (this.currentOperand == "") return;

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  //DEIXAR SOMENTE UM PONTO

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number == ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  //LIMPAR

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}




const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);


//BOTÔES DE NUMEROS


for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

//EXECUTAR OS BOTÕES DE NUMEROS

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

//LIMPAR QND CLICK
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

//BOTÃO DE IGUAL

equalsButtons.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});


//BOTÃO DE DELETE

deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  
  if (event.key >= "0" && event.key <= "9") {
    calculator.appendNumber(event.key);
    calculator.updateDisplay();
  }

  else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    calculator.chooseOperation(event.key);
    calculator.updateDisplay();
  } else if (event.key === "Enter" || event.key === "=") {
    calculator.calculate();
    calculator.updateDisplay(); }

});

