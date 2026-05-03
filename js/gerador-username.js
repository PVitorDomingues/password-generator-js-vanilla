function gerarUsername() {
    const palavra = document.getElementById('palavraChave').value.trim();
    const lista = document.getElementById('listaUsers');
    const container = document.getElementById('resultadoUser');
    
    // Listas expandidas para maior variedade
    const prefixos = ['iam', 'soy', 'the', 'real', 'oficial', 'hey', 'its', 'sr'];
    const adjetivos = ['Dev', 'Ninja', 'Expert', 'Pro', 'Creative', 'Tech', 'Code', 'Pixel', 'Logic'];
    const sufixos = ['Flow', 'Hub', 'Vibe', 'Lab', 'Studio', 'Systems', 'Script'];
    
    let sugestoes = [];
    
    // Função para pegar item aleatório
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < 8; i++) { // Gerando 8 opções agora
        let nome = "";
        const modelo = Math.floor(Math.random() * 5); // Escolhe um padrão de construção

        if (palavra) {
            switch(modelo) {
                case 0: nome = `${palavra}.${rand(adjetivos)}`; break; // vitor.dev
                case 1: nome = `${rand(prefixos)}${palavra}`; break;   // iamvitor
                case 2: nome = `${palavra}_${rand(sufixos)}`; break;   // vitor_tech
                case 3: nome = `${palavra}${Math.floor(Math.random() * 999)}`; break; // vitor777
                case 4: nome = `${rand(adjetivos)}${palavra}`; break;   // CodeVitor
            }
        } else {
            // Se não houver palavra-chave, combina adjetivos e sufixos de forma aleatória
            nome = modelo % 2 === 0 ? `${rand(adjetivos)}${rand(sufixos)}` : `${rand(prefixos)}_${rand(adjetivos)}`;
        }
        
        sugestoes.push(nome.toLowerCase());
    }

    // Remover duplicatas e renderizar
    const uniqueSugestoes = [...new Set(sugestoes)];
    lista.innerHTML = uniqueSugestoes.map(u => `
        <li style="padding: 8px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
            ${u}
            <button onclick="navigator.clipboard.writeText('${u}')" style="padding: 2px 5px; font-size: 10px; background: #eee; border: 1px solid #ccc; cursor: pointer;">Copiar</button>
        </li>
    `).join('');
    
    container.style.display = 'block';
}