## Intuition

Once the lengths assigned to the two pattern symbols are known, their actual strings are determined by positions in the value.
The counts of each symbol constrain those lengths.
Enumerate one length and derive the other rather than trying every possible pair of substrings.

## Brute force

Choose candidate strings for both symbols from arbitrary substrings, expand the pattern, and compare with the value.
That explores many candidates whose total lengths already make a match impossible.

## Approach

Treat the first pattern symbol as `main` and the other as `alternate`.
Count their occurrences and locate the first alternate position.
For each positive `main_length`, subtract its total contribution from the value length.
When the alternate occurs, require a positive remaining length divisible by its count.
Derive the alternate's start and length, extract both words, and expand the full pattern in `_matches`.
A single-symbol pattern uses only its main word.

## Walkthrough

Example 1 uses pattern `aabab` and value `catcatgocatgo`.
There are three a symbols and two b symbols, with the first b at pattern index 2.
Trying main length 3 leaves four characters for b, so alternate length is 2.
Its first occurrence begins at value index 6 and yields `go`; the main word is `cat`.
Expanding gives `cat + cat + go + cat + go`, exactly the supplied value, so return true.

## Complexity

Let p be pattern length and v value length.
There are O(v) length candidates, with O(p + v) reconstruction work per tested candidate.
A conservative bound is O(v(p + v)) time and O(p + v) temporary space.

## Edge cases

An empty pattern matches only an empty value.
Used symbols require nonempty replacements.
The reference permits both symbols to map to equal strings if the expansion matches.

## Common mistakes

Assuming a is always the first symbol breaks patterns beginning with b.
Checking only the total length cannot verify repeated occurrences consistently.

## Language notes

Python builds a list of parts and joins it.
Java uses `StringBuilder` and stops if reconstruction grows beyond the value length.
