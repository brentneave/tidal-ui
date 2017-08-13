const
    inputMinimal = require('./inputMinimal'),
    buttonMinimal = require('./buttonMinimal');




const loginForm = function({ state, props, actions }) {


    const _submit = function(event) {

        event.preventDefault();

        console.log('_submit');

        const
            form = document.querySelector('.js-login-form'),
            usernameField = form.querySelector('[name="username"]'),
            passwordField = form.querySelector('[name="password"]'),
            submitButton = form.querySelector('[type="submit"]');

        usernameField.blur();
        passwordField.blur();
        submitButton.blur();

        usernameField.setAttribute('disabled', 'disabled');
        passwordField.setAttribute('disabled', 'disabled');
        submitButton.setAttribute('disabled', 'disabled');

        const
            username = usernameField.value,
            password = passwordField.value;

        actions.login({ username, password });

    }



    return {

        tagName: 'form',
        className: 'js-login-form dt min-vh-75 pv5 ph4 ph5-ns tc center w-100 mw6',
        attributes: { action: state.path.str, },
        on: { submit: _submit },
        childNodes: {
            tagName: 'div',
            className: 'dtc v-mid',
            childNodes: [{
                    tagName: 'img',
                    className: 'mb3',
                    attributes: {
                        src: '/assets/dist/svg/tidal-mark.svg',
                        width: 66,
                        height: 44
                    }
                },
                state.errors ? {
                    tagName: 'div',
                    className: 'mt4',
                    childNodes: state.errors.map(
                        (error) => ({
                            tagName: 'p',
                            textContent: error
                        })
                    )
                } : null, {
                    tagName: 'div',
                    className: 'mt4',
                    childNodes: inputMinimal({
                        props: {
                            attributes: {
                                type: 'email',
                                name: 'username',
                                placeholder: 'Email'
                            }
                        }
                    }),
                }, {
                    tagName: 'div',
                    className: 'mt4',
                    childNodes: inputMinimal({
                        props: {
                            attributes: {
                                type: 'password',
                                name: 'password',
                                placeholder: 'Password'
                            }
                        }
                    })
                }, {
                    tagName: 'div',
                    className: 'mt4',
                    childNodes: buttonMinimal({
                        props: {
                            label: 'Log In',
                            attributes: {
                                type: 'submit'
                            }
                        }
                    })
                },

            ]

        }

    }

}

module.exports = loginForm;
