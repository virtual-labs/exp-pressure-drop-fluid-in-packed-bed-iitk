
const photo = document.getElementById("photo");
const video = document.getElementById("video");
const showVideoButton = document.getElementById("showVideoButton");

showVideoButton.addEventListener("click", function () {
   
    photo.style.display = "none";
 
    video.style.display = "block";

    video.play();
});