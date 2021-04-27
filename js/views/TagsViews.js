import Views from "./Views.js";

export default class TagsViews extends Views {

    constructor([tags]) {
        super()
        this.tags = document.querySelector(tags)
    }

    async initV2(data) {

        
        /*
        const linkTags = document.createElement("a")
        linkTags.appendChild(document.createTextNode(`#${tags}`))
        this.tags.appendChild(linkTags)
        */
    }

}