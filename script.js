// Seção para acessar os elementos do DOM
const passwordOutput = document.getElementById('passwordOutput');
const copyButton = document.getElementById('copyButton');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const passwordLength = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const generateButton = document.getElementById('generateButton');

// Atualiza o valor do comprimento da senha quando o slider é movido
passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;
    // Futuramente, chamaremos a função de gerar senha aqui também para atualização dinâmica
});

// Evento de clique para o botão "GERAR NOVA SENHA"
generateButton.addEventListener('click', () => {
    // Por enquanto, apenas um log para testar
    console.log('Botão Gerar Nova Senha Clicado!');
    // Aqui entrará a lógica principal de gerar e mostrar a senha
});

// Evento de clique para o botão "Copiar"
copyButton.addEventListener('click', () => {
    // Lógica de copiar senha
    console.log('Botão Copiar Clicado!');
    // Aqui entra a função para copiar para a área de transferência
});

// Valor inicial do comprimento
lengthValue.textContent = passwordLength.value;