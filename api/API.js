export default class API {

    get (url) {
        return fetch(url)
            .then(resp => resp.json())
            .then(data => { return data })
    }

}