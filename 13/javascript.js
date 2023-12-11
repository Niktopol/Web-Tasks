"use strict";
var likeCount = document.getElementById("counter");
var form = document.getElementById("orderform");
var canvwrap = document.getElementById("coverdrawer");
var canvas = document.getElementById("heartdraw");
var img = new Image(64, 64);
var popular = document.getElementById("popular");
var goods = document.getElementById("goods");
img.src = "images/heart.png";

var fflag = false;
var cflag = false;
var drawFlag = false;
var popGoods = [];
var cart = [];
var goodsElems = [];

const ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function comparator(a, b){
    if (Number(a.querySelector("figcaption h2:nth-child(2)").textContent.split(' ')[0]) > Number(b.querySelector("figcaption h2:nth-child(2)").textContent.split(' ')[0])){
        return 1;
    }else if(Number(a.querySelector("figcaption h2:nth-child(2)").textContent.split(' ')[0]) == Number(b.querySelector("figcaption h2:nth-child(2)").textContent.split(' ')[0])){
        return 0;
    }else{
        return -1;
    }
}

popular.querySelector("& #sortbtns button:first-child").addEventListener('click', function(event) {
    for(let good of popGoods){
        popular.removeChild(good);
    }
    popGoods.sort(comparator);
    for(let good of popGoods){
        popular.appendChild(good);
    }
});

popular.querySelector("& #sortbtns button:last-child").addEventListener('click', function(event) {
    for(let good of popGoods){
        popular.removeChild(good);
    }
    popGoods.sort(comparator);
    popGoods.reverse();
    for(let good of popGoods){
        popular.appendChild(good);
    }
});

function CartItem(price, name, quantity){
    this.price = price;
    this.name = name;
    this.quantity = quantity;
}
function updateCart(obj){
    if(cart.length > goodsElems.length){
        let record = document.createElement("div");
        record.className = "good";
        let name = document.createElement("span");
        name.textContent = obj.name;
        record.appendChild(name);

        let amount = document.createElement("div");
        amount.className = "amount";
        let minus = document.createElement("button");
        minus.textContent = "-";
        amount.appendChild(minus);
        let count = document.createElement("span");
        count.textContent = obj.quantity;
        amount.appendChild(count);
        let plus = document.createElement("button");
        plus.textContent = "+";
        amount.appendChild(plus);

        record.appendChild(amount);

        goods.appendChild(record);
        goodsElems.push(record);

        minus.addEventListener('click', function(event) {
            updateCart(new CartItem(obj.price, obj.name, -1));
        });
        plus.addEventListener('click', function(event) {
            updateCart(new CartItem(obj.price, obj.name, 1));
        });
    }else{
        for(let i = 0; i < cart.length; i++){
            if (cart[i].name === obj.name){
                cart[i].quantity += obj.quantity;
                let span = goodsElems[i].querySelector("& .amount > span");
                span.textContent = cart[i].quantity;
                if(cart[i].quantity <= 0){
                    goodsElems[i].parentNode.removeChild(goodsElems[i]);
                    goodsElems.splice(i,1);
                    cart.splice(i,1);
                }
                break;
            }
        }
    }
    let sum = 0;
    for(let good of cart){
        sum += good.price*good.quantity;
    }
    goods.parentNode.querySelector("& > span:last-child").textContent = "Итого: "+sum+ " ₽";
    if(cart.length > 0){
        goods.querySelector("& > span").style.display = "none";
    }else{
        goods.querySelector("& > span").style.display = "block";
    }
}

function addToCart(obj){
    for(let good of cart){
        if (good.name ===  obj.name){
            updateCart(obj);
            return;
        }
    }
    cart.push(obj);
    updateCart(obj);
}

