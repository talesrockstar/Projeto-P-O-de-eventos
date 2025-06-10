// spec.cy.js

describe("Testes da Página de Criação de Evento (Baseado em Gherkin)", () => {
  // Contexto: Carregar a página antes de cada cenário
  beforeEach(() => {
    cy.visit("criar_evento.html"); // Ajuste o caminho se necessário
  });

  // Cenário: Visualizar a página de criação de evento
  it("Deve visualizar a página de criação de evento corretamente", () => {
    // Então eu devo ver o título "Criar Evento"
    cy.get(".page-title").should("be.visible").and("contain", "Criar Evento");

    // E eu devo ver a seção "1. Informações básicas"
    cy.contains(".section-title", "1. Informações básicas").should("be.visible");
    cy.get("label[for=\"event-name\"]").should("be.visible");
    cy.get("label[for=\"event-image\"]").should("be.visible");
    cy.get("label[for=\"event-type\"]").should("be.visible");
    cy.get("label[for=\"participants-range\"]").should("be.visible");

    // E eu devo ver a seção "2. Descrição do evento"
    cy.contains(".section-title", "2. Descrição do evento").should("be.visible");
    cy.get("label[for=\"event-description\"]").should("be.visible");

    // E eu devo ver a seção "3. Data e horário"
    cy.contains(".section-title", "3. Data e horário").should("be.visible");
    cy.get("label[for=\"event-date\"]").should("be.visible");
    cy.get("label[for=\"event-time\"]").should("be.visible");

    // E eu devo ver a seção "4. Local do evento"
    cy.contains(".section-title", "4. Local do evento").should("be.visible");
    cy.get("label[for=\"event-address\"]").should("be.visible");
    cy.get("label[for=\"street-name\"]").should("be.visible");
    cy.get("label[for=\"event-cep\"]").should("be.visible");
    cy.get("label[for=\"event-city\"]").should("be.visible");
    cy.get("label[for=\"event-state\"]").should("be.visible");

    // E eu devo ver os botões "Cancelar" e "Criar evento"
    cy.get(".btn-cancel").should("be.visible").and("contain", "Cancelar");
    cy.get(".btn-create").should("be.visible").and("contain", "Criar evento");
  });

  // Cenário: Preencher informações básicas do evento
  it("Deve preencher informações básicas do evento", () => {
    // Quando eu preencho o campo "Nome do evento"
    cy.get("#event-name").type("Festa Junina da Comunidade");

    // E eu seleciono uma imagem para "Imagem do evento"
    // Simulação: Cypress não interage diretamente com a janela de seleção de arquivos nativa.
    // Usamos selectFile se o input for visível ou preparamos um fixture.
    // Como o input está hidden, vamos apenas verificar se o elemento existe.
    cy.get("#event-image").should("exist"); 
    // Para um teste real, você pode precisar de um plugin ou tornar o input visível temporariamente.
    // Exemplo com selectFile (se o input fosse visível):
    // cy.get('#event-image').selectFile('cypress/fixtures/imagem_teste.png');

    // E eu seleciono "Presencial" no campo "Tipo de evento"
    cy.get("#event-type").select("presencial");

    // E eu seleciono "51-100" no campo "Faixa de participantes"
    cy.get("#participants-range").select("51-100");

    // Então o campo "Nome do evento" deve conter "Festa Junina da Comunidade"
    cy.get("#event-name").should("have.value", "Festa Junina da Comunidade");

    // E o campo "Tipo de evento" deve ter "Presencial" selecionado
    cy.get("#event-type").should("have.value", "presencial");

    // E o campo "Faixa de participantes" deve ter "51-100" selecionado
    cy.get("#participants-range").should("have.value", "51-100");
  });

  // Cenário: Preencher descrição do evento
  it("Deve preencher a descrição do evento", () => {
    const descricao = "Venha celebrar conosco com comidas típicas, música e diversão!";
    // Quando eu preencho o campo "Conte os detalhes do seu evento"
    cy.get("#event-description").type(descricao);
    // Então o campo "Conte os detalhes do seu evento" deve conter a descrição
    cy.get("#event-description").should("have.value", descricao);
  });

  // Cenário: Preencher data e horário do evento
  it("Deve preencher data e horário do evento", () => {
    // Quando eu preencho o campo "Data do evento"
    cy.get("#event-date").type("24/06/2025");
    // E eu preencho o campo "Hora do evento"
    cy.get("#event-time").type("18:00");

    // Então o campo "Data do evento" deve conter "24/06/2025"
    cy.get("#event-date").should("have.value", "24/06/2025");
    // E o campo "Hora do evento" deve conter "18:00"
    cy.get("#event-time").should("have.value", "18:00");
  });

  // Cenário: Preencher local do evento
  it("Deve preencher o local do evento", () => {
    // Quando eu preencho os campos de endereço
    cy.get("#event-address").type("Praça Central, 123");
    cy.get("#street-name").type("Rua Principal");
    cy.get("#event-cep").type("12345-678");
    cy.get("#event-city").type("São Paulo");
    cy.get("#event-state").type("SP");

    // Então os campos devem conter os valores inseridos
    cy.get("#event-address").should("have.value", "Praça Central, 123");
    cy.get("#street-name").should("have.value", "Rua Principal");
    cy.get("#event-cep").should("have.value", "12345-678");
    cy.get("#event-city").should("have.value", "São Paulo");
    cy.get("#event-state").should("have.value", "SP");
  });

  // Cenário: Tentar criar evento com campos obrigatórios vazios (Exemplo: Nome do evento)
  it("Deve mostrar erro ao tentar criar evento sem nome", () => {
    // Quando eu deixo o campo "Nome do evento" vazio
    // (Não preenchemos o nome)

    // E eu preencho os outros campos necessários (exemplo mínimo)
    cy.get("#event-type").select("online");
    cy.get("#participants-range").select("1-10");
    cy.get("#event-description").type("Descrição teste");
    cy.get("#event-date").type("10/10/2025");
    cy.get("#event-time").type("10:00");
    cy.get("#event-address").type("Endereço teste");
    // ... preencher outros campos se forem obrigatórios pela lógica da aplicação

    // E eu clico no botão "Criar evento"
    cy.get(".btn-create").click();

    // Então eu devo ver uma mensagem de erro indicando que o nome é obrigatório
    // A implementação da validação (mensagem, estilo) depende do script.js
    // Exemplo: Verificar se o campo ficou com uma classe de erro
    cy.get("#event-name").should("have.class", "campo-invalido"); // Supondo que a classe 'campo-invalido' seja adicionada
    // Ou verificar uma mensagem de erro específica (se houver)
    // cy.contains(".mensagem-erro", "O nome do evento é obrigatório").should("be.visible");
    
    // Adicionamos um listener para o evento 'invalid' que o navegador dispara em inputs required
    // Isso funciona se o input tiver o atributo 'required'
    cy.get('#event-name').then($input => {
      $input.on('invalid', (e) => {
        expect(e.target.validationMessage).to.contain('Preencha este campo'); // Mensagem padrão do navegador
      });
    });
    // Nota: A validação real depende da implementação no script.js ou atributos HTML.
    // Este teste pode precisar de ajustes com base na lógica de validação real.
  });

  // Cenário: Cancelar a criação do evento
  it("Deve cancelar a criação do evento", () => {
    // Quando eu preencho alguns campos do formulário
    cy.get("#event-name").type("Evento a ser cancelado");
    cy.get("#event-description").type("Descrição qualquer");

    // E eu clico no botão "Cancelar"
    // Verificamos a URL antes do clique
    cy.url().then(urlAntes => {
      cy.get(".btn-cancel").click();
      
      // Então eu devo ser redirecionado para a página anterior
      // Ou verificar se o formulário foi limpo
      // Verificando se a URL mudou (assumindo que o botão cancelar navega para trás ou para uma URL específica)
      // cy.url().should('not.eq', urlAntes); // Se navegar para outra página
      // cy.url().should('include', '/pagina-anterior'); // Se navegar para uma página específica
      
      // Ou verificando se os campos foram limpos (se essa for a ação de cancelar)
       cy.get("#event-name").should("have.value", "");
       cy.get("#event-description").should("have.value", "");
       // Nota: A ação exata do botão "Cancelar" depende da implementação no script.js
    });
  });
});

