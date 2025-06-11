const botaoAlterarFoto = document.querySelector('.change-photo')
const imagemAvatar = document.querySelector('.avatar img')
const formCadastro = document.getElementById('formCadastro')

let imagemPerfilSelecionada = null

// Função para alterar foto de perfil
botaoAlterarFoto.addEventListener('click', function () {
    // Cria um input de arquivo invisível
    const inputArquivo = document.createElement('input')
    inputArquivo.type = 'file'
    inputArquivo.accept = 'image/*'
    inputArquivo.style.display = 'none'

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
                imagemPerfilSelecionada = e.target.result

                console.log('Nova foto de perfil selecionada')
            }

            // Lê o arquivo como URL de dados
            leitor.readAsDataURL(this.files[0])
        }

        // Remove o input de arquivo do DOM
        document.body.removeChild(inputArquivo)
    })
})

// Função para processar o cadastro
formCadastro.addEventListener('submit', function(e) {
    e.preventDefault()

    // Capturar dados do formulário
    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('exampleInputEmail1').value.trim()
    const senha = document.getElementById('exampleInputPassword1').value.trim()
    const endereco = document.getElementById('endereco').value.trim()
    const telefone = document.getElementById('telefone').value.trim()

    // Validar campos obrigatórios
    if (!nome || !email || !senha || !endereco || !telefone) {
        alert('Por favor, preencha todos os campos obrigatórios.')
        return
    }

    // Criar objeto com dados do usuário
    const dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha, // Em produção, isso deveria ser criptografado
        endereco: endereco,
        telefone: telefone,
        imagemPerfil: imagemPerfilSelecionada || 'src/img/Image.svg',
        dataCadastro: new Date().toISOString()
    }

    // Salvar no localStorage
    localStorage.setItem('dadosUsuario', JSON.stringify(dadosUsuario))

    // Mostrar mensagem de sucesso
    alert('Cadastro realizado com sucesso!')

    // Redirecionar para página de login
    setTimeout(() => {
        window.location.href = 'login.html'
    }, 1000)
})