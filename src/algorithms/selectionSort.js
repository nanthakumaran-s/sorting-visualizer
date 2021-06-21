export const getSelectionSortAnimations = (arr) => {
  let i, j, min_idx;
  let n = arr.length;
  const animations = [];

  for (i = 0; i < n - 1; i++) {
    min_idx = i;
    for (j = i + 1; j < n; j++) if (arr[j] < arr[min_idx]) min_idx = j;

    animations.push([min_idx, i, true, false]);
    animations.push([min_idx, i, true, true]);

    let temp = arr[min_idx];
    arr[min_idx] = arr[i];
    arr[i] = temp;

    animations.push([min_idx, arr[min_idx], false, false]);
    animations.push([i, temp, false, false]);
  }
  return animations;
};
