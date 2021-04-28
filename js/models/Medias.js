

export default class Medias {

    constructor() {
    }

    async index() {
        const data = fetch("api/data.json")
        .then(resp => resp.json())
            .then(data => {
                return data
            })
        
        return await data.then(pho => {
            return pho.media
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