export const getInsertionSortAnimations = (arr) => {
  let n = arr.length;
  let i, key, j;
  const animations = [];
  for (i = 1; i < n; i++) {
    key = arr[i];
    j = i - 1;
    while (j >= 0 && arr[j] > key) {
      animations.push([j, j + 1, true, false]);
      animations.push([j, j + 1, true, true]);
      arr[j + 1] = arr[j];
      animations.push([j + 1, arr[j], false, false]);
      j = j - 1;
    }
    arr[j + 1] = key;
    animations.push([j + 1, key, false, false]);
  }
  return animations;
};
