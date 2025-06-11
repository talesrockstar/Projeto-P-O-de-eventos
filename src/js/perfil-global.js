// Função para carregar imagem de perfil do usuário
function carregarImagemPerfil() {
    const dadosUsuario = localStorage.getItem('dadosUsuario')
    
    if (dadosUsuario) {
        const dados = JSON.parse(dadosUsuario)
        
        // Buscar todas as imagens de perfil na página
        const imagensPerfil = document.querySelectorAll('.avatar-usuario, .img-header, img[alt*="perfil"], img[alt*="Avatar"], img[src*="FOTO_PERFIL"], img[src*="User_thomas"], img[src*="Ludmila"]')
        
        if (dados.imagemPerfil && dados.imagemPerfil !== 'src/img/Image.svg') {
            imagensPerfil.forEach(img => {
                img.src = dados.imagemPerfil
            })
        }
        
        // Atualizar nomes de usuário se existirem
        const nomesUsuario = document.querySelectorAll('.nome-usuario, span:contains("Thomas"), span:contains("Ludimilo")')
        if (dados.nome) {
            nomesUsuario.forEach(elemento => {
                if (elemento.textContent.includes('Thomas') || elemento.textContent.includes('Ludimilo')) {
                    elemento.textContent = dados.nome
                }
            })
        }
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    carregarImagemPerfil()
})

