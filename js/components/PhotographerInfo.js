
export default class PhotographerInfo extends HTMLElement {

    constructor() {
        super()

        this.innerHTML = `
        <section class="photographer-info">
            <div>
                <h1 class="photographer-name">${this.getAttribute("name")}</h1>
                <p class="photographer-location">${this.getAttribute("location")}</p>
                <p class="photographer-tagline">${this.getAttribute("tagline")}</p>
                <nav class="photographer-tags">
                    <span>#Portrait</span>
                    <span>#Art</span>
                    <span>#Fashion</span>
                    <span>#Architecture</span>
                </nav>
            </div>
            <button id="btnContact">Contactez-moi</button>
        </section>
        `
    }
}