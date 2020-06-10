/// <reference types="cypress" />

describe('Login Tests', () => {

    it('Verify login page loads', () => {
        cy.request(Cypress.env('loginurl')).as('loginpage')

        cy.get('@loginpage').should('have.property', 'status', 200)

        cy.get('@loginpage').its('body').should('include', '<title>Log In &lsaquo; cypress-poc &#8212; WordPress</title>')
    })

    it('Verify admin can login', () => {
        cy.visit(Cypress.env('loginurl'))

        cy.wait(200)

        cy.fixture('users/admin.json').then(adminData => {
            cy.get('#user_login').type(adminData.adminUser)
            cy.get('#user_pass').type(adminData.adminPassword)
        })

        cy.get('#wp-submit').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/wp-admin')
        })

        cy.get('#menu-users').should('exist')
    })

    it('Verify author can login', () => {
        cy.visit(Cypress.env('loginurl'))

        cy.wait(200)

        cy.fixture('users/author.json').then(authorData => {
            cy.get('#user_login').type(authorData.authorUser)
            cy.get('#user_pass').type(authorData.authorPassword)
        })

        cy.get('#wp-submit').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/wp-admin')
        })

        cy.contains('Howdy, Cypress Author').should('exist')
    })

    it('Verify username is required', () => {
        cy.visit(Cypress.env('loginurl'))

        cy.wait(200)

        cy.get('#user_pass').type('randomdata')

        cy.get('#wp-submit').click()

        cy.get('#login_error').should('contain.text', 'The username field is empty')
    })

    it('Verify password is required', () => {
        cy.visit(Cypress.env('loginurl'))

        cy.wait(200)

        cy.get('#user_login').type('randomdata')

        cy.get('#wp-submit').click()

        cy.get('#login_error').should('contain.text', 'The password field is empty')
    })
});