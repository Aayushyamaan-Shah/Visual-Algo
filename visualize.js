selectedPos1 = 1;
selectedPos2 = 2;
elementCount = 5;
elementsArr = [];
elementsMax = 0;
elementsMin = 0;
speedSelector = 4;
sortingSpeed = [2.5, 10, 50, 250, 500];
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function randomInt(min, max){
    return Math.ceil((Math.random() * (max-min)) + min);
}

function initArr(){
    for(let k = 0; k < elementCount; k++){
        elementsArr.push(randomInt(5,999));
    }
    elementsMax = Math.max(...elementsArr);
    elementsMin = Math.min(...elementsArr);
    console.log(elementsArr)
}

function clearDOMElements(){
    document.querySelector(`.elementsContainer`).innerHTML = '';
}

function addDOMElement(val){

    // <div class="swapper default">
    //     <p>wot</p>
    // </div>

    let newDiv = document.createElement("div");
    newDiv.classList.add("swapper");
    newDiv.classList.add("default");
    newDiv.style.height = (val * 90) / elementsMax + "%";
    newDiv.style.width = document.querySelector(`.elementsContainer`).clientWidth / elementCount + "%";
    newDiv.innerHTML = "<p>"+val+"</p>";
    document.querySelector(`.elementsContainer`).appendChild(newDiv);
}

function initElements(){
    for(let i = 0; i < elementCount; i++){
        addDOMElement(elementsArr[i]);
    }
}

async function swapDom(el1, el2){
    let cloneEl1 = el1.cloneNode(true);
    let cloneEl2 = el2.cloneNode(true);
    
    el1.parentNode.replaceChild(cloneEl2,el1);
    el2.parentNode.replaceChild(cloneEl1,el2);
}

function selectDOM(element){
    element.classList.remove('default');
    element.classList.add('selected');
}

function unselectDOM(element){
    element.classList.remove('selected');
    element.classList.add('default');
}

async function sortElements(){
    let i = 0;
    let j = 0;
    console.log("Sorting elements");
    for(i = 0; i < elementCount-1; i++){
        for(j = i+1; j < elementCount; j++){

            let child1 = document.querySelector(`.swapper:nth-child(${i+1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j+1})`);
            
            selectDOM(child1);
            selectDOM(child2);
            console.log(sortingSpeed[5-speedSelector])
            await sleep(sortingSpeed[5-speedSelector]);

            if(elementsArr[i] > elementsArr[j]){

                let temp = elementsArr[j];
                elementsArr[j] = elementsArr[i];
                elementsArr[i] = temp;

                swapDom(child1,child2);
            } 
            
            child1 = document.querySelector(`.swapper:nth-child(${i+1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j+1})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }
        
    }
    console.log("OUF");
    console.log(elementsArr)
}

function updateSpeed(){
    speedSelector = document.querySelector(`#speed`).value;
}

function primer(){
    elementCount = parseInt(document.getElementById('elementCount').value);
    console.log(elementCount);
    elementsArr = [];
    clearDOMElements();
    initArr();
    initElements();
}

function sorter(){

    document.getElementById('clicker').disabled = true;
    document.getElementById('sortClicker').disabled = true;

    sortElements();

    document.getElementById('clicker').disabled = false;
    document.getElementById('sortClicker').disabled = false;
}