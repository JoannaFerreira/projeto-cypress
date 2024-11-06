import {faker} from '@faker-js/faker';

describe('Admins devem realizar o cadastro de novos usuários', () => {

  before(() => {
    cy.auth_bypass_api();
  });

  it('atraves do form da aplicacao com sucesso', () => {
   const password = faker.internet.password(10);
   cy.new_user( faker.name.fullName(), faker.internet.email(),password, "ADMIN");
  });
});
