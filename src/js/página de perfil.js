document.addEventListener('DOMContentLoaded', function () {
    // Referências aos elementos
    const botoesEditar = document.querySelectorAll('.edit-button')
    const campos = document.querySelectorAll('input')
    const botaoAlterarFoto = document.querySelector('.change-photo')
    const imagemAvatar = document.querySelector('.avatar img')

    // Adicionar evento de clique aos botões de edição
    botoesEditar.forEach((botao, indice) => {
        botao.addEventListener('click', function () {
            const campo = this.parentElement.querySelector('input')

            // Se o campo estiver desabilitado, habilita para edição
            if (campo.disabled) {
                campo.disabled = false
                campo.focus()
                this.innerHTML = '<i class="fas fa-check"></i>' // Muda para ícone de confirmar

                // Adiciona classe para destacar o campo em edição
                campo.classList.add('editando')
            } else {
                // Se já estiver habilitado, desabilita e salva o valor
                campo.disabled = true;
                this.innerHTML = '<i class="fas fa-pen"></i>'

                // Remove classe de destaque
                campo.classList.remove('editando')

                // Aqui você poderia adicionar código para salvar o valor em um servidor
                console.log(`Campo ${campo.id} atualizado para: ${campo.value}`)
            }
        });
    });


    // Evento para o botão de alterar foto
    botaoAlterarFoto.addEventListener('click', function () {
        // Cria um input de arquivo invisível
        const inputArquivo = document.createElement('input')
        inputArquivo.type = 'file'
        inputArquivo.accept = 'image/*'
        inputArquivo.style.display = 'none'

        // Adiciona o input ao DOM
        document.body.appendChild(inputArquivo);

        // Simula um clique no input de arquivo
        inputArquivo.click()

        // Quando um arquivo for selecionado
        inputArquivo.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const leitor = new FileReader()

                leitor.onload = function (e) {
                    // Atualiza a imagem do avatar com a nova imagem
                    imagemAvatar.src = e.target.result

                    // Aqui você poderia adicionar código para enviar a imagem para um servidor
                    console.log('Nova foto de perfil selecionada')
                }

                // Lê o arquivo como URL de dados
                leitor.readAsDataURL(this.files[0])
            }

            // Remove o input de arquivo do DOM
            document.body.removeChild(inputArquivo)
        })
    })


    // Adicionar estilo para campos em edição no CSS dinâmico
    const estilo = document.createElement('style');
    estilo.textContent = `
        input.editando {
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }
    `
    document.head.appendChild(estilo)
})