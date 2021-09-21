const imageFileInput = document.querySelector("#imageFileInput")

const canvas = document.querySelector("#meme")

const downPng = document.querySelector("#downpng")
const downJpg = document.querySelector("#downjpg")


// VARIABLE that updates everytime a user selects a new image
let image;

// EVENT HANDLER
imageFileInput.addEventListener("change", () => {
    const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

    // console.log(imageDataUrl)
    image = new Image();
    image.src = imageDataUrl

    image.addEventListener("load", () => {
        updateMemeCanvas(canvas, image)
    }, { once: true })
    // once: true > helps to check until its true
})

downPng.addEventListener('click', () => {
    // IF IE/EDGE Supports only PNG
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "prahladinala-png-converter.png");
        console.log("IE/EDGE")
    } else {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = canvas.toDataURL();
        a.download = "prahladinala-png-converter.png";
        a.click();
        document.body.removeChild(a);
    }
    console.log("Downloading PNG")

})

downJpg.addEventListener('click', () => {
    // IF IE/EDGE Supports only PNG
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(canvas.msToBlob(), "prahladinala-jpg-converter.png");
        console.log("IE/EDGE")
    } else {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = canvas.toDataURL("image/jpeg", 1);
        a.download = "prahladinala-jpg-converter.jpg";
        a.click();
        document.body.removeChild(a);
    }
    console.log("Downloading JPEG")

})

function updateMemeCanvas(canvas, image) {

    // WORKING WTH CANVAS
    const ctx = canvas.getContext("2d");
    const width = image.width;
    const height = image.height;

    // UPDATE CANVAS DIMENSIONS
    canvas.width = width;
    canvas.height = height;

    // UPDATE CANVAS BACKGROUND
    ctx.drawImage(image, 0, 0)

}