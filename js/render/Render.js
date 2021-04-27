import Views from "../views/Views.js";

export default class Render {

    async render(tagName, views, ...args) {
        if (views.prototype instanceof Views) {
            new views(tagName)
                .init(...args)
        }

    }

    /**
     * Version 1.0.1 FUNCTION RENDER
     * 
     * @param {*} param0 
     * @param {*} views 
     * @param  {...any} args 
     */
    renderV2([...query], views, ...args) {
        if (views.prototype instanceof Views) {
            new views([...query])
                .initV2(...args)
        }
    }

    test() {
        return "test"
    }

}