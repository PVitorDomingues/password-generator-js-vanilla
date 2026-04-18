document.getElementById('btnCalcular').addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const display = document.getElementById('resultadoImc');

    if (peso > 0 && altura > 0) {
        const imc = (peso / (altura * altura)).toFixed(2);
        document.getElementById('valorImc').innerText = `Seu IMC: ${imc}`;
        
        let classificacao = "";
        if (imc < 18.5) classificacao = "Abaixo do peso";
        else if (imc < 25) classificacao = "Peso normal";
        else if (imc < 30) classificacao = "Sobrepeso";
        else classificacao = "Obesidade";

        document.getElementById('classificacaoImc').innerText = classificacao;
        display.style.display = "block";
    } else {
        alert("Por favor, preencha os valores corretamente!");
    }
});