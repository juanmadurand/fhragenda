export function loginViaAuth0Ui(username, password) {
  cy.visit('/');

  cy.get('a[href*="/login"]').click();

  cy.origin(
    Cypress.env('AUTH0_ISSUER_BASE_URL'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input#username').type(username);
      cy.get('input#password').type(password, { log: false });
      cy.contains('button[value=default]', 'Continue').click();
    }
  );

  cy.url().should('equal', 'http://localhost:3000/');
}
