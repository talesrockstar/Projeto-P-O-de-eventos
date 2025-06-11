document.addEventListener("DOMContentLoaded", function () {
    // Recuperar os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obter os valores dos parâmetros
    const nome = urlParams.get("nome") || "Não informado";
    const email = urlParams.get("email") || "Não informado";
    const nivel = parseInt(urlParams.get("nivel")) || 0;
    const comentario = urlParams.get("comentario") || "Nenhum comentário fornecido";
    
    // Preencher os campos com os dados recuperados
    document.getElementById("resposta-nome").textContent = nome;
    document.getElementById("resposta-email").textContent = email;
    document.getElementById("resposta-comentario").textContent = comentario;
    
    // Atualizar as estrelas com base no nível selecionado
    const estrelas = document.querySelectorAll(".nivel-resposta .fa-star");
    estrelas.forEach((estrela, indice) => {
      if (indice < nivel) {
        estrela.classList.add("selecionada");
      } else {
        estrela.classList.remove("selecionada");
      }
    });
    
    // Botão para voltar à página do formulário
    document.getElementById("voltar").addEventListener("click", function() {
      window.location.href = "feedback.html";
    });
    
    // Adicionar evento de clique para o ícone de voltar no cabeçalho
    document.querySelector(".left-section").addEventListener("click", function() {
      window.location.href = "index-logado.html";
    });
  });
  