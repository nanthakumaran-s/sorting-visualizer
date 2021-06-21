export const getQuickSortAnimations = (items, left, right) => {
  var index;
  let animations = [];
  if (items.length > 1) {
    index = partition(items, left, right, animations);
    if (left < index - 1) {
      animations.push(...getQuickSortAnimations(items, left, index - 1));
    }
    if (index < right) {
      animations.push(...getQuickSortAnimations(items, index, right));
    }
  }
  return animations;
};

const partition = (items, left, right, animations) => {
  var pivot = items[Math.floor((right + left) / 2)],
    i = left,
    j = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j, animations);
      i++;
      j--;
    }
  }
  return i;
};

const swap = (items, leftIndex, rightIndex, animations) => {
  animations.push([leftIndex, rightIndex, true, false]);
  animations.push([leftIndex, rightIndex, true, true]);
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  animations.push([leftIndex, items[leftIndex], false, false]);
  animations.push([rightIndex, temp, false, false]);
};
