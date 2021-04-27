export default class Router {

    get(path, page) {

        if (window.location.pathname.split(".html")[0] == path) {
            console.log(window.location.pathname);
            new page()
                .init()
        }
        

        return this
    }

}