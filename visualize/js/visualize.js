
// Declaration and initialization of all gobal variables

selectedPos1 = 1;
selectedPos2 = 2;
elementCount = 0;
elementsArr = [];
elementsMax = 0;
elementsMin = 0;
speedSelector = 4;
sortingSpeed = [0, 2.5, 10, 50, 250, 500];
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

// Function to create random integer between the given range
function randomInt(min, max) {
    return Math.ceil((Math.random() * (max - min)) + min);
}

// Function to initialize the array with random values
function initArr() {
    for (let k = 0; k < elementCount; k++) {
        elementsArr.push(randomInt(5, 999));
    }
    updateMaxMin();
    console.log(elementsArr)
}

// Function to update min and max
function updateMaxMin(){
    elementsMax = Math.max(...elementsArr);
    elementsMin = Math.min(...elementsArr);
}

// Function to cleares old elements
function clearDOMElements() {
    document.querySelector(`.elementsContainer`).innerHTML = '';
}

// Function to create and add new bars in the visualizer
function addDOMElement(val) {

    // FORMAT:
    // <div class="swapper default">
    //     <p>wot</p>
    // </div>

    let newDiv = document.createElement("div");
    newDiv.classList.add("swapper");
    newDiv.classList.add("default");
    newDiv.style.height = (val * 90) / elementsMax + "%";
    newDiv.style.width = document.querySelector(`.elementsContainer`).clientWidth / elementCount + "%";
    newDiv.innerHTML = "<p>" + val + "</p>";
    document.querySelector(`.elementsContainer`).appendChild(newDiv);
}

// Function to iteratively add all the elements in the sorting div
function initElements() {
    for (let i = 0; i < elementCount; i++) {
        addDOMElement(elementsArr[i]);
    }
}

// Function to add specific number
function addElement(){
    let toAdd = document.getElementById("elementManage").value;
    if(!isNaN(toAdd)){
        elementsArr.push(parseInt(toAdd));
        elementCount++;
        updateMaxMin();
        clearDOMElements();
        initElements();
    }
}


// Function to remove specific number
function removeElement(){
    let toRemove = document.getElementById("elementManage").value;
    if(!isNaN(toRemove)){
        for(i = 0; i < elementsArr.length; i++){
            if(elementsArr[i] === parseInt(toRemove)){
                elementsArr.splice(i,1);
                elementCount--;
                updateMaxMin();
                clearDOMElements();
                initElements();
            }
        }
    }
}

// Function to swap 2 HTML elements
async function swapDom(el1, el2) {
    let cloneEl1 = el1.cloneNode(true);
    let cloneEl2 = el2.cloneNode(true);

    el1.parentNode.replaceChild(cloneEl2, el1);
    el2.parentNode.replaceChild(cloneEl1, el2);
}

// Function to apply color when the element is selected
function selectDOM(element) {
    element.classList.remove('default');
    element.classList.add('selected');
}

// Function to remove the color when the element is no longer selected
function unselectDOM(element) {
    element.classList.remove('selected');
    element.classList.add('default');
}

// Function that sorts the elements using simple sort
async function sortElements() {
    let i = 0;
    let j = 0;
    console.log("Sorting elements");
    for (i = 0; i < elementCount - 1; i++) {
        for (j = i + 1; j < elementCount; j++) {

            let child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);

            selectDOM(child1);
            selectDOM(child2);
            console.log(sortingSpeed[6 - speedSelector])
            await sleep(sortingSpeed[6 - speedSelector]);

            if (elementsArr[i] > elementsArr[j]) {

                let temp = elementsArr[j];
                elementsArr[j] = elementsArr[i];
                elementsArr[i] = temp;

                swapDom(child1, child2);
            }

            child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }

    }
    console.log("OUF");
    console.log(elementsArr)
}

// Function that updates the speed
function updateSpeed() {
    speedSelector = document.querySelector(`#speed`).value;
}

// Function that calls all the intializing functions
function primer() {
    elementCount = parseInt(document.getElementById('elementCount').value);
    console.log(elementCount);
    elementsArr = [];
    clearDOMElements();
    initArr();
    initElements();
}

// Function that calls the sorting function
function sorter() {

    document.getElementById('clicker').disabled = true;
    document.getElementById('sortClicker').disabled = true;

    sortElements();

    document.getElementById('clicker').disabled = false;
    document.getElementById('sortClicker').disabled = false;
}