"use strict";
var likes = document.querySelectorAll(".likebutton");
var likeCount = document.getElementById("counter");
var form = document.getElementById("orderform");
var canvwrap = document.getElementById("coverdrawer");
var canvas = document.getElementById("heartdraw");
var img = new Image(64, 64);
img.src = "images/heart.png";

var fflag = false;
var cflag = false;
var drawFlag = false;

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function toggleordform(){
    fflag = !fflag;
    if (fflag){
        form.style.display = "flex";
    }else{
        form.style.display = "none";
    }
};
function togglecanv(){
    cflag = !cflag;
    if (cflag){
        canvwrap.style.display = "flex";
    }else{
        canvwrap.style.display = "none";
        drawFlag = false;
    }
};

canvas.addEventListener("mousemove", function(event) {
    if(drawFlag){
        ctx.drawImage(img, (event.clientX - event.target.offsetLeft - img.width/4)*(event.target.width / event.target.clientWidth), (event.clientY - event.target.offsetTop - img.height/4)*(event.target.height / event.target.clientHeight), img.width, img.height);
    }
});
function love(){
    drawFlag = !drawFlag;
};
function clearLove(){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
for (let i = 0; i < likes.length; i++){
    likes[i].addEventListener('click', function(event) {
        let heart = likes[i].querySelector(".hearttoggle");
        if(heart.style.display === "none" || heart.style.display === ""){
            heart.style.display = "block";
            likeCount.innerText = Number(likeCount.innerText) + 1;
        }else{
            heart.style.display = "none";
            likeCount.innerText = Number(likeCount.innerText) - 1;
        }
    });
}

