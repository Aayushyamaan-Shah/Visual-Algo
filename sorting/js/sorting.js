
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

sortStyle = false; // False = Aescending || True = Descending

function funky(){
    ctx = new (window.AudioContext || window.webkitAudioContext) ();
    osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.frequency.value = 0;
    osc.start(0);
    return osc;
}

maxFrequency = 250;
frequencyOffset = 1000;
fun = false;

document.addEventListener('keydown', e => {
    if(e.keyCode === 81 && e.ctrlKey) {
        fun=!fun;
        console.log('Fun toggled');
    }
});

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

// Function to cleare old elements
function clearDOMElements() {
    clearCounters();
    document.querySelector(`.elementsContainer`).innerHTML = '';
}

// Function to cleare all elements
function clearElements() {
    elementsArr = [];
    elementCount = 0;
    updateMaxMin();
    clearDOMElements();
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
    if(elementsMin <= 0){
        newDiv.style.height = (val - elementsMin) / (elementsMax - elementsMin) * 80 + 10 + "%";
    }else{
        newDiv.style.height = (val * 90) / (elementsMax) + "%";    
    }
    newDiv.style.width = document.querySelector(`.elementsContainer`).clientWidth / elementCount + "%";
    if(elementsArr.length <= 15){
        newDiv.innerHTML = "<p class='less'>" + val + "</p>";
    }else{
        newDiv.innerHTML = "<p class='more'>" + val + "</p>";
    }
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
    document.getElementById("elementManage").value = "";
}


// Function to remove specific number
function removeElement(){
    let toRemove = document.getElementById("elementManage").value;
    let isUpdated = false;
    if(!isNaN(toRemove)){
        for(i = 0; i < elementsArr.length; i++){
            if(elementsArr[i] === parseInt(toRemove)){
                elementsArr.splice(i,1);
                elementCount--;
                updateMaxMin();
                clearDOMElements();
                initElements();
                isUpdated = !isUpdated;
            }
        }
    }
    if(!isUpdated){
        window.alert("The element you asked to remove, was not present in the array.");
    }
    document.getElementById("elementManage").value = "";
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

// Function to set the value of comparisons and swaps value to 0
function initCounters(){
    document.getElementById("comparisons").value = 0;
    document.getElementById("swaps").value = 0;
}

// Function to clear swaps and comparisons
function clearCounters(){
    document.getElementById("comparisons").value = "-";
    document.getElementById("swaps").value = "-";    
}

// Function to increment comparison's value
function incrementComparisons(){
    document.getElementById("comparisons").value = parseInt(document.getElementById("comparisons").value) + 1;
}

// Function to increment swap's value
function incrementSwaps(){
    document.getElementById("swaps").value = parseInt(document.getElementById("swaps").value) + 1;
}

// Function that sorts the elements using simple sort
async function simpleSort() {
    initCounters();
    let funny;
    if(fun){
        funny = funky();
    }
    let i = 0;
    let j = 0;
    console.log("Sorting elements - Bubble Sort");
    for (i = elementCount -1; i >= 0; i--) {
        for (j = 0; j < i; j++) {

            let child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);

            selectDOM(child1);
            selectDOM(child2);
            await sleep(sortingSpeed[6 - speedSelector]);
            if(fun){
                funny.frequency.value = maxFrequency * ((elementsArr[j] - elementsMin) / (elementsMax - elementsMin)) + frequencyOffset;
            }
            incrementComparisons();
            if ((sortStyle)? elementsArr[i] > elementsArr[j] : elementsArr[i] < elementsArr[j]) {

                let temp = elementsArr[j];
                elementsArr[j] = elementsArr[i];
                elementsArr[i] = temp;
                swapDom(child1, child2);
                incrementSwaps();
            }

            child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }

    }
    if(fun){
        funny.frequency.value = 0;
        funny.stop();
    }
    console.log(elementsArr)
}

