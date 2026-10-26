Domain knowledge is a big advantage when applying to banks, payment companies, insurers and fintechs. This chapter covers the finance vocabulary a banking BA uses every day — from debits and credits to reconciliation, payments and controls.

## How a bank is organized

> **In short:** Front office earns, middle office controls, back office processes.

### Types of banking

- **Retail banking** — individuals: current and savings accounts, cards, mortgages, personal loans.
- **Commercial / corporate banking** — businesses: lending, cash management, trade finance, payments.
- **Investment banking** — capital markets, mergers and acquisitions, trading and securities.
- **Wealth management / private banking** — investment advice for high-net-worth clients.
- **Treasury** — manages the bank's own liquidity, funding and interest-rate risk.

### Front, middle and back office

| Area | What it does | Examples |
| --- | --- | --- |
| **Front office** | Deals with customers and generates revenue | Relationship managers, traders, branch staff |
| **Middle office** | Manages risk and control | Risk management, compliance, finance control, product control |
| **Back office (operations)** | Processes, settles and records transactions | Payments operations, settlements, **reconciliations**, ledger maintenance |

**Global operations and technology centers** (often in India, the Philippines, Poland and elsewhere) run many back-office functions for banks worldwide across time zones — a common background for banking BAs.

## Accounting basics: debits and credits

> **In short:** Every transaction has two equal sides.

### The accounting equation

**Assets = Liabilities + Equity**

- **Assets** — what the business owns or is owed (cash, loans given, buildings).
- **Liabilities** — what it owes others (customer deposits, borrowings).
- **Equity** — the owners' share (capital, retained profits).

### Double-entry bookkeeping

Every transaction is recorded in **at least two accounts**, with **total debits equal to total credits**.

| Account type | Increased by | Decreased by |
| --- | --- | --- |
| Assets | **Debit** | Credit |
| Expenses | **Debit** | Credit |
| Liabilities | **Credit** | Debit |
| Equity | **Credit** | Debit |
| Income / revenue | **Credit** | Debit |

Memory aid: **DEA** (Dividends, Expenses, Assets) increase with **D**ebits; **LER** (Liabilities, Equity, Revenue) increase with credits.

### Example: a customer deposits $1,000 in cash at a bank

