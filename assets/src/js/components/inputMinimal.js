const inputMinimal = ({ props, actions }) => ({
    tagName: 'div',
    className: 'bb b--white-20',
    childNodes: {
        tagName: 'input',
        className: 'input-reset w-100 bn br0 pv2 f5 tc avenir white bg-transparent',
        classList: props.classList || [],
        attributes: props.attributes || {},
        on: props.on || {}
    }
})



module.exports = inputMinimal;
