// Função para carregar dados do usuário na página de perfil
function carregarDadosUsuario() {
    const dadosUsuario = localStorage.getItem('dadosUsuario')
    
    if (dadosUsuario) {
        const dados = JSON.parse(dadosUsuario)
        
        // Atualizar campos de texto
        document.getElementById('nome').value = dados.nome || 'Thomas'
        document.getElementById('email').value = dados.email || 'thomas123@gmail.com'
        document.getElementById('endereco').value = dados.endereco || 'Rua das Acácias, 123 - Bairro Jardim das Flores'
        document.getElementById('telefone').value = dados.telefone || '(31) 99876-5432'
        
        // Atualizar imagem de perfil
        const imagemPerfil = document.querySelector('.avatar img')
        if (dados.imagemPerfil && dados.imagemPerfil !== 'src/img/Image.svg') {
            imagemPerfil.src = dados.imagemPerfil
        }
    }
}

// Função para salvar alterações no perfil
function salvarAlteracoesPerfil() {
    const dadosUsuario = localStorage.getItem('dadosUsuario')
    
    if (dadosUsuario) {
        const dados = JSON.parse(dadosUsuario)
        
        // Atualizar dados com os valores dos campos
        dados.nome = document.getElementById('nome').value
        dados.email = document.getElementById('email').value
        dados.endereco = document.getElementById('endereco').value
        dados.telefone = document.getElementById('telefone').value
        
        // Salvar no localStorage
        localStorage.setItem('dadosUsuario', JSON.stringify(dados))
        
        console.log('Dados do perfil atualizados')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Carregar dados do usuário primeiro
    carregarDadosUsuario()
    
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

                // Salvar alterações no localStorage
                salvarAlteracoesPerfil()

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
                    
                    // Atualizar dados no localStorage
                    const dadosUsuario = localStorage.getItem('dadosUsuario')
                    if (dadosUsuario) {
                        const dados = JSON.parse(dadosUsuario)
                        dados.imagemPerfil = e.target.result
                        localStorage.setItem('dadosUsuario', JSON.stringify(dados))
                    }

                    console.log('Nova foto de perfil selecionada e salva')
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

