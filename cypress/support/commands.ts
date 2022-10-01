Cypress.Commands.add(
  'visitAndExecuteCallback',
  (url: string, callback: () => void) => {
    cy.visit(url);
    callback();
  }
);
