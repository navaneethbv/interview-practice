function dutchFlagSort(arr: string[]): void {
    let red = 0, current = 0, blue = arr.length - 1;
    while (current <= blue) {
        if (arr[current] === "R") {
            [arr[red], arr[current]] = [arr[current], arr[red]];
            red++;
            current++;
        } else if (arr[current] === "B") {
            [arr[current], arr[blue]] = [arr[blue], arr[current]];
            blue--;
        } else {
            current++;
        }
    }
}
