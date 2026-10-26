/** Count visible word runs in authored markup with one bounded linear scan. */
export function markupWordCount(markup: string): number {
  let inTag = false;
  let inWord = false;
  let words = 0;
  for (const character of markup) {
    if (character === "<") {
      inTag = true;
      inWord = false;
      continue;
    }
    if (character === ">") {
      inTag = false;
      inWord = false;
      continue;
    }
    if (inTag) continue;
    if (character.trim() === "") {
      inWord = false;
      continue;
    }
    if (!inWord) {
      words++;
      inWord = true;
    }
  }
  return words;
}
