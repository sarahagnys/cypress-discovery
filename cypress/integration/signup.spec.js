import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {
    // beforeEach(function() {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })

    // })   

    // before(function(){
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')

    // })

    // beforeEach(function(){
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')

    // })

    // after(function(){
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')

    // })

    // afterEach(function(){
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')

    // })

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fill_form(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Invalid document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '000000141aa'

        signup.go()
        signup.fill_form(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'sarah.com.br'

        signup.go()
        signup.fill_form(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            signup.go()
            signup.submit()
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signup.alertMessageShouldBe(msg.output)
            })
        })
    })
})