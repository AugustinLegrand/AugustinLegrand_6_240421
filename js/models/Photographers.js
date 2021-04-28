
import API from './../../api/API.js';

export default class Photographers {

    constructor() {
        this.api = new API()
    }

    async index() {
        return await this.api.get("https://augustinlegrand.github.io/AugustinLegrand_6_240421/api/data.json")
            .then(data => {
                return data.photographers
            })
    }

    async show(id) {

        return await this.index()
            .then(photographer => photographer.filter(p => p.id === id)[0])
    }

}