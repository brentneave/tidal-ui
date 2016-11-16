const Action = require('../../events/Action'),
      ViewActions = require('../ViewActions'),
      ViewDispatcher = require('../ViewDispatcher'),
      TidalCredentials = require('../../TidalCredentials');

const LoginForm = function()
{
    var testFunction = function()
    {
        console.log('Hi there!');
        ViewDispatcher.broadcast
        (
            new Action
            (
                ViewActions.LOGIN,
                {
                    username: TidalCredentials.username,
                    password: TidalCredentials.password
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
                },{
                    tag: 'input',
                    attributes:
                    {
                        type: 'email',
                        name: 'username',
                        placeholder: 'Email'
                    }
                },{
                    tag: 'input',
                    attributes:
                    {
                        type: 'password',
                        name: 'password',
                        placeholder: 'Password'
                    }
                },{
                    tag: 'button',
                    text: 'Log in',
                    attributes:
                    {
                        type: 'submit'
                    },
                    events: {
                        click: testFunction
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
