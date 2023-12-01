const n=10;
const array=[];
var sortType;
var t ;



const play = (sort,) => {
    const copy = [...array];
    let swaps;
    console.log(sort)
    switch (sort) {
        case 'bubble':
            swaps = bubbleSort(copy);
            break;
        case 'selection':
            swaps = selectionSort(copy);
            break;
        // Add more cases for other sorting functions if needed
        default:
            console.error('Invalid sorting function:', sort);
            return;
    }

    animate(swaps);
};




const reset = ()=>{
    clearTimeout(t);
    init();
}

function init(){
    for(let i=0;i<n;i++){
    array[i] = (Math.random()*100);
    }
    showbar();
}
const showbar = (indices)=> {
    canvas.innerHTML= "";
        for (let i = 0; i < array.length; i++) {
            const bar = document.createElement("div");
            bar.style.height=array[i]+"%";
            bar.classList.add("bar")
            canvas.appendChild(bar);
            if(indices && indices.includes(i)){
                bar.style.backgroundColor = "red";
            }
        }
    }
    
    const animate = (swaps)=>{
        if(swaps.length == 0 ){
            showbar()
        return;
    }
    const [i,j] = swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showbar([i,j]);
 
    t = setTimeout(()=>{
        animate(swaps);
    },1000);
}



const bubbleSort = (array) =>{
    const swaps =[];
    do{
        var swapped = false;
        for (let i = 1; i < array.length; i++) {
                    if(array[i-1] > array[i])
                    {
                        swapped = true;
                        swaps.push([i-1,i]);
                        [array[i-1],array[i]]=[array[i],array[i-1]];
                    }
                }
            }while(swapped);
            return swaps;
        }

const selectionSort = (array)=>{
    const swaps =[];
    for(let i =0; i<array.length; i++){
        var min = i;
        for(let j=i+1; j<array.length; j++){
            if(array[min]>array[j])
            {
                min = j;
            }
        }
        if(i != min)
        {
            swaps.push([min,i]);
            [array[min],array[i]]=[array[i],array[min]];
        }
    }
    return swaps;
}


var bubbleSortBtn = document.getElementById("bubble-sort").addEventListener('click',()=>sortType='bubble');
var bubbleSortBtn = document.getElementById("selection-sort").addEventListener('click',()=>sortType='selection');
var bubbleSortBtn = document.getElementById("play").addEventListener('click',()=>play(sortType));
var bubbleSortBtn = document.getElementById("reset").addEventListener('click',reset);
init();