const inputMinimal = ({ props, actions }) => ({
    tagName: 'div',
    className: 'bb b--moon-gray',
    childNodes: {
        tagName: 'input',
        className: 'input-reset w-100 bn br0 pv3 f5 tc avenir near-black bg-transparent',
        classList: props.classList || [],
        attributes: props.attributes || {},
        on: props.on || {}
    }
})



module.exports = inputMinimal;
