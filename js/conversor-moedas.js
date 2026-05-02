async function converter() {
    const valor = document.getElementById('valorBRL').value;
    const moeda = document.getElementById('moedaDestino').value;
    const resultadoDiv = document.getElementById('resultado');

    if (valor === "" || valor <= 0) {
        resultadoDiv.innerText = "Por favor, insira um valor válido.";
        return;
    }

    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`);
        const data = await response.json();
        
        // A API retorna algo como USDBRL
        const parMoeda = `${moeda}BRL`;
        const cotacao = data[parMoeda].bid;
        
        const valorConvertido = (valor / cotacao).toFixed(2);
        
        resultadoDiv.innerHTML = `Cotação Atual: R$ ${parseFloat(cotacao).toFixed(2)} <br> 
                                  Resultado: ${moeda} ${valorConvertido}`;
    } catch (error) {
        resultadoDiv.innerText = "Erro ao buscar cotação. Tente novamente.";
        console.error("Erro na API:", error);
    }
}