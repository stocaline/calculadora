const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");

let input = "";

for (let key of keys){
    const value = key.dataset.key;

    key.addEventListener("click", () => {
        if(value == "clear"){
            input = "";
            displayInput.innerHTML = "";
            displayOutput.innerHTML = "";
        } else if(value == "backspace"){
            input = input.slice(0, -1);
            displayInput.innerHTML = clearInput(input);
        } else if(value == "=") {
            let result = eval(perpareInput(input));

            displayOutput.innerHTML = clearOutput(result);
        } else if(value == "brackets") {
            if (input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && 
                input.lastIndexOf("(") < input.lastIndexOf(")")
            ){
                input += "(";
            } else if (input.indexOf("(") != -1 && 
                       input.indexOf(")") == -1 ||
                       input.indexOf("(") != -1 &&
                       input.indexOf(")") != -1 &&
                       input.lastIndexOf("(") > input.lastIndexOf(")")
            ){
                input += ")";
            }

            displayInput.innerHTML = clearInput(input);
        } else {
            if(validateInput(value)){
                input += value;
                displayInput.innerHTML = clearInput(input);
            }
        }

    })
}

function clearInput(input) {
    let inputArray = input.split("");
    let inputArrayLength = inputArray.length;

    for(let i = 0; i < inputArrayLength; i++) {
        if(inputArray[i] == "*"){
            inputArray[i] = `<span class="operator">x</span>`;
        } else if (inputArray[i] == "/"){
            inputArray[i] = `<span class="operator">÷</span>`;
        } else if (inputArray[i] == "+"){
            inputArray[i] = `<span class="operator">+</span>`;
        } else if (inputArray[i] == "-"){
            inputArray[i] = `<span class="operator">-</span>`;
        } else if (inputArray[i] == "("){
            inputArray[i] = `<span class="brackets">(</span>`;
        } else if (inputArray[i] == ")"){
            inputArray[i] = `<span class="brackets">)</span>`;
        } else if (inputArray[i] == "%"){
            inputArray[i] = `<span class="brackets">%</span>`;
        }
    }

    return inputArray.join("");
}

function clearOutput(output) {
    let outputString =output.toString();
    let decimal = outputString.split(".")[1];
    outputString = outputString.split(".")[0];

    let outputArray = outputString.split("");

    if(outputArray.length > 3) {
        for (let i = outputArray.length - 3; i > 0; i -= 3){
            outputArray.splice(i, 0, ".");
        }
    }

    if(decimal){
        outputArray.push(".");
        outputArray.push(decimal);
    }

    return outputArray.join("");
}

function validateInput(value){
    let lastInput = input.slice(-1);
    let operator = ["+", "-", "*", "/"]

    if(value == "." && lastInput == "."){
        return false;
    }

    if(operator.includes(value)){
        if(operator.includes(lastInput)){
            return false;
        } else {
            return true;
        }
    }

    return true;
}

function perpareInput(input){
    let inputArray = input.split("");

    for(let i = 0; i < inputArray.length; i++){
        if(inputArray[i] == "%"){
            inputArray[i] = "/100";
        }
    }

    return inputArray.join("");
}