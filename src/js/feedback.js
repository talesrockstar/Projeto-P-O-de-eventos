document.addEventListener("DOMContentLoaded", function () {
  const estrelas = document.querySelectorAll(".nivel .fa-star"); // Seleciona todas as estrelas
  const inputNivel = document.getElementById("nivel"); // Seleciona o campo oculto para armazenar o nível

  estrelas.forEach((estrela, indice) => {
    // Adiciona o evento de clique em cada estrela
    estrela.addEventListener("click", () => {
      const nivelSelecionado = indice + 1; // Define o nível com base no índice da estrela
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
});