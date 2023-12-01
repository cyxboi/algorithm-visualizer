var n=20;
const array=[];
var sortType = 0;
var t ;
var sorted=false;
var running=false;
var bubbleSortBtn = document.getElementById("bubble-sort");
var selectionBtn = document.getElementById("selection-sort");
var insertionBtn = document.getElementById("insertion-sort");
var mergeBtn = document.getElementById("merge-sort");
var quickBtn = document.getElementById("quick-sort");
var resetBtn = document.getElementById("reset");
var playBtn = document.getElementById("play");

document.getElementById("barSlider").oninput = function() {
    // init()
    myFunction()
};

function myFunction() {
   n = document.getElementById("barSlider").value //gets the oninput value
   document.getElementById('barNum').innerHTML = n //displays this value to the html page
   console.log(n)
}

let audioCtx = null;

const beep = (freq)=>{
    if(audioCtx == null){
        audioCtx = new (AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0,audioCtx.currentTime+dur)
    osc.connect(node)
    node.connect(audioCtx.destination);
}

const play = (sortType) => {
    const copy = [...array];
    let moves;
    switch (sortType) {
        case 'bubble':
            moves = bubbleSort(copy);
            break;
        case 'selection':
            moves = selectionSort(copy);
            break;
        case 'insertion':
            moves = insertionSort(copy);
            break;
        case 'merge':
            moves = mergeSort(copy);
            break;
        // Add more cases for other sorting functions if needed
        default:
            console.error('Invalid sorting function:', sortType);
            return;
    }
        console.table(moves)
        animate(moves);
};
const reset = ()=>{
    sorted = false
    running = false
    sorted ? playBtn.style.visibility = 'visible' : ""  ;//Don't show play if bars are not sorted
    init();
    clearTimeout(t);
}

function init(){
    for(let i=0;i<n;i++){
    array[i] = (Math.random()*100);
    }
    // myFunction()
    showbar();
}

const showbar = (move)=> {
    canvas.innerHTML= "";
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement("div");
            bar.style.height=array[i]+"%";
            bar.classList.add("bar")
            canvas.appendChild(bar);
            if(move && move.indices.includes(i)){
                bar.style.backgroundColor = move.type == "swap"? "#ea4335" :"#4285F4";
            }
        }
    }
const animate = (moves)=>{
        if(moves.length == 0 ){
            showbar()
            sorted = true;
            return;
        }
        const move = moves.shift();
        const [i,j] = move.indices;
        if(move.type == "swap"){
            [array[i],array[j]]=[array[j],array[i]];
        }
        beep(200+array[i]*10)
        beep(200+array[j]*10)
    showbar(move);
    t = setTimeout(()=>{
                running=true;
                animate(moves);
                },200);
}
const sortTypefunc = (type) =>{
    sorted ? reset() : "";
    running ? "" : sortType=type;
    document.getElementById('sortheadingbox').innerHTML = ""
    document.getElementById('sortheadingbox').innerHTML += `<h1>${sortType}</h1>`
    playBtn.style.visibility = 'visible';
}

//////////////////// SORT ALGORITHMS /////////////////////////
const bubbleSort = (array) =>{
    const moves =[];
    do{
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
            moves.push({indices:[i-1,i],type:"comp"});
                    if(array[i-1] > array[i])
                    {
                        swapped = true;
                        moves.push({indices:[i-1,i],type:"swap"});
                        [array[i-1],array[i]]=[array[i],array[i-1]];
                    }
                }
            }while(swapped);
            return moves;
}

const selectionSort = (array)=>{
    const moves =[];
    for(let i =0; i<array.length; i++){
        var min = i;
        for(let j=i+1; j<array.length; j++){
            if(array[min]>array[j])
            {
                min = j;
            }
        }
        moves.push({indices:[min,i],type:"comp"});
        if(i != min)
        {
            // moves.push([min,i]);
            moves.push({indices:[min,i],type:"swap"});
            [array[min],array[i]]=[array[i],array[min]];
        }
    }
    return moves;
}
const insertionSort = (array)=>{
    const moves =[];
        for (let i = 1; i < n; i++) 
        {  
            let key = array[i];  
            let j = i - 1;  
            moves.push({indices:[j,j+1],type:"comp"});
            while (j >= 0 && array[j] > key) 
            {  
                array[j + 1] = array[j];  
                moves.push({indices:[j,j+1],type:"swap"});
                j = j - 1; 
            }
            array[j + 1] = key;  
            moves.push({indices:[j+1,key],type:"comp"});
        }  
        return moves
} 

const mergeSort = (array)=>{
    var moves=[];
    function mergeS(array) {
        if (array.length <= 1) {
            return array;
        }
    
        // Split the array into halves
        const middle = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, middle);
        const rightHalf = array.slice(middle);
    
        // Recursively sort each half
        const leftSorted = mergeS(leftHalf);
        const rightSorted = mergeS(rightHalf);
    
        // Merge the sorted halves
        return merge(leftSorted, rightSorted);
    }
    
    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        moves.push({indices:[j,j+1],type:"swap"});
        // Compare elements and merge
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        // Add remaining elements from left and right arrays
        return result.concat(left.slice(leftIndex), right.slice(rightIndex));
    }
    mergeS(array)
    return moves
}

bubbleSortBtn.addEventListener('click',()=>sortTypefunc('bubble'));
selectionBtn.addEventListener('click',()=>sortTypefunc('selection'));
insertionBtn.addEventListener('click',()=>sortTypefunc('insertion'));
mergeBtn.addEventListener('click',()=>sortTypefunc('merge'));
quickBtn.addEventListener('click',()=>sortTypefunc('quick'));

playBtn.addEventListener('click',()=> running ? "" : play(sortType));
resetBtn.addEventListener('click',reset);

// while(1)
init();