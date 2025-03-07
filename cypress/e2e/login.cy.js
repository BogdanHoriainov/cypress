import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_page_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Запускается перед началом каждого автотеста', function () {
        cy.visit('/') //использую DRY 
        cy.get(main_page.form).should('be.visible'); //проверяю что форма видна
        cy.get(main_page.title).should('be.visible'); // Проверяю, что заголовок внутри "form" виден
        cy.get(main_page.fogot_pass_btn).should('be.visible'); //проверяю что кнопка "Забыли пароль?" видна
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
        cy.get(main_page.footer).should('have.attr', 'href', 'https://qa.studio/'); //проверяю что у футера есть ссылка 
        cy.get(main_page.footer).should('be.visible');
});

    afterEach('Запускается перед концом каждого автотеста', function () {
        cy.get(result_page.title).should('be.visible'); // Проверяю, что текст "Авторизация прошла успешно" виден
        cy.get(result_page.footer).should('have.attr', 'href', 'https://qa.studio/'); //проверяю что у футера есть ссылка 
        cy.get(result_page.footer).should('be.visible');
        cy.get(result_page.close).should('be.visible'); //проверяю что кнопка "закрыть" видна
    });

    it('Правильный логин и пароль', function () {
       cy.get(main_page.email).type(data.email);
       cy.get(main_page.password).type(data.password);
       cy.get(main_page.login_button).click();
       cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю что вижу текст
       })

       it('Верный логин и не верный пароль', function () {
        cy.get(main_page.email).type(data.email);
        cy.get(main_page.password).type('iLoveqastudi00000');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю что вижу текст
        })

        it('проверка логики восстановления пароля', function () {
            cy.get(main_page.fogot_pass_btn).click();
            cy.get(recovery_page_page.title).should('be.visible');
            cy.get(recovery_page_page.form).should('be.visible');
            cy.get(recovery_page_page.footer).should('have.attr', 'href', 'https://qa.studio/'); //проверяю что у футера есть ссылка 
            cy.get(recovery_page_page.footer).should('be.visible');
            cy.get(recovery_page_page.email).type(data.email);
            cy.get(recovery_page_page.send_button).click();
            cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); //проверяю что вижу текст
            })

        it('Неверный логин и  верный пароль', function () {
                cy.get(main_page.email).type('gfgfg@gmail.com');
                cy.get(main_page.password).type(data.password);
                cy.get(main_page.login_button).click();
                cy.get(result_page.title).contains('Такого логина или пароля нет'); //проверяю что вижу текст
                })
        it('Логин без @ и  верный пароль', function () {
                cy.get(main_page.email).type('gfgfggmail.com');
                cy.get(main_page.password).type(data.password);
                cy.get(main_page.login_button).click();
                cy.get(result_page.title).contains('Нужно исправить проблему валидации'); //проверяю что вижу текст
                })    
        it('Проверка на приведение к строчным буквам в логине и  верный пароль', function () {
            cy.get(main_page.email).type('GerMan@Dolnikov.ru');
            cy.get(main_page.password).type(data.password);
            cy.get(main_page.login_button).click();
            cy.get(result_page.title).contains('Авторизация прошла успешно'); //проверяю что вижу текст
            })      
})