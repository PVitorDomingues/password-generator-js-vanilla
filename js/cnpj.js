const cnpjOutput = document.getElementById('cnpjOutput');
const btnGerar = document.getElementById('btnGerarCNPJ');
const btnCopiar = document.getElementById('copyButton');
const checkPontuacao = document.getElementById('comPontuacao');

function validarDigito(base, pesos) {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
        soma += base[i] * pesos[i];
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCNPJ() {
    let n = [];
    // Gera os primeiros 8 números aleatórios
    for (let i = 0; i < 8; i++) {
        n.push(Math.floor(Math.random() * 10));
    }
    
    // Adiciona o padrão 0001 
    n.push(0, 0, 0, 1);

    // Pesos para o 1º dígito
    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    n.push(validarDigito(n, pesos1));

    // Pesos para o 2º dígito
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    n.push(validarDigito(n, pesos2));

    let cnpjFinal = n.join('');

    if (checkPontuacao.checked) {
        cnpjFinal = cnpjFinal.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }

    cnpjOutput.innerText = cnpjFinal;
}

btnGerar.addEventListener('click', gerarCNPJ);

btnCopiar.addEventListener('click', () => {
    navigator.clipboard.writeText(cnpjOutput.innerText);
    const originalText = btnCopiar.innerText;
    btnCopiar.innerText = "Copiado!";
    setTimeout(() => btnCopiar.innerText = originalText, 1500);
});

gerarCNPJ();