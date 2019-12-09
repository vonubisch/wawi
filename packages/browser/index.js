function getBase64Image(imageURL) {
    const image = document.createElement("img");
    image.src = imageURL;
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

const browser = {
    getBase64Image
}

export default browser;