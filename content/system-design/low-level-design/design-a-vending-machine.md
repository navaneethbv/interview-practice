## Prompt and scope

A machine accepts coins, sells one selected product per transaction, returns change, and permits cancellation before dispensing.
Assume a fixed set of coin denominations and finite inventory.
Define how the machine handles a jam or inability to make change.

## Model

```text
VendingMachine -> Session(balance, selection, state)
               -> ProductInventory
               -> CoinInventory
               -> Dispenser

IDLE -> ACCEPTING -> READY -> DISPENSING -> COMPLETE
                  \-> CANCELLED
                            DISPENSING -> NEEDS_RECOVERY
```

Store monetary amounts as integer minor units.
The session owns the inserted-credit ledger; inventory owns the counts of products and coins.
Do not equate enough total money with the ability to produce exact change.

## Worked example

A product costs 135 units and the customer inserts 200.
The machine needs change of 65.
If available coins are one 50, one 10, and one 5, it can reserve those coins and one product before dispensing.
If there is no 5 and no other combination makes 65, reject the purchase or ask for exact payment while preserving the customer's credit.
A greedy change algorithm is not valid for every possible denomination set and bounded inventory.
For small fixed amounts, a bounded search or dynamic program can determine feasibility.

## Transaction boundary

Validate product availability and change feasibility before requesting physical delivery.
Reserve the necessary inventory so another session cannot consume it.
On a confirmed successful dispense, finalize the sale and release change.
If the hardware reports an uncertain outcome, record a recovery state instead of blindly retrying and possibly dispensing twice.
The software must distinguish a definite failure from missing confirmation.

## Tests

Test exact payment, insufficient balance, unavailable products, impossible change, cancellation, duplicate button presses, and a jam after reservation.
A cancellation before dispensing should refund the session's credit without changing product inventory.
After an uncertain physical action, recovery needs a hardware-specific policy rather than an invented rollback guarantee.

## Follow-up

Introduce card payments by separating payment authorization from inventory and dispensing.
Discuss the new failure windows before adding a payment interface to the diagram.
