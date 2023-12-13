describe('search products', () => {
  it('should be able to search for products', () => {
    cy.searchByQuery('moletom')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=moletom')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('should be able to search for products and add it to the cart', () => {
    cy.searchByQuery('java')

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=java')

    cy.get('a[href^="/product"]').should('exist')
    cy.contains('Java').click({ multiple: true })
    cy.contains('Adicionar ao carrinho').click()

    cy.contains('Cart (1)').should('exist')
  })

  it('should not be able to search page without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
