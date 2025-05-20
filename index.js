const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askOperation() {
  rl.question("What operation would you like to perform? (/, *, -, +): ", (op) => {
    if (['/', '*', '-', '+'].includes(op)) {
      console.log(`You chose the operation: ${op}`);
      askFirstNumber(op);
    } else {
      console.log("That is not a valid operation.");
      askOperation();
    }
  });
}

function askFirstNumber(op) {
  rl.question("Enter the first number: ", (num1) => {
    if (isNaN(num1)) {
      console.log("That is not number.");
      askFirstNumber(op);
    }
    else {
      console.log(`The first number is: ${num1}`);
      askSecondNumber(op, num1);
    }
  })
}

function askSecondNumber(op, num1) {
  rl.question("Please enter the second number: ", (num2) => {
    if (isNaN(num2)) {
      console.log("That is not number.");
      askSecondNumber(op, num1);
    }
    else {
      console.log(`The second number is: ${num2}`);
      calculate(op, num1, num2);
    }
  })
}

function calculate(op, num1, num2) {
  const a = Number(num1);
  const b = Number(num2);
  let result;

  switch (op) {
    case '/':
      if (b === 0) {
        console.log("Error: Division by zero is not allowed.");
        rl.close();
        return;
      }
      result = a / b;
      break;
    case '*':
      result = a * b;
      break;
    case '-':
      result = a - b;
      break;
    case '+':
      result = a + b;
      break;
      default:
      console.log("Unknown operation.");
      rl.close();
      return;
  }
  console.log(`Result: ${a} ${op} ${b} = ${result}`);
  askOperation();
}

function askToContinue() {
  rl.question("Do you want to perform another operation? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === 'yes') {
      askOperation();
    } else if (answer.toLowerCase() === 'no') {
      console.log("Goodbye!");
      rl.close();
    } else {
      console.log("Invalid input. Please answer 'yes' or 'no'.");
      askToContinue();
    }
  });
}

const arguments = process.argv.slice(2);
if (arguments.length === 3 && ['/', '*', '-', '+'].includes(arguments[1]) && !isNaN(arguments[0]) && !isNaN(arguments[2])) {
  calculate(arguments[1], arguments[0], arguments[2]);
} else if (arguments.length === 0) {
  askOperation();
} else {
  console.log("Usage: node index.js <num1> <operation> <num2>");
  console.log("Example: node index.js 5 + 3");
  rl.close();
}