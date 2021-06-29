selectedPos1 = 1;
selectedPos2 = 2;
elementCount = 5;
elementsArr = [];

// function swapText(){
//     console.log("swapText()");
//     let a = document.querySelectorAll('.swapper')[0].innerHTML;
//     let b = document.querySelectorAll('.swapper')[1].innerHTML;
//     document.querySelectorAll('.swapper')[0].innerHTML = b;
//     document.querySelectorAll('.swapper')[1].innerHTML = a;
// }

function randomInt(min, max){
    return Math.ceil((Math.random() * (max-min)) + min);
}

function initArr(){
    for(let k = 0; k < elementCount; k++){
        elementsArr.push(randomInt(5,999));
    }
    console.log(elementsArr)
}

function clearDOMElements(){
    document.querySelector(`.elementsContainer`).innerHTML = '';
}

function addDOMElement(val){

    // <div class="swapper">
    //     <p>wot</p>
    // </div>

    let newDiv = document.createElement("div");
    newDiv.classList.add("swapper");
    newDiv.style.height = (val * 80) / Math.max(...elementsArr) + "%";
    newDiv.style.width = document.querySelector(`.elementsContainer`).clientWidth / elementCount + "%";
    newDiv.innerHTML = "<p>"+val+"</p>";
    document.querySelector(`.elementsContainer`).appendChild(newDiv);
}

function initElements(){
    for(let i = 0; i < elementCount; i++){
        addDOMElement(elementsArr[i]);
    }
}

function swapDom(el1, el2){
    let cloneEl1 = el1.cloneNode(true);
    let cloneEl2 = el2.cloneNode(true);

    let animeTime = 0.5;

    el1.parentNode.replaceChild(cloneEl2,el1);
    el2.parentNode.replaceChild(cloneEl1,el2);
}

function sortElements(){
    let i = 0;
    let j = 0;
    for(i = 0; i < elementCount; i++){
        for(j = 1; j < elementCount; j++){
            let child1 = document.querySelector(`.wrapper:nth-child(${selectedPos1})`);
            let child2 = document.querySelector(`.wrapper:nth-child(${selectedPos2})`);
            
            swapDom(child1,child2);
    
        }
        
    }
}

function swapper(){
    elementCount = parseInt(document.getElementById('elementCount').value);
    console.log(elementCount);
    elementsArr = [];
    clearDOMElements();
    initArr();
    initElements();
    document.getElementById('clicker').disabled = true;

    document.getElementById('clicker').disabled = false;

}
