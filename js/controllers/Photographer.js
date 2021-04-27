import Medias from "../models/Medias.js";
import Photographers from "../models/Photographers.js";
import { dispatcherV2 } from "../render/Dispatcher.js";
import Render from '../render/Render.js';
import MediasViews from "../views/MediasViews.js";
import MediaModal from "../views/modal/MediaModal.js";
import PhotographersViews from '../views/PhotographersViews.js';
import { dispatcher } from './../render/Dispatcher.js';

export default class Photographer extends Render {

    constructor() {
        super()

        this.medias = new Medias()
        this.id = new URLSearchParams(window.location.search).get("id")
        Photographer.state.idParams = this.id
        this.photographe = new Photographers().show(parseInt(this.id))
        this.selectMedias = document.querySelector("#selectMedias")
        this.response = []
        this.likes = []
    }

    init() {
        this.photographerInfo()
        this.modalMediaButton()

        const mediasState = {
            date: () => {
                this.photographe
                    .then(data => {
                        this.response["photographer"] = data
                    })

                this.medias.getMediasPhotographer(parseInt(this.id))
                    .then(data => {

                        data.sort(function (a, b) {
                            return new Date(b.date) - new Date(a.date)
                        })

                        data.map(media => {
                            this.likes[media.id] = media.likes
                        })
                        this.response["medias"] = data
                        this.response["medias_like"] = this.likes
                        this.renderV2([".medias"], MediasViews, this.response)
                    })

            },

            popularity: () => {
                this.photographe
                    .then(data => {
                        this.response["photographer"] = data
                    })

                this.medias.getMediasPhotographer(parseInt(this.id))
                    .then(data => {

                        data.sort(function (a, b) {
                            return b.likes - a.likes
                        })

                        data.map(media => {
                            this.likes[media.id] = media.likes
                        })
                        this.response["medias"] = data
                        this.response["medias_like"] = this.likes
                        this.renderV2([".medias"], MediasViews, this.response)
                    })
            },

            title: () => {
                this.photographe
                    .then(data => {
                        this.response["photographer"] = data
                    })

                this.medias.getMediasPhotographer(parseInt(this.id))
                    .then(data => {

                        data.sort(function (a, b) {

                            const aTitle = a.image || a.video
                            const bTitle = b.image || b.video;
                            return aTitle.localeCompare(bTitle)
                        })

                        console.log(data);

                        data.map(media => {
                            this.likes[media.id] = media.likes
                        })
                        this.response["medias"] = data
                        this.response["medias_like"] = this.likes
                        this.renderV2([".medias"], MediasViews, this.response)
                    })
            }

        }

        this.selectsMedias(this.closeAllSelect, (e) => {
            console.log(e);
            const usersElement = document.querySelector(".medias")
            while (usersElement.firstChild) {
                usersElement.removeChild(usersElement.firstChild)
            }
    
            (mediasState[e])()
        })

        this.selectMedias.addEventListener("change", function (event) {

        })

        this.photographe
            .then(data => {
                this.response["photographer"] = data
            })

        this.medias.getMediasPhotographer(parseInt(this.id))
            .then(data => {
                data.map(media => {
                    this.likes[media.id] = media.likes
                    Photographer.state.totalLikes += media.likes
                })
                this.response["medias"] = data
                this.response["medias_like"] = this.likes
                this.renderV2([".medias"], MediasViews, this.response)
                this.mediaAction(this.showModalPost, this.medias, this.renderV2)
            })

    }

