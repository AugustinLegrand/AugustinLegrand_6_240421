import Photographers from "../models/Photographers.js";
import Render from "../render/Render.js";
import PhotographersViews from "../views/PhotographersViews.js";

export default class Home extends Render {

    constructor() {
        super()

        this.photographers = new Photographers()
        this.tags = document.querySelectorAll(".tag")
        this.dataPhotographers = []



    }

    async init() {

        const filterPhotos = this.filterPhotographers
        const render = this.renderV2

        this.tags.forEach(tag => {
            tag.addEventListener("click", function (event) {
                event.preventDefault()
                const filter = event.target.outerText.replace("#", "").toLowerCase()
                filterPhotos(filter, render)
            })
        })
        this.photographers.index()
            .then(data => {
                data.map(photographers => {
                    this.renderV2([".photographers", ".title-photographers"], PhotographersViews, photographers)
                })
        })
    }

    async filterPhotographers(filter, render) {
        const photographersElement = document.querySelector(".photographers")
        const photographers = new Photographers()
        while (photographersElement.firstChild) {
            photographersElement.removeChild(photographersElement.firstChild)
        }

        photographers.index()
            .then(data => {
                data.map(photographers => {

                    photographers.tags.map(tag => {
                        if (tag === filter) {
                            render([".photographers", ".title-photographers"], PhotographersViews, photographers)
                        }
                    })
                })
        })

    }

}