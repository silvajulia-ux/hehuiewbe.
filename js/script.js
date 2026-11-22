// ==========================================
// MEMÓRIAS DA TRAJETÓRIA ESCOLAR
// ==========================================

const timelineData = [
  {
    title: "Jardim de infância / Pré-escola",
    date: "PRIMEIROS ANOS",
    image: "img/jardim.jpg",
    caption: "As primeiras descobertas",
    story: "Aqui ficam as lembranças dos primeiros passos na escola: brincadeiras, amizades, curiosidades e tudo aquilo que despertou minha vontade de aprender."
  },
  {
    title: "Ensino Fundamental I",
    date: "1º AO 5º ANO",
    image: "img/fundamental1.jpg",
    caption: "Aprender e crescer",
    story: "Uma fase de alfabetização, descobertas e novas amizades. Escreva sobre professores marcantes, atividades favoritas e conquistas."
  },
  {
    title: "Ensino Fundamental II",
    date: "6º AO 9º ANO",
    image: "img/fundamental2.jpg",
    caption: "Novos desafios",
    story: "Mudanças, matérias diferentes, amizades e amadurecimento. Conte os desafios que superou e os momentos especiais."
  },
  {
    title: "1º ano do Ensino Médio",
    date: "1º ANO",
    image: "img/primeiro.jpg",
    caption: "Um novo ciclo",
    story: "O início de uma etapa diferente, com novas responsabilidades e experiências."
  },
  {
    title: "2º ano do Ensino Médio",
    date: "2º ANO",
    image: "img/segundo.jpg",
    caption: "Entre aprendizados e mudanças",
    story: "Um ano de crescimento, descobertas e preparação para o futuro."
  },
  {
    title: "3º ano do Ensino Médio",
    date: "CONCLUSÃO",
    image: "img/terceiro.jpg",
    caption: "O encerramento de uma etapa",
    story: "O último ano reúne despedidas, expectativas e a celebração de tudo que foi construído."
  }
];

// Seleciona a linha do tempo no HTML
const timeline = document.getElementById("timeline");

// Cria os itens da linha do tempo
timelineData.forEach((item) => {
  const article = document.createElement("article");

  article.className = "timeline-item";

  article.innerHTML = `
    <div class="timeline-marker"></div>

    <div class="timeline-card">

      <div class="timeline-image">

        <img
          src="${item.image}"
          alt="${item.caption}"
          onerror="this.hidden=true"
        >

        <span class="placeholder-icon">▧</span>
        <span>${item.caption}</span>

        <small>Substitua ${item.image}</small>

      </div>

      <div class="timeline-info">

        <span class="timeline-date">
          ${item.date}
        </span>

        <h3>${item.title}</h3>

        <p>${item.story}</p>

      </div>

    </div>
  `;

  timeline.appendChild(article);
});


// ==========================================
// PORTFÓLIO DE REDAÇÕES
// ==========================================

// IMPORTANTE:
// No arquivo completo para download, a variável
// "essays" contém as 15 redações integrais.
// Mantenha essa lista completa acima desta parte.

const essayGrid = document.getElementById("essayGrid");
const searchInput = document.getElementById("essaySearch");
const essayCount = document.getElementById("essayCount");
const noResults = document.getElementById("noResults");

// Cria uma prévia do texto
function makePreview(text) {
  if (text.length > 170) {
    return text.slice(0, 170) + "...";
  }

  return text;
}

// Mostra os cards
function renderEssays(query = "") {

  const search = query.toLowerCase().trim();

  const filtered = essays.filter((essay) => {

    const content =
      essay.title + " " +
      essay.paragraphs.join(" ");

    return content.toLowerCase().includes(search);
  });

  essayGrid.innerHTML = "";

  filtered.forEach((essay) => {

    const card = document.createElement("article");

    card.className = "essay-card";

    card.innerHTML = `
      <div class="essay-card-top">

        <span class="essay-number">
          REDAÇÃO ${String(essay.id).padStart(2, "0")}
        </span>

        <span class="essay-tag">
          Texto dissertativo
        </span>

      </div>

      <h3>${essay.title}</h3>

      <p class="essay-preview">
        ${makePreview(essay.paragraphs.join(" "))}
      </p>

      <button
        class="read-button"
        data-essay="${essay.id}"
      >
        Ler redação completa ↗
      </button>
    `;

    essayGrid.appendChild(card);
  });

  essayCount.textContent =
    `${filtered.length} ${
      filtered.length === 1 ? "redação" : "redações"
    }`;

  noResults.hidden = filtered.length > 0;
}

// Inicia os cards
renderEssays();

// Pesquisa automática
searchInput.addEventListener("input", (event) => {
  renderEssays(event.target.value);
});


// ==========================================
// MODAL DE LEITURA
// ==========================================

const modal = document.getElementById("essayModal");

const modalTitle = document.getElementById("modalTitle");

const modalBody = document.getElementById("modalBody");

const modalKicker = document.getElementById("modalKicker");

// Abre a redação escolhida
function openEssay(id) {

  const essay = essays.find(
    (item) => item.id === Number(id)
  );

  if (!essay) return;

  modalKicker.textContent =
    `REDAÇÃO ${String(essay.id).padStart(2, "0")} · TEXTO COMPLETO`;

  modalTitle.textContent = essay.title;

  modalBody.innerHTML = "";

  essay.paragraphs.forEach((content) => {

    const paragraph = document.createElement("p");

    paragraph.textContent = content;

    modalBody.appendChild(paragraph);

  });

  modal.showModal();
}

// Detecta clique nos botões
essayGrid.addEventListener("click", (event) => {

  const button = event.target.closest("[data-essay]");

  if (button) {
    openEssay(button.dataset.essay);
  }

});

// Fechar modal
document.getElementById("modalClose")
  .addEventListener("click", () => modal.close());

document.getElementById("modalCloseBottom")
  .addEventListener("click", () => modal.close());

// Fecha ao clicar fora
modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    modal.close();
  }

});


// ==========================================
// MENU PARA CELULAR
// ==========================================

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});

// Fecha o menu ao clicar em um link
mainNav.querySelectorAll("a").forEach((link) => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


// ==========================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ==========================================

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );

  document
    .querySelectorAll(
      ".timeline-item, .essay-card, .section-heading"
    )
    .forEach((element) => {

      observer.observe(element);

    });

}
