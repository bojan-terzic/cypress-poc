/// <reference types="cypress" />

describe('Admin Tests', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it.only('Verify admin can unpublish article by moving it to trash ', () => {
        var uuid = require("uuid");
        var title = uuid.v4();
        var body = uuid.v4();

        cy.fixture('users/author.json').then(authorData => {
            cy.login(authorData.authorUser, authorData.authorPassword)
        })

        cy.publishArticle(title, body)

        cy.clearCookies()

        cy.fixture('users/admin.json').then(adminData => {
            cy.login(adminData.adminUser, adminData.adminPassword)
        })

        cy.get('.icon-magnifier').click()

        cy.get('.search_form > input')
            .type(title)
            .type('{enter}')

        cy.get('.lead > p').should('contain.text', 'Results for: ' + title)

        cy.get('.pg-item').should('be.visible').and('contain.text', title)

        cy.get('.entry-title > a').click()

        cy.get('#wp-admin-bar-edit > .ab-item').click()

        cy.get('.components-modal__content')
            .should('be.visible')
            .type('{esc}')

        var lnkMoveToTrash = 'Move to Trash'
        cy.contains(lnkMoveToTrash).click()

        var txtMovedToTrash = '1 post moved to the Trash.'
        cy.get('#message > p').should('contain.text', txtMovedToTrash)

        cy.visit('/')

        cy.get('.icon-magnifier').click()

        cy.get('.search_form > input')
            .type(title)
            .type('{enter}')

        cy.get('.pg-item').should('not.be.visible')
    })
});