- **Debit** Cash (the bank's asset increases) $1,000
- **Credit** Customer deposits (the bank's liability increases) $1,000

### Why your bank statement says "credit" when money arrives

A customer's deposit is a **liability** for the bank (the bank owes it back). So when your balance goes up, the bank *credits* your account in its books. The bank statement is written from the bank's point of view.

## The general ledger, sub-ledgers and month-end

> **In short:** The GL is the master record; sub-ledgers hold the detail.

- **Chart of accounts (CoA)** — the list of all account codes the organization uses (for example 1000 Cash, 2000 Customer deposits, 4000 Fee income).
- **General ledger (GL)** — the master record of all accounts and balances; the source for financial statements.
- **Sub-ledgers** — detailed records for one area (loans, cards, payments, fixed assets) that summarize into the GL.
- **Journal entry** — a record of a transaction: date, accounts, debit and credit amounts, description, reference and approver.
- **Trial balance** — a list of every GL account balance; total debits must equal total credits.
- **Suspense account** — a temporary holding account for items that can't yet be allocated to the correct account. Balances should be investigated and cleared quickly; old suspense items are an audit red flag.
- **Accruals** — income or expenses recognized when earned or incurred, not when cash moves.
- **Month-end close** — the process of finalizing the books: posting accruals, completing reconciliations, reviewing balances, and producing reports.

### Ledger maintenance

**Ledger maintenance** keeps the GL accurate: setting up and closing accounts, maintaining mappings between source systems and GL accounts, posting correction entries and investigating unusual balances. A wrong mapping can send thousands of transactions to the wrong account.

## Reconciliation and breaks

> **In short:** Compare two records that should agree, and investigate the differences.

A **reconciliation** compares two sets of records — usually internal books versus an external source — to confirm they agree.

### Common types

- **Bank / nostro reconciliation** — the bank's internal ledger versus the statement from the correspondent bank.
- **GL to sub-ledger** — does the GL control account equal the sum of the sub-ledger?
- **Intercompany** — do two entities of the same group agree on what they owe each other?
- **Cash, securities and position reconciliations** — cash balances, securities holdings and trading positions versus custodians and brokers.
- **Balance sheet substantiation** — evidence supporting each balance sheet account at month-end.

### The process

1. **Load data** from both sides (ledger entries and statement lines).
2. **Auto-match** using rules (amount, date, reference, tolerance).
3. **Investigate** unmatched items — the **breaks** (exceptions).
4. **Resolve** — match manually, correct the entry, chase the counterparty, or write off within authority.
5. **Escalate** aged or high-value items.
6. **Report** — matched rate, open breaks by age and value, SLA performance.
7. **Sign off** — preparer and reviewer (maker-checker).

### Common causes of breaks

| Cause | Example |
| --- | --- |
| **Timing differences** | Item booked today internally, appears on the bank statement tomorrow |
| **Missing entries** | Bank charged a fee that wasn't booked internally |
| **Amount differences** | Bank deducted a fee from the payment; FX rate differences |
| **Reference mismatches** | Reference truncated or in a different field |
| **Duplicates** | The same entry booked twice |
| **Wrong account** | Entry posted to the wrong GL account or nostro |

### Key reconciliation metrics

- **Auto-match rate** = auto-matched items ÷ total items × 100.
- **Open breaks by age bucket** (0–7, 8–30, 31–60, 60+ days) and by value.
- **Aged breaks** — older items carry more risk: they may hide errors, fraud or real financial loss.
- **SLA compliance** — breaks investigated or resolved within the agreed time.

## Nostro, vostro and correspondent banking

> **In short:** "Ours" and "yours" — accounts banks hold with each other.

Banks hold accounts with other banks to make payments in foreign currencies. This is **correspondent banking**.

- **Nostro account** ("ours") — *our* account held at another bank, usually in a foreign currency. *An Australian bank's USD account at a New York bank is its nostro.*
- **Vostro account** ("yours") — *their* account held with us. *From the New York bank's point of view, the same account is a vostro.*
- **Loro account** ("theirs") — a third party's account, referred to in conversation between two other banks.

The nostro and the vostro are the **same account seen from two sides**. Nostro reconciliation checks that the bank's internal record of its nostro balance (the "mirror" ledger) agrees with the correspondent's statement.

### Dates you must know

- **Trade date** — when a deal is agreed.
- **Booking (posting) date** — when it is recorded in the books.
- **Value date** — when funds actually become available and interest starts to apply.
- **Settlement date** — when the transaction is completed (cash and/or securities exchanged). **T+1** means one business day after the trade date.

### FX basics

- **Spot** — exchange now (usually settles in two business days, T+2, for most currency pairs).
- **Forward** — exchange agreed now at a fixed rate for a future date.
- **Exchange rate notation** — AUD/USD 0.65 means 1 AUD = 0.65 USD.
- **FX revaluation** — restating foreign-currency balances at the current rate, creating unrealized gains or losses.

## Payments and messaging

> **In short:** Know the main payment rails and the messages that move money.

### Common payment types

| Payment | Region | Notes |
| --- | --- | --- |
| **ACH** | US | Batch, low-cost; payroll and bills; run under Nacha rules |
| **Fedwire Funds Service** | US | Real-time gross settlement (RTGS) for high-value payments; moved to ISO 20022 messages in July 2025 |
| **CHIPS** | US | Large-value USD payments with netting |
| **RTP and FedNow** | US | Instant payments, 24/7 |
| **SEPA** | Europe | Euro credit transfers and direct debits |
| **BACS, Faster Payments, CHAPS** | UK | Batch, instant and high-value |
| **NPP, BECS** | Australia | Instant (NPP) and batch (BECS) |
| **SWIFT** | Global | A secure messaging network for banks — it sends payment *instructions*; settlement happens through accounts (nostros) and RTGS systems |
| **Cards** | Global | Authorization → clearing → settlement via Visa, Mastercard and others |

### SWIFT messages (MT) and ISO 20022 (MX)

Traditional SWIFT **MT** messages:

- **MT103** — single customer credit transfer (a customer payment).
- **MT202** — bank-to-bank financial institution transfer.
- **MT940** — customer statement message.
- **MT950** — statement message between banks (often used for nostro statements).

**ISO 20022** is the new, richer, XML-based standard (messages often called **MX**):

- **pain.001** — customer payment initiation.
- **pacs.008** — customer credit transfer between banks (replaces MT103).
- **pacs.009** — financial institution credit transfer (replaces MT202).
- **camt.053** — bank-to-customer statement (equivalent of MT940); **camt.054** — debit/credit notification.

In **November 2025**, SWIFT ended the period when banks could send cross-border payment instructions in either MT or ISO 20022; payment instructions now use ISO 20022. Statement and reporting messages such as MT940/MT950 are still widely used and are migrating on a later timeline. ISO 20022 carries **structured, richer data** (full names, addresses, structured references), which improves automatic matching, sanctions screening and reporting.

> **Interview tip:** ISO 20022 migration is a hot topic for banking BAs. Mentioning that richer structured references can improve auto-match rates shows you connect industry change to business value.

## Regulation, risk and controls

> **In short:** Banks must know their customers, stop financial crime and prove their numbers are right.

### Financial crime

- **KYC (Know Your Customer)** — verifying customer identity and understanding their activity before and during the relationship. **CDD** (customer due diligence) and **EDD** (enhanced due diligence for higher-risk customers).
- **AML (Anti-Money Laundering)** — detecting and reporting suspicious activity. Money laundering has three stages: **placement, layering, integration**. In the US, banks file **SARs** (Suspicious Activity Reports) under the Bank Secrecy Act.
- **Sanctions screening** — checking names and payments against sanctions lists (for example OFAC in the US, UN and EU lists).

### Financial reporting and capital

- **SOX (Sarbanes-Oxley Act, 2002)** — US law requiring public companies to maintain and test **internal controls over financial reporting**. Section 404 requires management to assess those controls. Reconciliations are key SOX controls.
- **Basel III** — international standards for bank capital and liquidity (capital ratios, liquidity coverage ratio).
- **IFRS / US GAAP** — accounting standards for financial statements.

### Internal controls

- **Maker-checker / four-eyes principle** — one person prepares (maker), another reviews and approves (checker).
- **Segregation of duties (SoD)** — no single person controls every step of a transaction (e.g. the person who creates a payment can't approve it).
- **Audit trail** — a record of who did what, when and why.
- **Reconciliations** — detective controls that catch errors.
- **Preventive vs detective controls** — preventive stops errors (system blocks unbalanced entries); detective finds them afterwards (reconciliation, exception reports).

### Three lines of defense

1. **First line** — business and operations teams that own and manage risk day to day.
2. **Second line** — risk management and compliance, which set policy and oversee.
3. **Third line** — internal audit, which gives independent assurance.

### Operational risk

**Operational risk** is the risk of loss from failed processes, people, systems or external events — such as a missed payment, a reconciliation error, or a system outage. Aged breaks are an operational-risk indicator.

## Financial statements and ratios

> **In short:** Three statements tell the story of a business.

- **Income statement (profit and loss, P&L)** — revenue minus expenses over a period = profit.
- **Balance sheet** — assets, liabilities and equity at a point in time (it must balance).
- **Cash flow statement** — cash in and out over a period from **operating, investing and financing** activities. Profit is not the same as cash.

### Common ratios

| Ratio | Formula | Tells you |
| --- | --- | --- |
| Gross margin | (Revenue − Cost of goods sold) ÷ Revenue | Profitability of core sales |
| Net profit margin | Net profit ÷ Revenue | Overall profitability |
| Current ratio | Current assets ÷ Current liabilities | Short-term liquidity |
| Debt-to-equity | Total debt ÷ Equity | Leverage |
| Return on equity (ROE) | Net profit ÷ Shareholders' equity | Return to owners |

### Bank-specific measures

- **Net interest margin (NIM)** — (interest earned − interest paid) ÷ average earning assets. Banks' core profitability.
- **Cost-to-income ratio** — operating costs ÷ operating income; lower is more efficient. Operations improvements (like automation) directly improve this.
- **Non-performing loans (NPL) ratio** — loans in default or close to it ÷ total loans.

> **Interview tip:** A finance background lets you talk about value in the language executives use. Instead of "we saved time", say "we reduced manual effort by X hours a month, improving the cost-to-income ratio and lowering operational risk."
