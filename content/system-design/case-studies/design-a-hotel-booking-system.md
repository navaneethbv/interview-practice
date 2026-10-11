## Requirements

- Search hotels by location and dates, show availability and prices, and book a room type.
- Never sell more rooms than exist; allow a controlled amount of overbooking if the business wants it.
- Handle payment and cancellation.

Assume 5,000 hotels in a region with 1 million rooms, 3,000 searches and 30 bookings per second.

## Data model

```text
room_types(id, hotel_id, name, total_rooms)
inventory(room_type_id, date, total, reserved, PRIMARY KEY (room_type_id, date))
reservations(id, room_type_id, check_in, check_out, status, guest_id, idempotency_key UNIQUE)
```

Inventory is per room type per night, not per physical room; rooms are assigned at check-in.

## Deep dives

**Preventing oversell.** A reservation for nights d1 to dn must update every night's row atomically:

```sql
UPDATE inventory SET reserved = reserved + 1
WHERE room_type_id = ? AND date >= ? AND date < ? AND reserved < total
```

Proceed only if the update touched exactly n rows; otherwise roll back.
This is optimistic and avoids long-held locks.
For overbooking, compare against `total * 1.1` instead.

**Holds.** Reserve inventory when the guest starts payment, with an expiry; a job releases expired holds.

**Search.** Search reads from a cache or search index of availability that can lag slightly; the booking transaction is the source of truth, and the UI handles "no longer available".

## Follow-up questions

- How do you handle a flash sale? (Queue booking requests per room type and process them serially.)
- How do you integrate with external channel managers? (Treat their allocations as separate inventory pools with sync and reconciliation.)