function genPopularGoods(){
    let names = ["Стул Everest","Лампа Ярило","Кресло Orange-J","Кресло Sunset","Стул Wolf","Диван Stone","Диван Emerald","Лампа Циклоп"];
    let images = ["images/gall10.jpg","images/gall11.jpg","images/gall2.jpg","images/gall3.jpg","images/gall4.jpg","images/gall5.jpg","images/gall6.jpg","images/gall7.jpg"];
    let prices = ["999 ₽","1200 ₽","2930 ₽","6300 ₽","1300 ₽","7900 ₽","6660 ₽","1610 ₽"];
    for(let i = 0; i < 8; i++){
        let figure = document.createElement("figure");

        let figcaption = document.createElement("figcaption");

        let img = document.createElement("img");
        img.setAttribute("src", images[i]);

        let name = document.createElement("h2");
        name.textContent = names[i];

        let price = document.createElement("h2");
        price.textContent = prices[i];

        let p = document.createElement("p");
        p.textContent = "Text text text text text text text text text text text text text text text text text text text text text";

        let cartBtn = document.createElement("button");
        cartBtn.className = "cart_btn";
        cartBtn.textContent= "В корзину";

        let likeBtn = document.createElement("button");
        likeBtn.className = "likebutton";

        let heartFull = document.createElement("img");
        heartFull.setAttribute("src", "images/heart.svg");

        let heartEmpty = document.createElement("img");
        heartEmpty.setAttribute("src", "images/heart_empty.svg");

        likeBtn.appendChild(heartFull)
        likeBtn.appendChild(heartEmpty)

        figure.appendChild(img);
        figure.appendChild(figcaption);
        figcaption.appendChild(name);
        figcaption.appendChild(price);
        figcaption.appendChild(p);
        figcaption.appendChild(cartBtn);
        figcaption.appendChild(likeBtn);
        popular.appendChild(figure);

        popGoods.push(figure);

        likeBtn.addEventListener('click', function(event) {
            if(heartFull.style.display === "none" || heartFull.style.display === ""){
                heartFull.style.display = "block";
                likeCount.innerText = Number(likeCount.innerText) + 1;
            }else{
                heartFull.style.display = "none";
                likeCount.innerText = Number(likeCount.innerText) - 1;
            }
        });
        cartBtn.addEventListener('click', function(event) {
            addToCart(new CartItem(Number(prices[i].split(' ')[0]), names[i], 1));
        });
    }
}

function filter(arr, a, b){
    let res = [];
    for(let i of arr){
        if(i >= a && i <= b){
            res.push(i);
        }
    }
    return res;
}
let notifCount = 0;
let counter = document.querySelector("#notifications span");
let notifs = document.querySelector("#notifications").lastElementChild;
let cards = document.querySelector("#blurcards");
let pageHeight;
let interval;
let timeout;
function intervalNotif(){
    notifCount += 1;
    let notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = "Уведомление №"+notifCount;
    notif.appendChild(document.createElement("div"));
    notifs.appendChild(notif);
    counter.textContent = notifCount <= 99 ? notifCount : "99+";
}
document.querySelector("#notifications img").addEventListener("click",function(){
    clearInterval(interval);
    clearTimeout(timeout);
    timeout = setTimeout(function(){interval = setInterval(intervalNotif, 3000);}, 10000);
});
document.querySelector("#notifications button").addEventListener("click",function(){
    notifCount += 1;
    let value = prompt() ?? "New notification";
    let notif = document.createElement("div");
    notif.className = "notification";
    notif.textContent = value;
    notifs.appendChild(notif);
    counter.textContent = notifCount <= 99 ? notifCount : "99+";
    setTimeout(function(){
        notifCount -= 1;
        notifs.removeChild(notif);
        counter.textContent = notifCount <= 99 ? notifCount : "99+";
    }, 1500);
});
window.addEventListener("scroll", function(event){
    //(document.documentElement.clientHeight/2)/      + cards.offsetHeight/2)
    cards.querySelectorAll("& > .blcard").forEach(function(elem){
        elem.style.opacity = (window.scrollY + cards.offsetHeight/2)/(cards.getBoundingClientRect().y + window.scrollY);
    });
    popular.style.opacity = (window.scrollY)/(popular.getBoundingClientRect().y + window.scrollY)
    this.document.getElementById("vidwrapper").lastElementChild.style.objectPosition = `center ${(window.scrollY/pageHeight) * -1500}px`;
});
window.onload = function (){
    genPopularGoods();
    counter.textContent = notifCount;
    pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    notifs.addEventListener("click", function(event){
        if(event.target.parentNode.className == "notification" && event.target.tagName == "DIV"){
            notifs.removeChild(event.target.parentNode);
            notifCount -= 1;
            counter.textContent = notifCount <= 99 ? notifCount : "99+";
        }
    });
    interval = setInterval(intervalNotif, 3000);
    let positioned = document.getElementById("positioned");
    positioned.addEventListener("click", function(e){
        positioned.firstElementChild.style.left = `${(positioned.clientWidth / 2) - (positioned.firstElementChild.offsetWidth / 2)}px`;
        positioned.firstElementChild.style.top = `${(positioned.clientHeight / 2) - (positioned.firstElementChild.offsetHeight / 2)}px`;
        alert(`Mouse pos: x: ${e.clientX} y:${e.clientY}`);
    });
};
function truncate(str, maxLength){
    if (str.length > maxLength) {
        return str.substr(0, maxLength - 1) + "…";
    }
    return str;
}

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
