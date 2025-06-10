# language: pt

Funcionalidade: Barra Lateral e Cabeçalho da Aplicação Plannea
  Como um usuário da aplicação Plannea,
  Eu quero interagir com a barra lateral e o cabeçalho
  Para navegar pela aplicação e acessar informações.

  Contexto: Acessando a página principal
    Dado que estou na página inicial da aplicação

  Cenário: Visualização da barra lateral no Desktop
    Quando estou visualizando em um dispositivo desktop
    Então a barra lateral deve estar visível por padrão
    E o botão de menu mobile não deve estar visível

  Cenário: Interação com links da barra lateral no Desktop
    Quando estou visualizando em um dispositivo desktop
    E clico no link "Criar eventos" na barra lateral
    Então o link "Criar eventos" deve estar marcado como ativo
    E o link "Início" não deve estar marcado como ativo

  Cenário: Visualização inicial em Tablet/Mobile
    Quando estou visualizando em um dispositivo tablet ou mobile
    Então a barra lateral deve estar escondida por padrão
    E o botão de menu mobile "☰" deve estar visível

  Esquema do Cenário: Abrir e fechar menu mobile pelo botão
    Quando estou visualizando em um dispositivo <TipoDispositivo>
    E clico no botão de menu mobile
    Então a barra lateral deve ficar visível
    E o overlay deve ficar visível
    E o botão de menu mobile deve exibir "✕"
    Quando clico novamente no botão de menu mobile
    Então a barra lateral deve ficar escondida
    E o overlay não deve estar visível
    E o botão de menu mobile deve exibir "☰"

    Exemplos:
      | TipoDispositivo |
      | tablet          |
      | mobile          |

  Esquema do Cenário: Fechar menu mobile pelo overlay
    Quando estou visualizando em um dispositivo <TipoDispositivo>
    E clico no botão de menu mobile para abrir o menu
    E clico no overlay fora da barra lateral
    Então a barra lateral deve ficar escondida
    E o overlay não deve estar visível

    Exemplos:
      | TipoDispositivo |
      | tablet          |
      | mobile          |

  Esquema do Cenário: Fechar menu mobile ao clicar em um link
    Quando estou visualizando em um dispositivo <TipoDispositivo>
    E clico no botão de menu mobile para abrir o menu
    E clico no link "Detalhes de Evento" na barra lateral
    Então a barra lateral deve ficar escondida
    E o link "Detalhes de Evento" deve estar marcado como ativo

    Exemplos:
      | TipoDispositivo |
      | tablet          |
      | mobile          |

  Cenário: Interação com a barra de pesquisa
    Quando digito "Festa Junina" no campo de pesquisa do cabeçalho
    Então o campo de pesquisa deve conter "Festa Junina"



