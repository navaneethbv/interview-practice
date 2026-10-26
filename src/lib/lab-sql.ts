export interface SqlResult {
  columns: string[];
  rows: (string | number | null)[][];
}
export const sqlTables = [
  {
    name: "customers",
    columns: [
      ["customer_id", "INTEGER"],
      ["name", "TEXT"],
      ["segment", "TEXT"],
    ],
    rows: [
      [1, "Asha", "Retail"],
      [2, "Ben", "Corporate"],
      [3, "Chen", "Retail"],
      [4, "Dina", "Corporate"],
      [5, "Eli", "Retail"],
    ],
  },
  {
    name: "orders",
    columns: [
      ["order_id", "INTEGER"],
      ["customer_id", "INTEGER"],
      ["amount", "REAL"],
      ["ordered_at", "TEXT"],
    ],
    rows: [
      [101, 1, 120, "2026-01-05"],
      [102, 2, 500, "2026-01-10"],
      [103, 1, 80, "2026-02-01"],
      [104, 3, 200, "2026-02-08"],
      [105, 4, 300, "2026-02-12"],
      [106, 2, 100, "2026-02-18"],
    ],
  },
  {
    name: "returns",
    columns: [
      ["return_id", "INTEGER"],
      ["order_id", "INTEGER"],
      ["reason", "TEXT"],
      ["refund", "REAL"],
      ["days_to_refund", "INTEGER"],
      ["status", "TEXT"],
    ],
    rows: [
      [1, 101, "Damaged", 120, 3, "Paid"],
      [2, 102, "Wrong item", 250, 7, "Paid"],
      [3, 104, "Damaged", 200, null, "Pending"],
      [4, 105, "Changed mind", 100, 5, "Paid"],
      [5, 106, "Damaged", 100, 2, "Paid"],
    ],
  },
];
export const sqlExercises = [
  {
    title: "Read the order book",
    prompt: "Return order_id and amount for all orders, ordered by order_id.",
    solution: "SELECT order_id, amount FROM orders ORDER BY order_id;",
    expected: {
      columns: ["order_id", "amount"],
      rows: [
        [101, 120],
        [102, 500],
        [103, 80],
        [104, 200],
        [105, 300],
        [106, 100],
      ],
    },
  },
  {
    title: "Filter high-value orders",
    prompt: "Return order_id and amount where amount is at least 200.",
    solution: "SELECT order_id, amount FROM orders WHERE amount >= 200;",
    expected: {
      columns: ["order_id", "amount"],
      rows: [
        [102, 500],
        [104, 200],
        [105, 300],
      ],
    },
  },
  {
    title: "Count cases by status",
    prompt: "Return status and case_count for each return status.",
    solution:
      "SELECT status, COUNT(*) AS case_count FROM returns GROUP BY status;",
    expected: {
      columns: ["status", "case_count"],
      rows: [
        ["Paid", 4],
        ["Pending", 1],
      ],
    },
  },
  {
    title: "Measure paid refunds",
    prompt:
      "Return one column total_refund: sum of refunds whose status is Paid. Pending amounts are not payments.",
    solution:
      "SELECT SUM(refund) AS total_refund FROM returns WHERE status = 'Paid';",
    expected: { columns: ["total_refund"], rows: [[570]] },
  },
  {
    title: "Find overdue refunds",
    prompt:
      "Return return_id and days_to_refund for paid returns taking more than 4 days.",
    solution:
      "SELECT return_id, days_to_refund FROM returns WHERE status = 'Paid' AND days_to_refund > 4;",
    expected: {
      columns: ["return_id", "days_to_refund"],
      rows: [
        [2, 7],
        [4, 5],
      ],
    },
  },
  {
    title: "Join orders to customers",
    prompt: "Return order_id and name for every order. Join using customer_id.",
    solution:
      "SELECT o.order_id, c.name FROM orders o JOIN customers c ON c.customer_id=o.customer_id;",
    expected: {
      columns: ["order_id", "name"],
      rows: [
        [101, "Asha"],
        [102, "Ben"],
        [103, "Asha"],
        [104, "Chen"],
        [105, "Dina"],
        [106, "Ben"],
      ],
    },
  },
  {
    title: "Customers with no orders",
    prompt:
      "Include customers who have not ordered. Return customer_id and name for them.",
    solution:
      "SELECT c.customer_id, c.name FROM customers c LEFT JOIN orders o ON o.customer_id=c.customer_id WHERE o.order_id IS NULL;",
    expected: { columns: ["customer_id", "name"], rows: [[5, "Eli"]] },
  },
  {
    title: "Revenue by segment",
    prompt:
      "Return segment and revenue, summing order amount once per order. Do not join returns: that could multiply revenue in a real one-to-many dataset.",
    solution:
      "SELECT c.segment, SUM(o.amount) AS revenue FROM customers c JOIN orders o ON o.customer_id=c.customer_id GROUP BY c.segment;",
    expected: {
      columns: ["segment", "revenue"],
      rows: [
        ["Corporate", 900],
        ["Retail", 400],
      ],
    },
  },
  {
    title: "Monthly revenue",
    prompt: "Return month (YYYY-MM) and revenue based on ordered_at.",
    solution:
      "SELECT substr(ordered_at,1,7) AS month, SUM(amount) AS revenue FROM orders GROUP BY substr(ordered_at,1,7);",
    expected: {
      columns: ["month", "revenue"],
      rows: [
        ["2026-01", 620],
        ["2026-02", 680],
      ],
    },
  },
  {
    title: "Repeat buyers",
    prompt:
      "Return customer_id and order_count only for customers with more than one order.",
    solution:
      "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;",
    expected: {
      columns: ["customer_id", "order_count"],
      rows: [
        [1, 2],
        [2, 2],
      ],
    },
  },
  {
    title: "Average refund time",
    prompt:
      "Return average_days rounded to 2 decimals for paid refunds. Explain why a pending NULL must not become zero.",
    solution:
      "SELECT ROUND(AVG(days_to_refund),2) AS average_days FROM returns WHERE status='Paid';",
    expected: { columns: ["average_days"], rows: [[4.25]] },
  },
  {
    title: "Rank customer spend",
    prompt:
      "Return customer_id, spend and spend_rank for customers with orders using DENSE_RANK over descending total spend. Use a CTE.",
    solution:
      "WITH spend AS (SELECT customer_id, SUM(amount) AS spend FROM orders GROUP BY customer_id) SELECT customer_id, spend, DENSE_RANK() OVER (ORDER BY spend DESC) AS spend_rank FROM spend;",
    expected: {
      columns: ["customer_id", "spend", "spend_rank"],
      rows: [
        [2, 600, 1],
        [4, 300, 2],
        [1, 200, 3],
        [3, 200, 3],
      ],
    },
  },
];
export function sameSqlResult(a: SqlResult, b: SqlResult): boolean {
  return (
    JSON.stringify(a.columns) === JSON.stringify(b.columns) &&
    JSON.stringify(a.rows.map((r) => JSON.stringify(r)).sort()) ===
      JSON.stringify(b.rows.map((r) => JSON.stringify(r)).sort())
  );
}
export function buildLabSqlProgram(query: string) {
  const data = JSON.stringify({ query, tables: sqlTables });
  return {
    prelude: "",
    user: "",
    packages: ["sqlite3"],
    runner: `
import sqlite3, json
_data=json.loads(${JSON.stringify(data)})
_db=sqlite3.connect(':memory:')
_db.setlimit(sqlite3.SQLITE_LIMIT_LENGTH, 100000)
_db.setlimit(sqlite3.SQLITE_LIMIT_SQL_LENGTH, 10000)
_db.setlimit(sqlite3.SQLITE_LIMIT_EXPR_DEPTH, 100)
_db.setlimit(sqlite3.SQLITE_LIMIT_COMPOUND_SELECT, 20)
try:
    for table in _data['tables']:
        columns=', '.join('"'+c[0]+'" '+c[1] for c in table['columns'])
        _db.execute('CREATE TABLE "'+table['name']+'" ('+columns+')')
        _db.executemany('INSERT INTO "'+table['name']+'" VALUES ('+','.join('?' for c in table['columns'])+')',table['rows'])
    _db.commit()
    _allowed={sqlite3.SQLITE_SELECT,sqlite3.SQLITE_READ,sqlite3.SQLITE_FUNCTION,sqlite3.SQLITE_RECURSIVE}
    def _authorize(action,a,b,db,source):
        if action == sqlite3.SQLITE_FUNCTION and str(b).lower() in {'load_extension','writefile','readfile'}: return sqlite3.SQLITE_DENY
        return sqlite3.SQLITE_OK if action in _allowed else sqlite3.SQLITE_DENY
    _db.set_authorizer(_authorize)
    _ticks=[0]
    def _stop():
        _ticks[0]+=1
        return _ticks[0]>1000
    _db.set_progress_handler(_stop,1000)
    if len(_data['query'])>10000: raise ValueError('Query exceeds 10,000 characters')
    _cur=_db.execute(_data['query'])
    if not _cur.description: raise ValueError('Use a read-only SELECT query')
    _rows=_cur.fetchmany(201)
    if len(_rows)>200: raise ValueError('Result exceeds 200 rows; add LIMIT')
    print('LAB_RESULT:'+json.dumps({'columns':[c[0] for c in _cur.description],'rows':_rows}))
except Exception as e:
    print('LAB_ERROR:'+str(e))
finally:
    _db.close()
`,
  };
}
