describe('Splash screen', () => {
  it('should show splash screen with login button', () => {
    cy.visit('/');

    cy.get('a[href*="/login"]').should('be.visible');
  });
});

describe('App', function () {
  // Before running all tests, we make sure our tests user does not exist on our DB
  before(function () {
    cy.task('cleanDB');
  });

  // We login before each test
  beforeEach(function () {
    cy.loginToAuth0(Cypress.env('CY_TEST_USERNAME'), Cypress.env('CY_TEST_PASSWORD'));
  });

  it('shows logged sidebar with contact create button and empty table', function () {
    cy.getCy('contact-create').should('be.visible');
    cy.getCy('contacts-table').should('be.visible');
    cy.getCy('contacts-empty').should('be.visible');
  });

  it('successfully creates a contact', function () {
    cy.createContact();

    cy.getCy('contacts-empty').should('not.exist');
    cy.getCy('contacts-table').should('be.visible').contains('td', 'John');
  });

  it('shows contact page', function () {
    cy.createContact();
    cy.getCy('contact-row').first().click();

    cy.location('pathname').should('match', /\/contact\/([0-9]+)$/);
  });
});
