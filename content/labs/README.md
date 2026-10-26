# Business analysis practice labs

The rendered lab catalog is authored in `src/lib/lab-data.ts`; SQL schema, synthetic seed rows, expected results and executable reference queries are in `src/lib/lab-sql.ts`.

## Learning route

1. Complete the three beginner readiness checks and use the plain-language glossary.
2. Work through **From brief to business acceptance**, producing stakeholder/scope, process, requirement, story, traceability and UAT artifacts. Draft your response before opening each worked example.
3. Download a practice workbook; compare its completed answer after calculating and interpreting your own results.
4. Run the twelve SQL exercises. Expected result tables are visible; results compare column names and duplicate-aware rows without imposing row ordering.
5. Try the senior decision simulations: scope conflict, business case, operating model, dependencies and migration, vendor selection, and benefits realization. Defensible alternatives are encouraged when assumptions and tradeoffs are clear.
6. Rehearse an honest interview walkthrough. These are fictional practice cases, never claims of employment, deployed software or achieved savings.

## Workbook reproduction and checks

Run `python3 scripts/generate-practice-workbooks.py` (openpyxl required). It creates three practice files and three answer files under `public/practice-workbooks/`. Answer formulas are user-editable and recalculated by Excel/LibreOffice when opened. The supplied answer workbooks were also recalculated using LibreOffice and scanned for spreadsheet errors.

- Returns: 48 cases; 24 cases exceed 4 days; £170.40 total handling cost. The prepared Excel table is the pivot source, with explicit pivot-building tasks. The supplied answer summary uses formulas rather than a native PivotTable.
- Invoices: £10,200 invoice total; £9,200 allocated payments; £1,000 net outstanding; £125 orphan payment; £100 overpayment; both reconciliation differences are zero.
- Business case: at 60% adoption, £12,192 annual net capacity value after license, 4.9213-year simple payback, −39.04% undiscounted three-year ROI. Capacity value is not automatically cash savings.

## Browser execution and storage

SQL uses the existing `/pyodide-worker.js` and downloads Pyodide/SQLite from jsDelivr on the first run. It never sends SQL to a server. Each execution receives a new in-memory database, a read-operation authorizer, a SQLite instruction budget, expression/string/SQL-size limits, a 200-row result limit, and an 8-second execution timeout after runtime initialization. Cancel and unmount terminate the worker. Initial download has a separate 60-second timeout with a visible error message.

Drafts and self-review checks use the guarded storage helper under `ip:labs:v1`. The pure validator is exported for backup import. Failed disk writes remain recoverable in the current tab through existing guarded storage behavior. Individual project drafts can be exported as text. Self-review checklists and exercise result matches are learning aids, not accredited assessment or automatic grading of business judgment.
