export function getMergeSortAnimations(array) {
    const animations = [];
    if(array.length <= 1){
        return animations;
    }
    const auxillaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxillaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxillaryArray, animations) {
    if(startIdx === endIdx){
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxillaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxillaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxillaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxillaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while(i <= middleIdx && j<=endIdx){
        // values that we are comparing(in the merge step). Push them once to change their color;
        animations.push([i, j]);
        // revert their color
        animations.push([i, j]);

        if(auxillaryArray[i] <= auxillaryArray[j]){
            animations.push([k, auxillaryArray[i]]);
            // set height of ith index as new height
            mainArray[k++] = auxillaryArray[i++];
        }else {
            animations.push([k, auxillaryArray[j]]);
            mainArray[k++] = auxillaryArray[j++];
        }
    }
    while(i <= middleIdx){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxillaryArray[i]]);
        mainArray[k++] = auxillaryArray[i++];
    }
    while(j <= endIdx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxillaryArray[j]]);
        mainArray[k++] = auxillaryArray[j++];
    }
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations){
    let i, j, temp;
    let n = array.length;
    for (i = 0; i < n; i++) 
    {
        for (j = 0; j < n - i - 1; j++) 
        {
            animations.push([1, j, j+1]); // change color
            animations.push([0, j, j+1]); // revert
            if (array[j] > array[j + 1]) 
            {
                animations.push([2, j, array[j+1]]);
                animations.push([2, j+1, array[j]]);
                // Swap array[j] and array[j+1]
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
        animations.push([10, n-i-1]);
    }
}