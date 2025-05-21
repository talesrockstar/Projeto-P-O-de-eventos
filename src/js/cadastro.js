// Seleciona o formulário e adiciona um ouvinte de evento para o envio
document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Limpar mensagens de erro anteriores
    clearErrorMessages();

    // Coleta os valores dos campos
    let endereco = document.getElementById("endereco").value;
    let telefone = document.getElementById("telefone").value;
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email");
    let senha = document.getElementById("senha");

    let isValid = true; // Flag para verificar se o formulário é válido

    // Valida os campos e exibe mensagens de erro
    if (endereco === "") {
        showError("endereco", "Por favor, preencha o campo de endereço.");
        isValid = false;
    }
    if (telefone === "") {
        showError("telefone", "Por favor, preencha o campo de telefone.");
        isValid = false;
    }
    if (nome === "") {
        showError("nome", "Por favor, preencha o campo de nome.");
        isValid = false;
    }
    if (email === "") {
        showError("email", "Por favor, preencha o campo de e-mail.");
        isValid = false;
    }
    if (senha === "") {
        showError("senha", "Por favor, preencha o campo de senha.");
        isValid = false;
    }

    // Se o formulário for válido, mostra uma mensagem de sucesso
    if (isValid) {
        alert("Cadastro realizado com sucesso!");
    }
});

// Função para mostrar a mensagem de erro abaixo do campo
function showError(fieldId, message) {
    let errorElement = document.getElementById(fieldId + "Error");
    errorElement.textContent = message;
    errorElement.style.color = "red"; // Adiciona a cor vermelha à mensagem
}

// Função para limpar as mensagens de erro
function clearErrorMessages() {
    let errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function(errorElement) {
        errorElement.textContent = "";
    });
}
