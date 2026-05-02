// Função para carregar o Google Analytics dinamicamente
(function() {
    const gaId = 'G-7N9WE0HZR0'; 

    // Cria o elemento de script da tag global
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Inicializa o dataLayer e a função gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', gaId);
    
    console.log("Analytics carregado com sucesso.");
})();

(() => {
  // Configuração das ferramentas 
  const tools = [
    { icon: '🔐', label: 'Gerador de Senhas', href: 'gerador.html' },
    { icon: '⚖️', label: 'Calculadora de IMC', href: 'imc.html'    },
    { icon: '💰', label: 'Controle de Finanças', href: 'financas.html' },
    { icon: '🆔', label: 'Gerador de CPF',    href: 'cpf.html'    },
    { icon: '🏢', label: 'Gerador de CNPJ',   href: 'cnpj.html'   },
    { icon: '🔠', label: 'Conversor de Texto', href: 'texto.html'  },
  ];

  // Detecta o arquivo atual para marcar o link ativo 
  const currentFile = window.location.pathname.split('/').pop();

  // Detecta se estamos na raiz (index) ou numa sub-pasta (tools/) 
  const isIndex   = currentFile === 'index.html' || currentFile === '';
  const basePath  = isIndex ? 'tools/' : '';
  const homeHref  = isIndex ? '#'      : '../index.html';

  // Gera os links da nav
  const navLinks = tools.map(({ icon, label, href }) => {
    const isActive = currentFile === href ? ' active' : '';
    return `
      <a href="${basePath}${href}" class="sidebar-link${isActive}">
        <span class="sidebar-link-icon">${icon}</span>
        <span>${label}</span>
      </a>`;
  }).join('');

  //  HTML completo da sidebar + toggle mobile 
  const sidebarHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <a href="${homeHref}" class="sidebar-brand">
          <span class="sidebar-logo">⌘</span>
          <span class="sidebar-title">DevTools</span>
        </a>
      </div>
      <nav class="sidebar-nav">
        <p class="sidebar-section-label">Ferramentas</p>
        ${navLinks}
      </nav>
      <div class="sidebar-footer">
        <span class="sidebar-footer-text">v1.0.0</span>
      </div>
    </aside>

    <button class="sidebar-toggle" id="sidebarToggle" aria-label="Abrir menu">☰</button>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
  `;

  // ─── Injeta no início do body ────────────────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // ─── Lógica mobile (toggle + overlay) ────────────────────────────────────────
  const sidebar = document.querySelector('.sidebar');
  const toggle  = document.getElementById('sidebarToggle');
  const overlay = document.getElementById('sidebarOverlay');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
})();