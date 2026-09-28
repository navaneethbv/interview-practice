class Solution:
    def shiftWordToBack(self, arr, word):
        matched = 0
        write = 0
        for read in range(len(arr)):
            if matched < len(word) and arr[read] == word[matched]:
                matched += 1
            else:
                arr[write] = arr[read]
                write += 1
        for offset, letter in enumerate(word):
            arr[write + offset] = letter
