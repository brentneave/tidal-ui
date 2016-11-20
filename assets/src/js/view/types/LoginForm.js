const Action = require('../../events/Action'),
ViewActions = require('../ViewActions'),
ViewDispatcher = require('../ViewDispatcher');

const LoginForm = function()
{
    var submitLogin = function(e)
    {
        e.preventDefault();

        const
            parentNode = e.target,
            username = parentNode.querySelector('[name="username"]'),
            password = parentNode.querySelector('[name="password"]'),
            submit = parentNode.querySelector('[type="submit"]');

        username.blur();
        password.blur();
        submit.blur();
        username.setAttribute("disabled", "disabled");
        password.setAttribute("disabled", "disabled");
        submit.setAttribute("disabled", "disabled");

        ViewDispatcher.broadcast
        (
            new Action
            (
                ViewActions.LOGIN,
                {
                    username: username.value,
                    password: password.value
                }
            )
        );

        return false;
    }

    const _render = function(o)
    {
        return {
            tag: 'form',
            events:
            {
                submit: submitLogin
            },
            children:
            [
                {
                    tag: 'p',
                    text: o.title
                },
                {
                    tag: 'input',
                    attributes:
                    {
                        type: 'email',
                        name: 'username',
                        placeholder: 'Email'
                    }
                },
                {
                    tag: 'input',
                    attributes:
                    {
                        type: 'password',
                        name: 'password',
                        placeholder: 'Password'
                    }
                },
                {
                    tag: 'button',
                    text: 'Log in',
                    attributes:
                    {
                        type: 'submit'
                    }
                }
            ]
        }
    };

    Object.defineProperty
    (
        this, 'render',
        {
            value: _render
        }
    );
}

module.exports = new LoginForm();
