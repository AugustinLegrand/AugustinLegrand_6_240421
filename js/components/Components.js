export default class Components {

    constructor() {}

    registerComponents(components) {
        components.map(component => {
            customElements.define(component.name, component.class)
        });
    }

}