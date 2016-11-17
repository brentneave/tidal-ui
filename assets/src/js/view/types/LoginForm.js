const Action = require('../../events/Action'),
ViewActions = require('../ViewActions'),
ViewDispatcher = require('../ViewDispatcher'),
TidalCredentials = require('../../TidalCredentials');

const LoginForm = function()
{
    var submitLogin = function(e)
    {
        const
        parentNode = e.target.parentNode,
        username = document.querySelector('[name="username"]').value,
        password = document.querySelector('[name="password"]').value;
        console.log('username = ' + username + ', password = ' + password);

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
    }

    const _render = function(o)
    {
        return {
            tag: 'div',
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
                    },
                    events:
                    {
                        click: submitLogin
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
