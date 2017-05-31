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
        className: 'js-login-form',
        attributes: { action: state.path.str, },
        on: { submit: _submit },
        childNodes: [{

                tagName: 'p',
                className: state.errors ? 'is-error' : '',
                textContent: state.errors ? state.errors : 'Log in to Tidal'

            }, {

                tagName: 'input',
                attributes: {
                    type: 'email',
                    name: 'username',
                    placeholder: 'Email'
                }

            }, {

                tagName: 'input',
                attributes: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                }

            }, {

                tagName: 'button',
                textContent: 'Log in',
                attributes: {
                    type: 'submit'
                }

            }

        ]

    }

}

module.exports = loginForm;