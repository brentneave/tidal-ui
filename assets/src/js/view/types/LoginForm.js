const Action = require('../../events/Action'),
ViewActions = require('../ViewActions'),
ViewDispatcher = require('../ViewDispatcher'),
TidalCredentials = require('../../TidalCredentials');

const LoginForm = function()
{
    var submitLogin = function(e)
    {
        e.preventDefault();

        const
            parentNode = e.target,
            username = parentNode.querySelector('[name="username"]').value,
            password = parentNode.querySelector('[name="password"]').value;

        ViewDispatcher.broadcast
        (
            new Action
            (
                ViewActions.LOGIN,
                {
                    username: username,
                    password: password
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
    (this, 'render',
    {
        value: _render
    }
);
}

module.exports = new LoginForm();
