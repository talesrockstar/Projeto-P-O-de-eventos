document.getElementById("mostrarMais").addEventListener("click", function () {
  const texto = document.getElementById("descricao")
  const spanMostrarMais = document.getElementById("spanMostrarMais")

  if (spanMostrarMais.textContent == "Mostrar Mais") {
    texto.classList.replace('line-clamp-5', 'line');
    spanMostrarMais.innerHTML = "Mostrar Menos";
  }

  else if (spanMostrarMais.textContent == "Mostrar Menos") {
    texto.classList.replace('line', 'line-clamp-5');
    spanMostrarMais.innerHTML = "Mostrar Mais";
  }
})

document.getElementById("fechar").addEventListener("click", function () {
  window.location.reload();
})

document.getElementById("cancelar").addEventListener("click", function () {
  window.location.reload();
})

document.getElementById("confirmarCompra").addEventListener("click", function () {
  window.location.href = "https://www.globo.com";
})