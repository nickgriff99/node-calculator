const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askOperation() {
  rl.question("What operation would you like to perform? (/, *, -, +): ", (op) => {
    if (['/', '*', '-', '+'].includes(op)) {
      console.log(`You chose the operation: ${op}`);
      rl.close();
    } else {
      console.log("Invalid operation. Please choose one of the following: /, *, -, +");
      askOperation();
    }
  });
}