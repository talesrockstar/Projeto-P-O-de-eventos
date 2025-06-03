/*1 - Quando clicar no botão de voltar deve voltar para a página inicial - FEITO
2 - O botão do menu suspenso da aba do perfil deve redirecionar para a 
aba correta quando clicado - FEITO
3 - Quando clicar no Mostrar mais, o botão mostrar mais deve sumir, 
o texto todo deve aparecer, e a sombra também deve sumir - FEITO
4 - Quando clicar em comprar ingresso deve redirecionar para 
a aba de escolher o tipo de ingresso - FEITO
5 - Após escolher o ingresso, deve - se abrir uma aba para selecionar se é 
meia ou inteira e confirmar a compra - FEITO
6 - Após confirmar a compra, deve-se voltar para a página inicial e o evento deve ser adicionado na aba "Meus eventos"*/

document.getElementById("comprarPrincipal").addEventListener("click", function () {
  window.scrollTo(120, document.body.scrollHeight);
})

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

document.querySelectorAll('input[class="form-check-input"]').forEach(radio => {
  radio.addEventListener("change", () => {
    document.getElementById("confirmarCompra").disabled = false;
  });
});