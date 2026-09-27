# Read N Characters Given Read4

Implement `read(buf, n)` using the supplied `read4(buf4)` function.
Each `read4` call copies up to four characters from the file's current position into its buffer and returns the number copied.
Copy at most `n` characters into `buf`, stop at end of file, and return how many were copied.
Only that returned prefix of `buf` is checked.
Each testcase starts with a fresh file and calls your method once.
The `file` field configures the API and is not a method argument.

## Examples

```text
Input: buf = [" "," "," "], n = 3, file = "orbit"
Output: ["o","r","b"]
Explanation: Return 3 and store the first three characters in buf.
```

```text
Input: buf = [" "," "," "," "," "], n = 5, file = "hi"
Output: ["h","i"]
Explanation: Return 2 because the file ends after two characters.
```

## Constraints

- 1 <= n <= 1000
- 0 <= file.length <= 1000
- buf has capacity for at least n characters.
- File contents use ASCII characters.
