## Intuition

Each word can be transformed independently once its one-based position is known.
The initial letter decides whether to rotate the word, while the position decides how many a characters to append.
Separating these two rules prevents the suffix length from being confused with the word length.

## Approach

1. Split `sentence` into words in their original order.
2. For each word, test its first letter against the vowels without changing the preserved letter case.
3. If it begins with a consonant, move the first letter after the remaining letters.
4. Append `ma`, followed by as many a characters as the word's one-based position.
5. Join the transformed words with one space between neighbors.

The suffix is attached after any rotation, so no suffix character participates in moving the original first letter.
The statement's spacing guarantees mean no empty word needs separate handling.

## Walkthrough

Example 1 is `sentence = "I speak"`.

| Position | Original word | After vowel/consonant rule | Suffix | Result |
| --- | --- | --- | --- | --- |
| 1 | `I` | `I` | `ma` plus `a` | `Imaa` |
| 2 | `speak` | `peaks` | `ma` plus `aa` | `peaksmaaa` |

`I` is a vowel even though it is uppercase, so it stays in place.
Moving the s in `speak` to the end gives `peaks`.
Joining the two results produces `"Imaa peaksmaaa"`.

## Complexity

- Time: O(L + w²), for input length L and w words; the positional suffixes contain `1 + 2 + .. + w` a characters.
- Space: O(L + w²), including split words, transformed strings, and the returned sentence.

The quadratic term is part of the required output size, not repeated processing of existing output.

## Edge cases

A one-letter consonant remains the same after rotation before receiving its suffix.
Uppercase and lowercase vowels receive identical classification while retaining their case.
A one-word sentence gets exactly one positional a.
Single spaces are restored between outputs without adding a trailing space.

## Common mistakes

- Starting the position at zero omits the first required a.
- Lowercasing the whole word changes letters that should be preserved.
- Appending the suffix before rotating moves the wrong substring.

## Language notes

Python uses `enumerate(.., 1)` and a list of transformed strings.
Java indexes a split array from zero and uses `index + 1` with `String.repeat`.
Both allocate substrings for consonant rotation, which is included in the stated cost.
