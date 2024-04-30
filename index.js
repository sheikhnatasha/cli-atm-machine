#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// initialize user balance and pin code
let mybalance = 10000;
let mypin = 12345;
// prtint welcome message
console.log(chalk.blue("\n\twelcome to Sheikh Natasha Arif - ATM Machine\n"));
let pinanswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
if (pinanswer.pin === mypin) {
    console.log(chalk.greenBright("\nPin is Correct, Login Successfully!\n"));
    // console.log(`Current Acount Balance is ${mybalance}`)
    let operationanswer = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    if (operationanswer.operation === "Withdraw Amount") {
        let withdrawanswer = await inquirer.prompt([
            {
                name: "withdrawmethod",
                type: "list",
                message: "select a withdraw method:",
                choices: ["fast cash", "Enter amount"]
            }
        ]);
        if (withdrawanswer.withdrawmethod === "fast cash") {
            let fastcashanswer = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: "select amount:",
                    choices: ["1000", "3000", "5000", "7000", "8000", "10000", "11000"]
                }
            ]);
            if (fastcashanswer.fastcash > mybalance) {
                console.log(chalk.red("Insufficients Balance"));
            }
            else {
                mybalance -= fastcashanswer.fastcash;
                console.log(`${fastcashanswer.fastcash} Withdraw Successfully`);
                console.log(chalk.bgCyanBright(`your remaining balance is ${mybalance}`));
            }
        }
        else if (withdrawanswer.withdrawmethod === "Enter amount") {
            let Amountanswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (Amountanswer.amount > mybalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                mybalance -= Amountanswer.amount;
                console.log(`${Amountanswer.amount} withdraw successfully`);
                console.log(chalk.bgHex(`your remaining balance is: ${mybalance}`));
            }
        }
    }
    else if (operationanswer.operation === "Check Balance") {
        console.log(chalk.bgYellowBright(`Your Account Balance is: ${mybalance}`));
    }
}
else {
    console.log(chalk.bgRedBright("Pin is Incorrect, Try Again!"));
}
