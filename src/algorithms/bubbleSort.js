export const getBubbleSortAnimations = (array) => {
  let n = array.length;
  let animations = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1, true, false]);
        animations.push([j, j + 1, true, true]);
        var temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        animations.push([j, array[j], false, false]);
        animations.push([j + 1, temp, false, false]);
      }
    }
  }
  return animations;
};
