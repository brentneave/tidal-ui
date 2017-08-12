const buttonMinimal = ({ props, actions }) => ({
    tagName: 'button',
    textContent: props.label || '',
    className: 'input-reset pa3 f7 avenir ttu tracked fw6 bn blue bg-transparent',
    classList: props.classList || [],
    attributes: props.attributes || {},
    on: props.on || {}
})



module.exports = buttonMinimal;
