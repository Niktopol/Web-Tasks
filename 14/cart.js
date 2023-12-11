"use strict"
// let names = ["Стул Everest","Лампа Ярило","Кресло Orange-J","Кресло Sunset","Стул Wolf","Диван Stone","Диван Emerald","Лампа Циклоп"];
// let images = ["images/gall10.jpg","images/gall11.jpg","images/gall2.jpg","images/gall3.jpg","images/gall4.jpg","images/gall5.jpg","images/gall6.jpg","images/gall7.jpg"];
// let prices = ["999 ₽","1200 ₽","2930 ₽","6300 ₽","1300 ₽","7900 ₽","6660 ₽","1610 ₽"];
let good = {
    0:{
        name:"Стул Everest",
        image:"images/gall10.jpg",
        price:1200
    },
    1:{
        name:"Лампа Ярило",
        image:"images/gall11.jpg",
        price:999
    },
    2:{
        name:"Кресло Orange-J",
        image:"images/gall2.jpg",
        price:2930
    },
    3:{
        name:"Кресло Sunset",
        image:"images/gall3.jpg",
        price:6300
    },
    4:{
        name:"Стул Wolf",
        image:"images/gall4.jpg",
        price:1300
    },
    5:{
        name:"Диван Stone",
        image:"images/gall5.jpg",
        price:7900
    },
    6:{
        name:"Диван Emerald",
        image:"images/gall6.jpg",
        price:6660
    },
    7:{
        name:"Лампа Циклоп",
        image:"images/gall7.jpg",
        price:1610
    }
}
let sum = 0;
function parabTiming(x){
    return -4*(x-0.5)*(x-0.5) + 1;
}
function animate({timing, draw, duration}){
    let start = performance.now();

    requestAnimationFrame(function animate(time){
        let timeFraction = (time - start) / duration;
        if(timeFraction > 1){
            timeFraction = 1;
        }
        let progress = timing(timeFraction);
        draw(progress);
        if(timeFraction < 1){
            requestAnimationFrame(animate);
        }
    });
}
document.getElementById("contents").addEventListener("click", function(e){
    if (e.target.closest("a") != null){
        if(!confirm("Вы желаете покинуть страницу?")){
            e.preventDefault();
        }
    }
});
document.querySelector("#info > ul").addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        if(!(e.ctrlKey || e.metaKey)){
            e.target.closest("ul").querySelectorAll("li").forEach(function (elem){elem.className = ""});
        }
        e.target.className = "selected";
        let moveDraw = (time) => {
            e.target.style.transform = `translateX(${time*6}px)`;
        };
        animate({
            timing:parabTiming,
            draw:moveDraw,
            duration: 200
        });
    }
});
document.querySelector("#scroller > span").addEventListener("mousedown", function(e){
    e.preventDefault();
    function movescroll(e){
        let pos = Math.max(Math.min(e.clientX - document.querySelector("#scroller").getBoundingClientRect().left - document.querySelector("#scroller > span").offsetWidth/2, document.querySelector("#scroller").offsetWidth - document.querySelector("#scroller > span").offsetWidth/2), -document.querySelector("#scroller > span").offsetWidth/2);
        document.querySelector("#info > div > h2").textContent = `Цена: ${Math.floor(((pos+document.querySelector("#scroller > span").offsetWidth/2)/document.querySelector("#scroller").offsetWidth)*99999)} ₽`;
        document.querySelector("#scroller > span").style.left = `${pos}px`;
    }
    function stopscroll(){
        document.removeEventListener("mousemove", movescroll);
        document.removeEventListener("mouseup", stopscroll);
        let scaleDraw = (time) => {
            document.querySelector("#scroller > span").style.scale = 1 + time * 0.2;
        };
        animate({
            timing:parabTiming,
            draw:scaleDraw,
            duration: 200
        });
    }
    document.addEventListener("mousemove", movescroll);
    document.addEventListener("mouseup", stopscroll);
});
window.addEventListener("load", function(){
    let goodCards = document.querySelectorAll("#recommended > div");
    for(let i = 0; i < goodCards.length; i++){
        goodCards[i].querySelector("img").setAttribute("src", good[i].image);
        goodCards[i].querySelector("h2").textContent = `${good[i].price} ₽`;
        goodCards[i].querySelector("span").textContent = `${good[i].name}`;
        goodCards[i].querySelector("p").textContent = "Text text text text text text text text text text text text text text text text text text text text text";
        goodCards[i].ondragstart = function () {return false};
        goodCards[i].addEventListener("mousedown", function(e){
            e.preventDefault();
            let shiftX = e.clientX - goodCards[i].getBoundingClientRect().left; 
            let shiftY = e.clientY - goodCards[i].getBoundingClientRect().top;
            let copy = goodCards[i].cloneNode(true);
            goodCards[i].hidded = true;
            copy.className = "dragged";
            copy.style.position = "absolute";
            copy.style.left = `${e.pageX - shiftX}px`;
            copy.style.top = `${e.pageY - shiftY}px`;
            copy.style.backgroundColor = "white";
            copy.style.zIndex = 5;
            document.body.appendChild(copy);
            function movecard(e){
                copy.style.left = `${e.pageX - shiftX}px`;
                copy.style.top = `${e.pageY - shiftY}px`;
            }
            function stopcard(e){
                goodCards[i].hidden = false;
                document.body.removeChild(copy);
                let cart = document.elementFromPoint(e.clientX, e.clientY);
                if(cart && cart.closest("#contents")){
                    cart = cart.closest("#contents");
                    let a = document.createElement("a");
                    a.setAttribute("href", "gallery.html");
                    let img = document.createElement("img");
                    img.setAttribute("src", good[i].image);
                    let h2 = document.createElement("h2");
                    h2.textContent = `${good[i].price} ₽`;
                    let span = document.createElement("span");
                    span.textContent = `${good[i].name}`;
                    let p = document.createElement("p");
                    p.textContent = "Text text text text text text text text text text text text text text text text text text text text text";
                    a.appendChild(img);
                    a.appendChild(h2);
                    a.appendChild(span);
                    a.appendChild(p);
                    cart.appendChild(a);
                    sum += good[i].price;
                    document.querySelector("#info > h1").textContent = `Итого: ${sum} ₽`;
                }
                document.removeEventListener("mousemove", movecard);
                document.removeEventListener("mouseup", stopcard);
            }
            document.addEventListener("mousemove", movecard);
            document.addEventListener("mouseup", stopcard);
        });
    }
});