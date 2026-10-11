## Prompt and scope

A customer inserts a card, enters a PIN, and checks a balance, withdraws or deposits.
The ATM dispenses notes from cassettes and talks to the bank over a network that can fail.

## State machine

```text
IDLE -> CARD_INSERTED -> AUTHENTICATED -> (BALANCE | WITHDRAW | DEPOSIT) -> AUTHENTICATED -> ... -> EJECT_CARD -> IDLE
```

Model states explicitly; each state accepts only some inputs, and invalid inputs are rejected rather than silently ignored.
Three wrong PINs retain the card.

## Withdrawal transaction

1. Check the ATM can make the amount from its cassettes (a greedy note selection works for standard denominations; verify it).
2. Ask the bank to authorize and place a hold, with a transaction id.
3. Dispense.
4. Confirm the transaction with the bank.

If dispensing fails after authorization, reverse the hold with the same transaction id.
If the network drops after dispensing but before confirmation, the ATM journals the dispense locally and retries the confirmation later; the bank treats the transaction id idempotently.

## Tests and follow-up

Test insufficient notes, insufficient funds, a jam during dispensing, and a lost confirmation.
Follow-ups: cassette replenishment, daily withdrawal limits, and a maintenance mode.
