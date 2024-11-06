describe('Usuários devem realizar o login', () => {

    let data;

    before(() => {
        cy.fixture('login').then((tData) => {
            data = tData;
        })
    });

    it('atraves da api da aplicacao com sucesso', () => {
        cy.login_api(data.username, data.password)
    })
})
