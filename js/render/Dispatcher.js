export function dispatcher(media) {
    (dispatcher.state[media])()
}

dispatcher.state = {

    image: () => {

    },

    video: () => {

    },

    unkown: () => {
        console.log("Unkown dispatcher");
    }

}

export function dispatcherV2(media, callback) {
    if (media?.image) {
        const type = "image"
        callback(type, media?.image)
    }

    if (media?.video) {
        const type = "video"
        callback(type, media?.video)
    }

}