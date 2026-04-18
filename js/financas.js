let gastos = [];
const listaGastos = document.getElementById('listaGastos');
const totalGasto = document.getElementById('totalGasto');

document.getElementById('btnAdicionar').addEventListener('click', () => {
    const desc = document.getElementById('desc').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (desc && valor > 0) {
        // Criando um objeto para o gasto
        const novoGasto = { descricao: desc, valor: valor };
        gastos.push(novoGasto);
        
        atualizarInterface();
        limparCampos();
    } else {
        alert("Preencha a descrição e um valor válido!");
    }
});

function atualizarInterface() {
    listaGastos.innerHTML = "";
    let somaTotal = 0;

    gastos.forEach((gasto) => {
        const row = `<tr>
            <td style="padding: 10px;">${gasto.descricao}</td>
            <td style="text-align: right; padding: 10px;">R$ ${gasto.valor.toFixed(2)}</td>
        </tr>`;
        listaGastos.innerHTML += row;
        somaTotal += gasto.valor;
    });

    totalGasto.innerText = somaTotal.toFixed(2);
}

function limparCampos() {
    document.getElementById('desc').value = "";
    document.getElementById('valor').value = "";
}