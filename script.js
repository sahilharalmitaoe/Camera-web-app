let videoPlayer = document.getElementById("preview")
let canvas = document.getElementById("photoCanvas")
let filterString = ""

async function getCameraOutput () {
    if(!"mediaDevices" && !'getUserMedia' in navigator.mediaDevices){
        alert("No Camera API Found")
        return
    }


let videoStream = await navigator.mediaDevices.getUserMedia({video:true})
videoPlayer.srcObject = videoStream
videoPlayer.play()

}

function takePhoto () {
    canvas.height = videoPlayer.videoHeight
    canvas.width = videoPlayer.videoWidth

    if (filterString != ""){
        canvas.getContext("2d").filter = filterString
    }

    canvas.getContext("2d").drawImage(videoPlayer,0,0)
}

function savePhoto () {
    let linkElement = document.createElement("a")
    let dataUrl = canvas.toDataURL("image/png")
    linkElement.href = dataUrl
    linkElement.download = "photo.png"
    linkElement.click()

    
}

function applyFilter () {
    let filter = document.getElementById("filterSelect");
    switch (filter.value) {
        case "blur":
            filterString = "blur(5px)";
            break;
        case "grayscale":
            filterString = "grayscale(100%)";
            break;
        
        case "contrast":
            filterString = "contrast(200%)";
            break;
        default:
            filterString = "";
            break;
    }
}



getCameraOutput ()