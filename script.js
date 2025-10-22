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

//CONST de Caracteres
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARACTERS = '0123456789';
const SYMBOL_CHARACTERS = '!@#$%^&*()_+[]{}|;:,.<>?\\\'\"';

/**
 * Gera uma nova senha com base nos parâmetros fornecidos.
 * @param {number} length - Comprimento da senha.
 * @param {boolean} useUpper - Incluir letras maiúsculas.
 * @param {boolean} useLower - Incluir letras minúsculas.
 * @param {boolean} useNumbers - Incluir números.
 * @param {boolean} useSymbols - Incluir símbolos.
 * @returns {string} A senha gerada.
 */

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let allowedCharacters = ''; 
    let password = '';          // A senha sendo construída

    if (useUpper) allowedCharacters += UPPERCASE_CHARACTERS;
    if (useLower) allowedCharacters += LOWERCASE_CHARACTERS;
    if (useNumbers) allowedCharacters += NUMBER_CHARACTERS;
    if (useSymbols) allowedCharacters += SYMBOL_CHARACTERS;

    if (allowedCharacters.length === 0){
        return 'Selecione ao menos uma opção!';
    }
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);

        //Adiciona o caractere aleatório à senha
        password += allowedCharacters[randomIndex];
    }

    return password;
}

// Atualiza o valor do comprimento da senha quando o slider é movido
passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;
    // Futuramente, chamaremos a função de gerar senha aqui também para atualização dinâmica
});

// Evento de clique para o botão "GERAR NOVA SENHA"
generateButton.addEventListener('click', () => {
    // Coleta dos Inputs
    const length = parseInt(passwordLength.value);
    const useUpper = includeUppercase.checked;
    const useLower = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;

    // Chama a função que gera senha
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols)

    // Atualiza a tela
    passwordOutput.value = newPassword;
});

// Evento de clique para o botão "Copiar"
copyButton.addEventListener('click', () => {
    // Lógica de copiar senha
    console.log('Botão Copiar Clicado!');
    // Aqui entra a função para copiar para a área de transferência
});

// Valor inicial do comprimento
lengthValue.textContent = passwordLength.value;

