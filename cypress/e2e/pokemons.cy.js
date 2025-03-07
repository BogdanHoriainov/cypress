import * as pokemons from "../locators/pokemons.json"

describe('покупка нового аватара для своего тренера', function () {

    beforeEach( function()  {
        cy.setCookie('session_id', 'token'); //логин и пароль умею вводить, хотелось попробовать что-то новое
      });

    it ('end2end', function (){
        cy.visit('https://pokemonbattle.ru/');
        cy.get(pokemons.account).click();
        cy.get(pokemons.shop).click();
        cy.wait(1000);
        cy.get(pokemons.avatars).first().click({ force: true }); //не понял как найти(
            cy.get(pokemons.card_number).type('4111 1111 1111 1111');
            cy.get(pokemons.date).type('10/25');
            cy.get(pokemons.cvv).type('125');
            cy.get(pokemons.card_name).type('bohdan');
            cy.wait(1000);
            cy.get(pokemons.pay).click();
            cy.get(pokemons.SMS).type('56456');
            cy.get(pokemons.btn_sms).click();
            cy.get(pokemons.payment_success).should("be.visible");
            cy.get(pokemons.payment__adv).click();
            cy.get(pokemons.my_avatar).should("be.visible"); //проверяем что наш аватар виден
    })
})