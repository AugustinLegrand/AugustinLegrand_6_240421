import Photographer from "../controllers/Photographer.js";
import Medias from "../models/Medias.js";
import { dispatcher, dispatcherV2 } from "../render/Dispatcher.js";
import Views from "./Views.js";

export default class MediasViews extends Views {

    constructor([medias]) {
        super()

        this.medias = document.querySelector(medias)
        this.mediaModal = new Medias()
    }
    
    async initV2(data) {
        console.log(data);
        const totalLikes = Photographer.state.totalLikes
        document.querySelector(".info-photographer-likes").innerHTML = totalLikes

        this.modalContact(data)

        const likes = []

        const name = this.photographerName(data.photographer)
        for (let i = 0; i < data.medias.length; i++) {
            likes[data.medias[i].id] = data.medias[i].likes
            const article = document.createElement("article")
            const modalAction = document.createElement("a")
            const image = document.createElement("img")
            const video = document.createElement("video")
            const sectionInfo = document.createElement("div")
            const sectionLikePrice = document.createElement("div")
            sectionInfo.classList.add("media-info")
            const nameMedia = document.createElement("p")
            nameMedia.classList.add("media-info-name")
            sectionLikePrice.classList.add('media-info-pricelikes')
            const btnLikes = document.createElement("p")
            
            dispatcherV2(data.medias[i], function (type, file) {
                const file_media = `./../../resources/${name}/${file}`
                if (type == "image") {
                    image.classList.add("media")
                    image.classList.add(`media-${i+1}`)
                    image.classList.add(`medias-${data.medias[i].id}`)
                    image.src = file_media
                    image.alt = "File media"
                    /***
                     * <img src="" alt="" />
                     */
                    modalAction.appendChild(image)
                    article.appendChild(modalAction)
                    nameMedia.appendChild(document.createTextNode(file.replace("_", " ").replace(".jpg", "")))
                    sectionInfo.appendChild(nameMedia)
                }
                if (type == "video") {
                    video.classList.add("media")
                    video.classList.add(`media-${i+1}`)
                    video.classList.add(`medias-${data.medias[i].id}`)
                    video.src = file_media
                    video.type = "video/mp4"
                    video.setAttribute('autoplay', '')
                    modalAction.appendChild(video)
                    article.appendChild(modalAction)
                    nameMedia.appendChild(document.createTextNode(file.replace("_", " ").replace(".mp4", "")))
                    sectionInfo.appendChild(nameMedia)
                }
            })

            btnLikes.classList.add(`likes-${data.medias[i].id}`)
            btnLikes.classList.add(`likes-btn`)
            btnLikes.innerHTML = `${data.medias[i].likes}`

            btnLikes.addEventListener("click", function (event){
                const classLike = event.target.classList[0]
                const likeUser = classLike.split("-")[1]
                likes[likeUser] += 1
                Photographer.state.totalLikes += 1
                document.querySelector(".info-photographer-likes").innerHTML = Photographer.state.totalLikes
                event.target.innerHTML = `${likes[likeUser]}`
            })

            sectionLikePrice.appendChild(document.createTextNode(`${data.medias[i].price} €`))
            sectionLikePrice.appendChild(btnLikes)
            const icon = document.createElement("p")
            icon.innerHTML = `<i class="fas fa-heart" aria-label="likes"></i>`
            sectionLikePrice.appendChild(icon)

            sectionInfo.appendChild(sectionLikePrice)

            article.appendChild(sectionInfo)
            this.medias.appendChild(article)
        }
 
        
        /**
         * DIRNAME FILE MEDIA
         * 
         * -> GET PHOTOGRAPHE -> GET FIRST ARGUMENT + FILE NAME + EXTENSION
         * 
         * GET MEDIA
         * 
         * -> NAME : GET MEDIA FILE -> REMPLACE _ AT -
         * 
         * 
         */
    }

    photographerName(photographer) {

        const name = photographer?.name
        const nameFirst = name.split(" ")

        return nameFirst[0]
        
    }

    modalContact(data) {
        const btnContact = document.querySelector("#btnContact")

        btnContact.addEventListener("click", function (event) {
            event.preventDefault()

            document.querySelector('.modal-contact-header-title').innerHTML = `Contactez-moi ${data.photographer.name}`
            document.querySelector(".modal-contact").setAttribute("aria-hidden", "false")
        })

        const closeModal = document.querySelector(".modal-contact-header-close")

        closeModal.addEventListener("click", function (event) {
            event.preventDefault()

            document.querySelector(".modal-contact").setAttribute("aria-hidden", "true")
        })
    }

}