let flag = false;
let form = document.getElementById("orderform");
function toggleordform(){
    flag = !flag;
    if (flag){
        form.style.display = "flex";
    }else{
        form.style.display = "none";
    }
}