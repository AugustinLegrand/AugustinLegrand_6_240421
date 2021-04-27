import Home from "./controllers/Home.js";
import Photographer from "./controllers/Photographer.js";
import Router from "./router/Router.js";


const router = new Router()

router
    .get("/", Home)
    .get("/index", Home)
    .get("/photographer", Photographer)
