/// <reference types="cypress" />

describe('Author Tests', () => {

    beforeEach(() => {
        cy.visit('/')

        cy.fixture('users/author.json').then(authorData => {
            cy.login(authorData.authorUser, authorData.authorPassword)
        })
    })

    it.only('Verify author can create new article and post comment', () => {
        var uuid = require("uuid");
        var title = uuid.v4();
        var body = uuid.v4();

        cy.publishArticle(title, body)

        var comment = 'comment 123 test'

        cy.get('#comment').type(comment)

        cy.get('#submit').click()

        cy.contains(comment).should('be.visible')
    })
});