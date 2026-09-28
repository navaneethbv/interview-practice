class Solution:
    def dutchFlagSort(self, arr):
        red, current, blue = 0, 0, len(arr) - 1
        while current <= blue:
            if arr[current] == "R":
                arr[red], arr[current] = arr[current], arr[red]
                red += 1
                current += 1
            elif arr[current] == "B":
                arr[current], arr[blue] = arr[blue], arr[current]
                blue -= 1
            else:
                current += 1
