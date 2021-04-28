import { dispatcherV2 } from "../../render/Dispatcher.js";
import Views from "../Views.js";

export default class MediaModal extends Views {

    constructor() {
        super()
    }

    initV2 (response) {
        console.log(response);
        this.modalMedia(response.name, response.media, response.photographer)
    }

    modalMedia(name, data, photographer) {
        const modalMedia = document.querySelector(".modal-media")

        const namePhotographer = photographer.split(" ")[0]

        dispatcherV2(data, function (type, file) {
            if (type == "image") {
                document.querySelector(".modal-media-container-media").innerHTML = `<img src='./../../resources/${namePhotographer}/${file}'>`
            }
            if (type == "video") {

            }
        })

        document.querySelector(".modal-media-container-name").innerHTML = name
    }

}