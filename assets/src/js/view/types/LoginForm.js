const LoginForm = function()
{
    const _render = function(o) {
        return {
            tag: 'form',
            attributes: {
                method: 'post'
            },
            children: [{
                tag: 'p',
                text: o.title
            },{
                tag: 'input',
                attributes: {
                    type: 'email',
                    name: 'username',
                    placeholder: 'Email'
                }
            },{
                tag: 'input',
                attributes: {
                    type: 'password',
                    name: 'password',
                    placeholder: 'Password'
                }
            },{
                tag: 'button',
                text: 'Log in',
                attributes: {
                    type: 'submit'
                }
            }
          ]
        }
    };

    Object.defineProperty(this, 'render', {
        value: _render
    });
}

module.exports = new LoginForm();
