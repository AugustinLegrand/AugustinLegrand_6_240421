import Views from "./Views.js";

export default class PhotographersViews extends Views {

    constructor([name, title]) {
        super()
        this.name = document.querySelector(name)
        this.article = document.createElement("article")
        this.lien_photographer = document.createElement("a")
        this.info = document.createElement("div")
        this.portrait = document.createElement("img")
        this.title_article = document.createElement("h2")
        this.localisation = document.createElement("p")
        this.tagline = document.createElement("p")
        this.price = document.createElement("p")
        this.tags = document.createElement("nav")
    }

    async initV2(data) {
        this.info.classList.add("photographer")
        this.lien_photographer.href = `./../../photographer.html?id=${data.id}`
        const name = data.name.replace(" ", "")
        this.lien_photographer.setAttribute("aria-label", name)
        this.portrait.src = `../../resources/Photographers/${name}.jpg`
        this.portrait.alt = data.name
        this.title_article.classList.add("photographer_title")
        this.title_article.appendChild(document.createTextNode(data.name))
        this.localisation.appendChild(document.createTextNode(data.city + ", " + data.country))
        this.localisation.classList.add("photographer_location")
        this.tagline.appendChild(document.createTextNode(data.tagline))
        this.tagline.classList.add("photographer_tagline")
        this.price.appendChild(document.createTextNode(`${data.price}€/jour`))
        this.price.classList.add("photographer_price")
        this.tags.classList.add("photographer_navigation")

        data.tags.map(tag => {
            const linkTags = document.createElement("span")
            linkTags.appendChild(document.createTextNode(`#${tag}`))
            this.tags.appendChild(linkTags)
        })



        this.render()

    }


    render() {

        this.lien_photographer.appendChild(this.portrait)
        this.lien_photographer.appendChild(this.title_article)
        this.article.appendChild(this.lien_photographer)
        this.info.appendChild(this.localisation)
        this.info.appendChild(this.tagline)        
        this.info.appendChild(this.price)
        this.info.appendChild(this.tags)
        this.article.appendChild(this.info)
        this.name.appendChild(this.article)
    }

}