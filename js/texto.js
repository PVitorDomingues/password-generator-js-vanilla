const textArea = document.getElementById('inputText');
const btnUpper = document.getElementById('btnUpper');
const btnLower = document.getElementById('btnLower');
const btnCopy = document.getElementById('btnCopy');
const btnClear = document.getElementById('btnClear');

btnUpper.addEventListener('click', () => {
    textArea.value = textArea.value.toUpperCase();
});

btnLower.addEventListener('click', () => {
    textArea.value = textArea.value.toLowerCase();
});

btnClear.addEventListener('click', () => {
    textArea.value = '';
});

btnCopy.addEventListener('click', () => {
    textArea.select();
    navigator.clipboard.writeText(textArea.value);
    
    const originalText = btnCopy.innerText;
    btnCopy.innerText = "Copiado!";
    setTimeout(() => btnCopy.innerText = originalText, 1500);
});