
export default class Photographers {

    constructor() {
    }

    async index() {
        /*
        return await this.api.get("https://augustinlegrand.github.io/AugustinLegrand_6_240421/api/data.json")
            .then(data => {
                return data.photographers
            })
            */
        const data = fetch("./../data.json")
        .then(resp => resp.json())
            .then(data => {
                return data
            })
        
        return await data.then(pho => {
            console.log(pho);
            return pho.photographers
        })
    }

    async show(id) {

        return await this.index()
            .then(photographer => photographer.filter(p => p.id === id)[0])
    }

}