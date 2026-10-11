## Prompt and scope

Members search the catalog, borrow and return copies, place holds, and pay late fees.
Librarians add books and copies.

## Model and invariants

```text
Book(isbn, title, authors)            -- the work
Copy(id, isbn, status: AVAILABLE | ON_LOAN | ON_HOLD_SHELF | LOST)
Member(id, max_loans, fines_cents)
Loan(id, copy_id, member_id, due_at, returned_at)
Hold(id, isbn, member_id, created_at, status)
```

Separate the book from its physical copies; holds are placed on the book, loans on a copy.
A copy is on at most one open loan.
A member cannot exceed their loan limit or borrow with unpaid fines over a threshold.

## Operations

- `checkout(member, copy)`: validate member limits and copy status, create the loan, set the copy ON_LOAN.
- `return(copy)`: close the loan, compute a fine from days late, then, if a hold queue exists for the book, put the copy on the hold shelf for the earliest hold and notify that member.
- `place_hold(member, isbn)`: append to the book's FIFO hold queue.

## Walkthrough and tests

Bob returns a copy of a book with Alice's hold pending.
The copy goes to the hold shelf, not back to AVAILABLE, so Carol cannot check it out at the desk.
Tests: limit reached, return of a lost copy, fine calculation across a month boundary, and hold expiry passing the copy to the next member.
