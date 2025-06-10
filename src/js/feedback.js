document.addEventListener("DOMContentLoaded", function () {
  const estrelas = document.querySelectorAll(".nivel .fa-star"); // Seleciona todas as estrelas
  const inputNivel = document.getElementById("nivel"); // Seleciona o campo oculto para armazenar o nível
  const formFeedback = document.getElementById("feedbackForm"); // Seleciona o formulário
  const btnEnviar = document.getElementById("enviar"); // Botão de enviar
  const btnCancelar = document.getElementById("cancelar"); // Botão de cancelar
  
  // Inicializa o nível como 0 (nenhuma estrela selecionada)
  let nivelSelecionado = 0;

  estrelas.forEach((estrela, indice) => {
    // Adiciona o evento de clique em cada estrela
    estrela.addEventListener("click", () => {
      nivelSelecionado = indice + 1; // Define o nível com base no índice da estrela
      inputNivel.value = nivelSelecionado; // Atualiza o valor do campo oculto

      // Atualiza as classes das estrelas
      estrelas.forEach((e, i) => {
        if (i < nivelSelecionado) {
          e.classList.add("selecionada"); // Adiciona a classe "selecionada" às estrelas até o nível escolhido
        } else {
          e.classList.remove("selecionada"); // Remove a classe das estrelas restantes
        }
      });
    });
  });
  
  // Função para limpar o formulário
  function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("comentario").value = "";
    nivelSelecionado = 0;
    inputNivel.value = 0;
    
    // Limpa as estrelas
    estrelas.forEach(e => {
      e.classList.remove("selecionada");
    });
  }
  
  // Evento de clique no botão cancelar
  btnCancelar.addEventListener("click", function(e) {
    e.preventDefault();
    limparFormulario();
  });
  
  // Evento de clique no botão enviar
  btnEnviar.addEventListener("click", function(e) {
    e.preventDefault();
    
    // Obter os valores do formulário
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const comentario = document.getElementById("comentario").value.trim();
    
    // Validação simples
    if (!nome) {
      alert("Por favor, digite seu nome.");
      return;
    }
    
    if (!email) {
      alert("Por favor, digite seu email.");
      return;
    }
    
    // Construir a URL com os parâmetros do formulário
    const params = new URLSearchParams();
    params.append("nome", nome);
    params.append("email", email);
    params.append("nivel", nivelSelecionado);
    params.append("comentario", comentario);
    
    // Redirecionar para a página de resposta com os dados
    window.location.href = "feedback2.html?" + params.toString();
  });
});
