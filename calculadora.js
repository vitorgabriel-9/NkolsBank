const display = document.getElementById('display');

// Insere números e operadores no visor
function insert(value) {
    if (display.value === "0" || display.value === "Erro") {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Limpa todo o visor
function clearDisplay() {
    display.value = "";
}

// Apaga o último caractere digitado
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Realiza o cálculo
function calculate() {
    try {
        let expression = display.value;
        
        // Lógica simples para porcentagem: transforma 'x%' em 'x/100'
        if (expression.includes('%')) {
            expression = expression.replace(/(\d+)%/g, '($1/100)');
        }

        // eval() processa a string matemática
        let result = eval(expression);

        // Formatação para evitar números gigantes com muitas casas decimais
        if (!Number.isInteger(result)) {
            result = result.toFixed(4).replace(/\.?0+$/, "");
        }

        display.value = result;
    } catch (e) {
        display.value = "Erro";
        setTimeout(clearDisplay, 1500);
    }
}