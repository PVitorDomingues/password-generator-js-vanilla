const cpfOutput = document.getElementById('cpfOutput');
const btnGerar = document.getElementById('btnGerarCPF');
const btnCopiar = document.getElementById('copyButton');
const checkPontuacao = document.getElementById('comPontuacao');

// Função para gerar os dígitos verificadores
function gerarDigito(base) {
    let soma = 0;
    let peso = base.length + 1;
    for (let num of base) {
        soma += parseInt(num) * peso--;
    }
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function gerarCPF() {
    let n = [];
    // Gera os 9 primeiros números aleatórios
    for (let i = 0; i < 9; i++) {
        n.push(Math.floor(Math.random() * 10));
    }

    // Calcula o 1º dígito verificador
    n.push(gerarDigito(n));
    // Calcula o 2º dígito verificador
    n.push(gerarDigito(n));

    let cpfFinal = n.join('');

    if (checkPontuacao.checked) {
        cpfFinal = cpfFinal.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    cpfOutput.innerText = cpfFinal;
}

// Eventos
btnGerar.addEventListener('click', gerarCPF);

btnCopiar.addEventListener('click', () => {
    const texto = cpfOutput.innerText;
    navigator.clipboard.writeText(texto);
    
    const originalText = btnCopiar.innerText;
    btnCopiar.innerText = "Copiado!";
    setTimeout(() => btnCopiar.innerText = originalText, 1500);
});

// Gera um ao carregar a página
gerarCPF();