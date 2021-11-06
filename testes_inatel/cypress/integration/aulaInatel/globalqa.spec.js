/// <reference types="cypress"/>

describe('Cenário de teste: Testar as funcionalidade do site globalsqa.com', ()=>{

    it.skip('Cenário de teste: Registrar um usuário com sucesso',()=>{
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
        cy.get('.btn-link').click();
        cy.get('#firstName').type('qainatel');
        cy.get('#Text1').type('qainatel');
        cy.get('#username').type('qainatel');
        cy.get('#password').type('qainatel');
        cy.get('.btn-primary').click();
        
        cy.get('.ng-binding').should('contain.text', 'Registration successful');

    })

    it.skip('Cenário de teste: Registrar um usuário com sucesso', () => {
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register');
        
        cy.get('#firstName').type('qainatel');
        cy.get('#Text1').type('qainatel');
        cy.get('#username').type('qainatel');
        cy.get('#password').type('qainatel');
        cy.get('#password').clear();
        cy.get('.has-error > .help-block').should('have.text', 'Password is required');
        cy.get('.btn-primary').should('be.disabled');
    })

    it('Cenário de teste: Login com sucesso', () => {

        var userInfo = criarUsuario();
        cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
        cy.get('#username').type(userInfo[0]);
        cy.get('#password').type(userInfo[1]);
        cy.get('.btn-primary').click();
        cy.get('h1.ng-binding').should('contain.text', userInfo[0]);
        
    })
})

//FUNÇÕES
function criarUsuario(){
    let horas = new Date().getHours().toString();
    let minutos = new Date().getMinutes().toString();
    let segundos = new Date().getSeconds().toString();

    let userId = horas + minutos + segundos + "_userId";
    let userPass = horas + minutos + segundos + "_userPass";
    let userInfo = [userId, userPass];

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login');
    cy.get('.btn-link').click();
    cy.get('#firstName').type(userId);
    cy.get('#Text1').type(userId);
    cy.get('#username').type(userId);
    cy.get('#password').type(userPass);
    cy.get('.btn-primary').click();

    cy.get('.ng-binding').should('contain.text', 'Registration successful');
    return userInfo;
}