// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (user, password) => {
    cy.getCookies().then(cookies => {
        let hasMatch = false;
        cookies.forEach((cookie) => {
            if (cookie.name.substr(0, 20) === 'wordpress_logged_in_') {
                hasMatch = true;
            }
        });

        if (!hasMatch) {
            cy.visit('/wp-login.php').wait(1000);

            cy.get('#user_login').type(user)
            cy.get('#user_pass').type(password)

            cy.get('#wp-submit').click()

            cy.visit('/')
        }
    })
});

Cypress.Commands.add('publishArticle', (title, body) => {
    cy.get('#wp-admin-bar-new-content > [aria-haspopup="true"]').click()

    cy.get('.components-modal__header > .components-button').click()

    cy.get('#post-title-0').type(title)

    cy.get('.block-editor-default-block-appender__content').click()

    cy.get('.rich-text').type(body)

    cy.get('.editor-post-publish-panel__toggle').click()

    cy.get('.editor-post-publish-panel__header-publish-button > .components-button').click()

    cy.contains(title + ' is now live.').should('be.visible')

    cy.get('.post-publish-panel__postpublish-buttons > a.components-button').click()

    cy.url().should('contain', title.toLowerCase().replace(/ /g, '-'))
});