// Function that sorts the elements using bubble sort
async function bubbleSortSimple() {
    initCounters();
    let funny;
    if(fun){
        funny = funky();
    }
    let i = 0;
    let j = 0;
    console.log("Sorting elements - Bubble Sort");
    for (i = elementCount -1; i >= 0; i--) {
        for (j = 0; j < i; j++) {

            let child1 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j + 2})`);

            selectDOM(child1);
            selectDOM(child2);
            await sleep(sortingSpeed[6 - speedSelector]);
            if(fun){
                funny.frequency.value = maxFrequency * ((elementsArr[j] - elementsMin) / (elementsMax - elementsMin)) + frequencyOffset;
            }
            incrementComparisons();
            if ((sortStyle)? elementsArr[j] < elementsArr[j+1] : elementsArr[j] > elementsArr[j+1]) {

                let temp = elementsArr[j+1];
                elementsArr[j+1] = elementsArr[j];
                elementsArr[j] = temp;
                swapDom(child1, child2);
                incrementSwaps();
            }

            child1 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j + 2})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }

    }
    if(fun){
        funny.frequency.value = 0;
        funny.stop();
    }
    console.log(elementsArr)
}

// Function that sorts the elements using bubble sort in conservative fashion
async function bubbleSortConservative() {
    initCounters();
    let funny;
    if(fun){
        funny = funky();
    }
    let i = 0;
    let j = 0;
    console.log("Sorting elements - Bubble Sort");
    for (i = elementCount -1; i >= 0; i--) {
        let swapped = true;
        for (j = 0; j < i; j++) {

            let child1 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j + 2})`);

            selectDOM(child1);
            selectDOM(child2);
            await sleep(sortingSpeed[6 - speedSelector]);
            if(fun){
                funny.frequency.value = maxFrequency * ((elementsArr[j] - elementsMin) / (elementsMax - elementsMin)) + frequencyOffset;
            }
            incrementComparisons();
            if ((sortStyle)? elementsArr[j] < elementsArr[j+1] : elementsArr[j] > elementsArr[j+1]) {
                let temp = elementsArr[j+1];
                elementsArr[j+1] = elementsArr[j];
                elementsArr[j] = temp;
                swapDom(child1, child2);
                incrementSwaps();
                swapped = false;
            }

            child1 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j + 2})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }
        if(swapped){
            break;
        }
    }
    if(fun){
        funny.frequency.value = 0;
        funny.stop();
    }
    console.log(elementsArr)
}

// Function that sorts the elements using selection sort
async function selectionSort() {
    initCounters();
    let funny;
    if(fun){
        funny = funky();
    }
    let i = 0;
    let j = 0;
    console.log("Sorting elements - Selection Sort");
    for (i = elementCount -1; i >= 0; i--) {
        for (j = 0; j < i; j++) {

            let child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            let child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);

            selectDOM(child1);
            selectDOM(child2);
            await sleep(sortingSpeed[6 - speedSelector]);
            if(fun){
                funny.frequency.value = maxFrequency * ((elementsArr[j] - elementsMin) / (elementsMax - elementsMin)) + frequencyOffset;
            }
            incrementComparisons();
            if (elementsArr[i] < elementsArr[j]) {

                let temp = elementsArr[j];
                elementsArr[j] = elementsArr[i];
                elementsArr[i] = temp;
                swapDom(child1, child2);
                incrementSwaps();
            }

            child1 = document.querySelector(`.swapper:nth-child(${i + 1})`);
            child2 = document.querySelector(`.swapper:nth-child(${j + 1})`);
            unselectDOM(child1);
            unselectDOM(child2);

        }

    }
    if(fun){
        funny.frequency.value = 0;
        funny.stop();
    }
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

//   document.getElementById('clicker').disabled = true;
//    document.getElementById('sortClicker').disabled = true;

    sortStyle = document.getElementById('sortStyle').value;
    sortStyle = (sortStyle === 'aescending')? false: true;
    console.log(sortStyle);
    switch(document.getElementById("sortType").value){
        case "simple": simpleSort();break;
        case "bubbleSimple": bubbleSortSimple();break;
        case "bubbleConservative": bubbleSortConservative();break;
        case "selection": selectionSort();break;
        case "insertion": insertionSort();break;
        case "merge": mergeSort();break;
        case "quick": quickSort();break;
        case "heap": heapSort();break;
    }

//    document.getElementById('clicker').disabled = false;
//    document.getElementById('sortClicker').disabled = false;


}