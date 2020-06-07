/// <reference types="cypress" />

describe('Login Tests', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.loginAsAuthor()

    })
    
    
    it.only('Verify author can create new article and post comment', () => {       
        cy.get('#wp-admin-bar-new-content > [aria-haspopup="true"]').click()

        cy.get('.components-modal__header > .components-button').click()

        var uuid = require("uuid");

        var title = uuid.v4();
        var body = uuid.v4();

        cy.get('#post-title-0').type(title)

        cy.get('.block-editor-default-block-appender__content').click()

        cy.get('.rich-text').type(body)

        cy.get('.editor-post-publish-panel__toggle').click()

        cy.get('.editor-post-publish-panel__header-publish-button > .components-button').click()

        cy.contains(title + ' is now live.').should('be.visible')

        cy.get('.post-publish-panel__postpublish-buttons > a.components-button').click()

        cy.url().should('contain', title.toLowerCase().replace(/ /g,'-'))

        var comment = 'comment 123 test'

        cy.get('#comment').type(comment)

        cy.get('#submit').click()

        cy.contains(comment).should('be.visible')
    })
});