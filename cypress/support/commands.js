const { loginViaAuth0Ui } = require('./auth');

Cypress.Commands.add('getCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('createContact', () => {
  cy.getCy('contact-create').click();
  cy.getCy('contact-form').should('be.visible');
  cy.getCy('input_first_name').should('be.visible').type('John');
  cy.getCy('input_last_name').should('be.visible').type('Connor');
  cy.getCy('input_email')
    .should('be.visible')
    .type(`john.connor_${new Date().getTime()}@test.com`);
  cy.getCy('input_phone').should('be.visible').type('+34123456789');
  cy.getCy('form_submit').click();
});

Cypress.Commands.add('loginToAuth0', (username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  loginViaAuth0Ui(username, password);

  log.snapshot('after');
  log.end();
});
