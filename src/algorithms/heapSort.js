export const getHeapSortAnimations = (arr) => {
  var n = arr.length;
  var i;
  var animations = [];

  for (i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i, animations);

  for (i = n - 1; i > 0; i--) {
    animations.push([0, i, true, false]);
    animations.push([0, i, true, true]);
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push([0, arr[0], false, false]);
    animations.push([i, temp, false, false]);

    heapify(arr, i, 0, animations);
  }
  return animations;
};

function heapify(arr, n, i, animations) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest]) largest = l;

  if (r < n && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    animations.push([i, largest, true, false]);
    animations.push([i, largest, true, true]);
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    animations.push([i, arr[i], false, false]);
    animations.push([largest, swap, false, false]);

    heapify(arr, n, largest, animations);
  }
}
