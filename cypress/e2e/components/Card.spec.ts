/// <reference types="Cypress" />

describe('Card', () => {
  beforeEach(() => {
    cy.visit('/explore');
  });

  it('Debería existir un enlace al libro', () => {
    cy.get('.css-fqdpvh').find('a').url();
  });

  it('Debería mostrar la imagen del libro', () => {
    cy.get(
      'img[src="https://res.cloudinary.com/xbu/image/upload/v1685977696/xbu/nbopgyt65fh6tqglt3gm.webp"]',
    )
      .should('be.visible')
      .and(($img) => expect($img[0].naturalWidth).to.be.gt(0));
  });

  it('Debería mostrar titulo', () => {
    cy.get('div').find('.css-gdx2i7');
    cy.get('.css-zvbxin').should('contain', 'El visitante');
    // cy.get('.css-fjw6jp').should('contain', 'Stephen King');
    // cy.get('div').find('.css-fjw6jp');
  });

  // it('Debería mostrar el autor', () => {
  //   cy.get('div.css-fjw6jp').should('contain', 'Stephen King');
  // });
});
