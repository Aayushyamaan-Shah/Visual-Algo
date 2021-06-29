let selectedPos1 = -1;
let selectedPos2 = -1;

function swapText(){
    console.log("swapText()");
    let a = document.querySelectorAll('.swapper')[0].innerHTML;
    let b = document.querySelectorAll('.swapper')[1].innerHTML;
    document.querySelectorAll('.swapper')[0].innerHTML = b;
    document.querySelectorAll('.swapper')[1].innerHTML = a;
}

function swapDom(el1, el2){
    let cloneEl1 = el1.cloneNode(true);
    let cloneEl2 = el2.cloneNode(true);

    let animeTime = 0.5;

    gsap.to(el1.id,{opacity: 0, duration: animeTime, y: 50});
    // gsap.to(el1,{opacity: 100, duration: animeTime, y: -50});

    el1.parentNode.replaceChild(cloneEl2,el1);
    el2.parentNode.replaceChild(cloneEl1,el2);
}

function swapper(){
    swapDom(document.querySelectorAll('.swapper')[0],document.querySelectorAll('.swapper')[1]);
}

function sortElements(){
    for
}
