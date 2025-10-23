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

// Valor inicial do comprimento
lengthValue.textContent = passwordLength.value;

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
    let password = ''; // A senha sendo construída

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

function updatePasswordStrength(password) {
    let score = 0;
    const length = password.length;

    //Remove todas as classes de força anteriores (resetar a cor da barra)
    strengthBar.className = 'strength-bar';
    strengthText.className = '';

    // Bônus por Comprimento
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1; 

    // Bônus por Tipos de Caracteres (Usando RegExp)
    if (/[A-Z]/.test(password)) score += 1; // Inclui Maiúsculas?
    if (/[a-z]/.test(password)) score += 1; // Inclui Minúsculas?
    if (/[0-9]/.test(password)) score += 1; // Inclui Números?
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Inclui Símbolos?

    // ATRIBUIÇÃO VISUAL COM BASE NO SCORE
    if (score < 3) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = "FRACA";
    } else if (score < 6) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = "MÉDIA";
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = "FORTE";
    }
}

// Atualiza o valor do comprimento da senha quando o slider é movido
passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;

    const length = parseInt(passwordLength.value);
    const useUpper = includeUppercase.checked;
    const useLower = includeLowercase.checked;
    const useNumbers = includeNumbers.checked;
    const useSymbols = includeSymbols.checked;

    // Gera uma nova senha ao mover o slider
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);

    passwordOutput.value = newPassword;

    // Atualiza a força da nova senha
    updatePasswordStrength(newPassword);
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

    // Função de força da senha
    updatePasswordStrength(newPassword);
});

// Evento de clique para o botão "Copiar"
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordOutput.value)
        .then(() => {
            // Feedback visual de que copiou!
            copyButton.textContent = 'COPIADO!';
            setTimeout(() => {
                copyButton.textContent = 'Copiar'; // Volta ao normal após 1.5s
            }, 1500);
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            // Fallback para navegadores antigos
            alert('Não foi possível copiar automaticamente. Copie manualmente.');
        });
});


