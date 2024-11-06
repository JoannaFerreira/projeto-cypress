import { faker } from "@faker-js/faker";

describe("Usuário devem visualizar a lista de cliente", () => {
  before(() => {
    cy.auth_bypass_api();
  });

  beforeEach(() => {
    cy.intercept("**/api/v1/customrs/all", { fixture: 'customers.json'});
  });

  it('através do form da aplicação com sucesso', () => {
    cy.list_customers();
  });
});

describe('Usuários devem realizar o cadastro de novos cliente', () => {
  before(() => {
    cy.auth_bypass_api();
  });

  it('atraves do form da aplicacao com sucesso', () => {
    cy.new_customer(
      faker.name.fullName(),
      faker.internet.email(),
      faker.company.name(),
      faker.string.numeric(6),
      faker.location.city(),
      faker.location.state(),
      faker.address.streetAddress(),
      faker.address.country(),
      faker.address.zipCode(),
      faker.phone.number()
    );
  });
});
