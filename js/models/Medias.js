
import API from './../../api/API.js';

export default class Medias {

    constructor() {
        this.api = new API()
    }

    async index() {
        return await this.api.get("./../../api/data.json")
            .then(data => {
                return data.media
            })
    }

    async getMedia(id) {
        return await this.index()
            .then(media => media.filter(m => m.id === id)[0])
    }

    async getMediasPhotographer(id) {
        return await this.index()
            .then(media => media.filter(m => m.photographerId === id))
    }

}