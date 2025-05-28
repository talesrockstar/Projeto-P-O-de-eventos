const botaoAlterarFoto = document.querySelector('.change-photo')
const imagemAvatar = document.querySelector('.avatar img')

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