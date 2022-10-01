declare namespace Cypress {
  interface Chainable {
    visitAndExecuteCallback(
      url: string,
      callback: () => void
    ): Chainable<Element>;
  }
}
