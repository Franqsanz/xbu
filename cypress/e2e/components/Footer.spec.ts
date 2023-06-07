describe('Footer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1010/');
  });

  it('Debería mostrar en el pie de pagina "Hecho con ❤ por Franqsanz" y el enlace Política de Privacidad', () => {
    cy.get('footer').should('contain.text', 'Hecho con ❤ por Franqsanz');
    cy.get('a').contains('Política de Privacidad').click();
    cy.url().should('include', '/privacy-policies');
  });
});
