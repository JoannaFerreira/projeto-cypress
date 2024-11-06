// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//biblioteca dos comandos principais

import * as urls from './urls.js';
import login from '../selectors/login.sel.cy.js';
import users from '../selectors/users.sel.cy.js';
import customers from '../selectors/customers.sel.cy.js';

require('cypress-xpath');

Cypress.Commands.add('login', (username, password) => {
  cy.visit(urls.login);
  cy.get(login.username).type(username);
  cy.get(login.password).type(password);
  cy.get(login.loginButton).click();
  cy.wait('@authRequest').then(({response}) =>{
      expect(response.statusCode).to.eq(200)
      expect(response.body.token).to.exist
 }) 
 
   cy.contains('h1', 'Dashboard');
});

Cypress.Commands.add('new_user', (name, username, password, roles) => {
 
  SetAuthCookies()
  cy.visit(urls.users,{ onBeForeLoad(win) {setAuthSessionStorage(win)}});

  cy.get(users.name).click({force: true}).type(name)
  cy.get(users.username).type(username)
  cy.get(users.password).type(password)
  cy.get(users.passwordConfirmation).type(password)
  cy.get(users.roles).type(roles)
  cy.get(users.submit).click()

  // cy.get(users.panel_success).should('be.visible')
  cy.get('#alert-success').invoke('show').should('be.visible');
});

function SetAuthCookies() {
  cy.setCookie("user.id", String(Cypress.env("auth.user.id")))
  cy.setCookie("token", Cypress.env("auth.token").replace(" ", "%20"))
  cy.request(urls.auth)
}

function setAuthSessionStorage(win) {
  win.sessionStorage.setItem("user.id", Cypress.env("auth.user.id"))
  win.sessionStorage.setItem("token", Cypress.env("auth.token"))
}

Cypress.Commands.add('new_customer',(name, email, company, salary, city, state, address, country, zipCode, phoneNumber) => {
   
  SetAuthCookies()
   cy.visit(urls.customers, { onBeforeLoad(win) { setAuthSessionStorage(win)}})
   cy.xpath(customers["form-edit"].name).click({ force: true }).type(name)
   cy.xpath(customers["form-edit"].email).click({ force: true }).type(email)
   cy.xpath(customers["form-edit"].company).click({ force: true }).type(company)
   cy.xpath(customers["form-edit"].salary).click({ force: true }).type(salary)
   cy.xpath(customers["form-edit"].city).click({ force: true }).type(city)
   cy.xpath(customers["form-edit"].state).click({ force: true }).type(state)
   cy.xpath(customers["form-edit"].address).click({ force: true }).type(address)
   cy.xpath(customers["form-edit"].country).select(country)
   cy.xpath(customers["form-edit"].zipCode).click({ force: true }).type(zipCode)
   cy.xpath(customers["form-edit"].phoneNumber).click({ force: true }).type(phoneNumber)
   cy.xpath(customers["form-edit"].submit).click({ force: true })
   
   cy.xpath(customers["form-edit"].panel_success).should('be.visible')

  }
)

Cypress.Commands.add('list_customers', () => {
  SetAuthCookies()
  cy.visit(urls.customers_list, { onBeForeLoad(win) {setAuthSessionStorage(win)}})
  cy.xpath(customers["form-list"].panel_success)
})
