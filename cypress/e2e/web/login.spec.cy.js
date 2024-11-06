describe('Usuários devem realizar o login', () => {
  let data;

  before(() => {
    cy.fixture("login").then((tData) => {
      data = tData;
      cy.log(data.username);
      cy.log(data.password);
    });
  });

  it('atraves da pagina da aplicacao com sucesso', () => {
    cy.login(data.username, data.password);
  });
});