    selectsMedias(closeAllSelect, callback) {
        const customSelect = document.getElementsByClassName("custom-select")
        for (let i = 0; i < customSelect.length; i++) {
            var elementSelect = customSelect[i].getElementsByTagName("select")[0]

            const el = document.createElement("div")
            el.classList.add("select-selected")
            el.classList.add("select-selected-bottom-rounded")
            el.innerHTML = elementSelect.options[elementSelect.selectedIndex].innerHTML
            customSelect[i].appendChild(el)

            const oel = document.createElement("div")
            oel.classList.add("select-items")
            oel.classList.add("select-hide")

            for (let j = 0; j < elementSelect.length; j++) {
                
                const option = document.createElement("div")
                option.innerHTML = elementSelect.options[j].innerHTML
                option.value = elementSelect.options[j].value

                option.addEventListener("click", function (e) {
                    const s = this.parentNode.parentNode.getElementsByTagName("select")[0]
                    const h = this.parentNode.previousSibling

                    for (let i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i
                            h.innerHTML = this.innerHTML
                            callback(this.value)
                            const y = this.parentNode.getElementsByClassName("same-as-selected")
                            for (let k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class")
                            }
                            this.classList.add("same-as-selected")
                            break
                        }
                    }
                    h.click()

                })

                oel.appendChild(option)
                
            }

            customSelect[i].appendChild(oel)
            el.addEventListener("click", function(e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
                this.classList.toggle("select-selected-bottom-square");
            });
        }
    }

    closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove("select-arrow-active");
            y[i].classList.remove("select-selected-bottom-square");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }

    modalMediaButton() {
        const slideMedia = this.slideMedia
        const showModalPost = this.showModalPost
        const medias = this.medias
        const renderV2 = this.renderV2

        document.querySelector(".modal-media-prev")
            .addEventListener("click", function (event) {
                event.preventDefault()
                const n = Photographer.state.showArticles = Photographer.state.showArticles - 1
                console.log("CLICK PREV: ", n);
                slideMedia(n, showModalPost, medias, renderV2)
        })
        document.querySelector(".modal-media-next")
            .addEventListener("click", function (event) {
                event.preventDefault()
                const n = Photographer.state.showArticles = Photographer.state.showArticles + 1
                console.log("CLICK NEXT: ", n);
                slideMedia(n, showModalPost, medias, renderV2)
        })
        document.querySelector(".modal-media-close")
            .addEventListener("click", function (event) {
                event.preventDefault()

                document.querySelector(".modal-media").setAttribute("aria-hidden", true)
            })
    }

    mediaAction(showModalPost, medias, renderV2) {
        const mediaAction = document.querySelectorAll(".media")
        const slideMedia = this.slideMedia
        mediaAction.forEach(media => {
            media.addEventListener("click", function (event) {
                event.preventDefault() 
                const idPosition = event.target.classList[1].split("-")[1]
                Photographer.state.showArticles = parseInt(idPosition)
                console.log("CLICK MEDIA: ", Photographer.state.showArticles);
                slideMedia(Photographer.state.showArticles, showModalPost, medias, renderV2)
            })
        })
    }
    
    slideMedia(n, showModalPost, medias, renderV2) {
        const article = document.querySelectorAll("article")
        if (n > article.length) { Photographer.state.showArticles = 1 }
        if (n < 1) { Photographer.state.showArticles = article.length }
        showModalPost(Photographer.state.showArticles, medias, renderV2)
    }

    showModalPost(articleShow, mediaModal, render) {
        const modalMedia = document.querySelector(".modal-media")
        const articleElement = document.querySelector(`.media-${articleShow}`)
        const idMedia = parseInt(articleElement.classList[2].split("-")[1])
        let response = []
        console.log(`ÌD MEDIA: `, idMedia);
        new Photographers().show(parseInt(new URLSearchParams(window.location.search).get("id")))
            .then(data => {
                response["photographer"] = data.name
            })
        mediaModal.getMedia(idMedia).then(data => {
            response["media"] = data
            dispatcherV2(data, function (type, file) {
                response["name"] = file.replace("_", " ").replace(".mp4", "").replace(".jpg", "")
            })
        

            modalMedia.setAttribute("aria-hidden", "false")
            render([".modal-media-container"], MediaModal, response)

        })
    }
    

    photographerInfo() {
        this.photographe.then(data => {
            document.querySelector(".photographer-name").innerHTML = data.name
            document.querySelector(".photographer-location").innerHTML = `${data.city}, ${data.country}`
            document.querySelector(".photographer-tagline").innerHTML = data.tagline
            const name = data.name.replace(" ", "")
            document.querySelector(".photographer-portrait").src = `../../resources/Photographers/${name}.jpg`
            document.querySelector(".info-photographer-price").innerHTML = `${data.price}€ / jour`
        })
    }

}


Photographer.state = {
    showArticles: 1,
    medias: new Medias(),
    renderV2: new Render().renderV2,
    totalLikes: 0,
    photographe: () => {
        
    }
}