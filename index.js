const rs = require('readline-sync');

const operationsList = ['/', '*', '-', '+'];

const askOperation = (operationsList) => {
  return rs.question(
    `\nWhat operation would you like to perform? (${operationsList.join(', ')})\n` +
    "Or enter a full equation:\n",
  );
}

const getNumbers = (order) => rs.questionInt(`Enter the ${order} number: `, {
  limitMessage: "That is not a valid operation.",
  limit: input => !isNaN(Number(input)),
  limitMessage: "This is not a number.",
}
) ;

function calculate(operationTask, numberOne, numberTwo) {
  switch (operationTask) {
    case '/':
      if (numberTwo === 0) {
        console.log("Error: Division by zero is not allowed.");
      }
      return numberOne / numberTwo;
    case '*':
      return numberOne * numberTwo;
    case '-':
      return numberOne - numberTwo;
    case '+':
      return numberOne + numberTwo;
  }
}

function parseEquation(equation) {
  const match = equation.match(/^(\d+)\s*([\+\-\*\/])\s*(\d+)$/);
  if (!match) return null;
  return {
    firstNumber: parseInt(match[1], 10),
    operator: match[2],
    secondNumber: parseInt(match[3], 10),
  }
}

const startCalculator = (operationsList) => {
  while (true) {
    try {
    const operation = askOperation(operationsList);
    const parsedOperation = parseEquation(operation);
    if (parsedOperation && operationsList.includes(parsedOperation.operator)) {
      if (parsedOperation.operator === '/' && parsedOperation.secondNumber === 0) {
        console.log("Error: Division by zero is not allowed.");
        continue;
      }
      const result = calculate(parsedOperation.operator, parsedOperation.firstNumber, parsedOperation.secondNumber);
      console.log(`The result is: ${result}`);
      break;
    }
    if (!operationsList.includes(operation)) {
      console.log("That is not a valid operation.");
      continue;
    }
    const firstNumber = getNumbers('first');
    if (isNaN(firstNumber)) {
      console.log("This is not a number.");
      continue;
    }
    const secondNumber = getNumbers('second');
    if (isNaN(secondNumber)) {
      console.log("This is not a number.");
      continue;
    }
    if (operation === '/' && secondNumber === 0) {
      console.log("Error: Division by zero is not allowed.");
      continue;
    }
    const result = calculate(operation, firstNumber, secondNumber);
    console.log(`The result is: ${result}`);
    break;
    } catch (error) {
    console.log("An error occured: ", error.message);
    continue;
    }
  }
}

startCalculator(operationsList);

