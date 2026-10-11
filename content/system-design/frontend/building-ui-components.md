UI coding rounds ask you to build a component in about 45 minutes, in plain JavaScript or a framework.
Interviewers look at correctness, state design, accessibility and edge cases more than at styling.

## A repeatable approach

1. Clarify the behavior, inputs and edge cases.
2. Define the state and what derives from it.
3. Build the static markup with semantic HTML.
4. Add interaction and keyboard support.
5. Handle loading, empty and error states.

## Example: an autocomplete

State: the input text, the suggestion list, the highlighted index, loading and error flags, and whether the list is open.

- Debounce input before requesting suggestions.
- Ignore stale responses, using a request counter or `AbortController`.
- Keyboard: Up and Down move the highlight, Enter selects, Escape closes.
- Accessibility: `role="combobox"` on the input with `aria-expanded` and `aria-controls`, `role="listbox"` and `role="option"` on the list, and `aria-activedescendant` for the highlighted option.
- Cache results per query to avoid repeated requests.

## Other common components

Modal dialog (focus trap, Escape to close, return focus on close), tabs (arrow-key navigation), infinite scroll (an `IntersectionObserver` sentinel), star rating, file upload with progress, a data table with sorting and pagination, and nested comments.

## Accessibility checklist

Use native elements first (`button`, `a`, `input`).
Everything must be reachable and operable by keyboard with a visible focus indicator.
Label every control, announce dynamic updates with live regions where needed, and check color contrast.
