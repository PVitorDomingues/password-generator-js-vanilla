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

// Função para coletar opções de senha
function getPasswordOptions() {
    return {
        length: parseInt(passwordLength.value),
        useUpper: includeUppercase.checked,
        useLower: includeLowercase.checked,
        useNumbers: includeNumbers.checked,
        useSymbols: includeSymbols.checked
    };
}


// Valor inicial do comprimento
lengthValue.textContent = passwordLength.value;

/**
 * Gera uma nova senha com base nos parâmetros fornecidos.
 */
function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    let allowedCharacters = ''; 
    let password = '';

    if (useUpper) allowedCharacters += UPPERCASE_CHARACTERS;
    if (useLower) allowedCharacters += LOWERCASE_CHARACTERS;
    if (useNumbers) allowedCharacters += NUMBER_CHARACTERS;
    if (useSymbols) allowedCharacters += SYMBOL_CHARACTERS;

    if (allowedCharacters.length === 0){
        return 'Selecione ao menos uma opção!';
    }
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
        password += allowedCharacters[randomIndex];
    }

    return password;
}

function updatePasswordStrength(password) {
    let score = 0;
    const length = password.length;

    strengthBar.className = 'strength-bar';
    strengthText.className = '';

    // Bônus por Comprimento
    if (length >= 8) score += 1;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1; 

    // Bônus por Tipos de Caracteres (Usando RegExp)
    if (/[A-Z]/.test(password)) score += 1; 
    if (/[a-z]/.test(password)) score += 1; 
    if (/[0-9]/.test(password)) score += 1; 
    if (/[^A-Za-z0-9]/.test(password)) score += 1; 

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
    // Se a senha estiver vazia
    if (length === 0) {
        strengthBar.className = 'strength-bar';
        strengthText.textContent = '';
    }
}

function updateGeneratedPassword() {
    const { length, useUpper, useLower, useNumbers, useSymbols } = getPasswordOptions();

    // Gera a senha
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);

    // Atualiza o output e a força
    passwordOutput.value = newPassword;
    updatePasswordStrength(newPassword);
}

passwordLength.addEventListener('input', () => {
    lengthValue.textContent = passwordLength.value;
    updateGeneratedPassword(); 
});

// Evento de clique para o botão "Gerar Senha"
generateButton.addEventListener('click', () => {
    updateGeneratedPassword();
});

// Evento de clique para o botão "Copiar"
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordOutput.value)
        .then(() => {
            // Feedback visual
            const originalText = copyButton.textContent;
            copyButton.textContent = 'COPIADO!';
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 1500);
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Não foi possível copiar automaticamente. Copie manualmente.');
        });
});