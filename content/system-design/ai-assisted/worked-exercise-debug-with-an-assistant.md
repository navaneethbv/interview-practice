Debugging rounds test whether you form hypotheses and check them, rather than asking the assistant to "fix the bug".

## The report

Users report two problems with the "last 7 days" revenue chart: the bar for today is always empty, and some late-evening orders appear under the following day.
The function is:

```python
def daily_revenue(orders, today, days=7):
    start = today - timedelta(days=days)
    totals = defaultdict(int)
    for o in orders:
        if start < o.created_at.date() < today:
            totals[o.created_at.date()] += o.amount_cents
    return [totals[start + timedelta(days=i)] for i in range(1, days + 1)]
```

## A strong session

1. Reproduce it with a test before touching the code:

```python
def test_includes_today():
    today = date(2026, 3, 10)
    orders = [Order(created_at=datetime(2026, 3, 10, 9), amount_cents=500)]
    assert daily_revenue(orders, today)[-1] == 500
```

2. State hypotheses: the filter excludes `today`; time zones shift late orders to the next day; the output window is off by one.
3. Check them one at a time. The test fails because `&lt; today` excludes today, while the returned window ends at `start + 7 days = today`.
4. Fix the comparison to `start &lt; day &lt;= today` and rerun. That explains the empty bar but not the second symptom: `created_at` is stored in UTC while "today" is the user's local date, so an order at 21:00 in New York is dated the next day.
5. Propose converting timestamps to the user's zone before taking `.date()`, and add a test for an order at 23:30 local time.

An assistant asked to "fix the bug" will usually change the comparison and stop; the interview signal is finding the second cause.
