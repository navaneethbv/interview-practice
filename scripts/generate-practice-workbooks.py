#!/usr/bin/env python3
"""Reproducible fictional BA exercises. Run: python3 scripts/generate-practice-workbooks.py.
Uses openpyxl; answer formulas recalculate in Excel/LibreOffice. No network or real customer data.
"""
from pathlib import Path
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.chart import BarChart, Reference
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.workbook.properties import CalcProperties

OUT=Path(__file__).resolve().parents[1]/'public'/'practice-workbooks'
OUT.mkdir(parents=True,exist_ok=True)
NAVY='16324F'; TEAL='007F82'; BLUE='1763AA'

def sheet(wb,name,headers,rows):
    ws=wb.create_sheet(name);ws.append(headers)
    for row in rows:ws.append(row)
    ws.freeze_panes='A2';ws.auto_filter.ref=ws.dimensions
    for c in ws[1]:c.font=Font(name='Aptos',bold=True,color='FFFFFF');c.fill=PatternFill('solid',fgColor=NAVY);c.alignment=Alignment(wrap_text=True,vertical='center')
    ws.row_dimensions[1].height=32
    for row in ws.iter_rows(min_row=2):
        for c in row:
            c.font=Font(name='Aptos',size=11,color='111827' if c.data_type=='f' else BLUE)
            c.alignment=Alignment(vertical='top',wrap_text=True)
            if c.row%2==0:c.fill=PatternFill('solid',fgColor='EFF6F8')
    for col in ws.columns:
        letter=col[0].column_letter
        ws.column_dimensions[letter].width=min(70,max(18,max(len(str(c.value or '')) if c.data_type!='f' else 22 for c in col)+2))
    return ws

def base(title,tasks,answer):
    wb=Workbook();wb.remove(wb.active);wb.calculation=CalcProperties(calcId=191029,fullCalcOnLoad=True)
    ws=sheet(wb,'Start',['BA DATA LAB',title],[['Mode','COMPLETED ANSWER' if answer else 'PRACTICE: fill blank calculated columns'],['Source','Fictional deterministic training data. No real customer information.'],['Workflow','Keep Raw data unchanged. Enter formulas in Prepared or Analysis. Check totals and explain the business decision.'],*[[f'Task {i+1}',t] for i,t in enumerate(tasks)],['Formula compatibility','Uses SUMIF, IF, IFERROR, VLOOKUP, TRIM and LOWER; open in Excel/LibreOffice to recalculate.'],['Self-review','Check boundaries, missing keys and duplicates; trace totals to source data before recommending a change.']])
    ws.column_dimensions['A'].width=25;ws.column_dimensions['B'].width=105
    for i in range(2,ws.max_row+1):ws.row_dimensions[i].height=46
    return wb

def add_table(ws,name):
    t=Table(displayName=name,ref=ws.dimensions);t.tableStyleInfo=TableStyleInfo(name='TableStyleMedium2',showRowStripes=True);ws.add_table(t)

def chart(ws,title,xcol,ycol,start,end,anchor):
    c=BarChart();c.title=title;c.y_axis.title='Value';c.x_axis.title='Category';c.add_data(Reference(ws,min_col=ycol,max_col=ycol,min_row=start-1,max_row=end),titles_from_data=True);c.set_categories(Reference(ws,min_col=xcol,min_row=start,max_row=end));c.width=20;c.height=10;ws.add_chart(c,anchor)

def returns_prepared_rows(answer):
    rows=[]
    for n in range(2,50):rows.append([f'=Raw!A{n}',f'=LOWER(TRIM(Raw!B{n}))' if answer else None,f'=IFERROR(VLOOKUP(B{n},Owners!$A$2:$B$4,2,FALSE),"UNMAPPED")' if answer else None,f'=Raw!D{n}',f'=Raw!E{n}/60*Raw!F{n}' if answer else None,f'=IF(D{n}>4,1,0)' if answer else None])
    return rows

def returns_dashboard_rows(answer):
    return [['Total cases','=COUNTA(Prepared!A2:A49)' if answer else None],['Total handling cost','=SUM(Prepared!E2:E49)' if answer else None],['Total SLA breaches','=SUM(Prepared!F2:F49)' if answer else None],['Breach rate','=B4/B2' if answer else None],['',''],['Channel','Cases','Handling cost','SLA breaches'],*[[c,f'=COUNTIF(Prepared!B$2:B$49,A{r})' if answer else None,f'=SUMIF(Prepared!B$2:B$49,A{r},Prepared!E$2:E$49)' if answer else None,f'=SUMIF(Prepared!B$2:B$49,A{r},Prepared!F$2:F$49)' if answer else None] for r,c in enumerate(['email','web','phone'],8)],['Recommendation','Enter a reasoned action; do not infer root cause from channel alone.'],['Check','Expected: 48 cases, 24 breaches; total cost £170.40.'],['Pivot instructions','Select Prepared table → Insert PivotTable → channel rows; count case_id, sum handling_cost, average refund_days. Answer summary above is formula-driven, not a native PivotTable.']]

def returns(answer):
    tasks=['In Prepared clean Channel using LOWER(TRIM()). Keep source values in Raw.','Use VLOOKUP with exact match to map each cleaned channel to an owner; display UNMAPPED for missing keys.','Calculate handling cost = minutes / 60 × hourly cost. Flag refund_days > 4, including the exactly-4 boundary.','Create a pivot from Prepared: channel as rows, count case_id, sum handling_cost and average refund_days. Refresh when source changes.','Build a chart of cases by channel. Recommend an intervention using SLA rate, volume and cost together.']
    wb=base('Returns operations',tasks,answer)
    raw=[]
    for i in range(48):raw.append([f'RET-{1001+i}',[' Email ','WEB',' phone '][i%3],['Damaged','Changed mind','Wrong item','Late delivery'][i%4],(i%8)+1,5+(i%5)*2,24])
    sheet(wb,'Raw',['case_id','channel','reason','refund_days','handling_minutes','hourly_cost'],raw)
    sheet(wb,'Owners',['channel','owner'],[['email','Customer operations'],['web','Digital operations'],['phone','Contact centre']])
    rows=returns_prepared_rows(answer)
    p=sheet(wb,'Prepared',['case_id','clean_channel','owner','refund_days','handling_cost','sla_breach'],rows);add_table(p,'ReturnsPrepared')
    for n in range(2,50):p[f'E{n}'].number_format='£#,##0.00'
    dash=sheet(wb,'Dashboard',['Metric / channel','Value / cases','Handling cost','SLA breaches'],returns_dashboard_rows(answer))
    dash['B3'].number_format='£#,##0.00';dash['B5'].number_format='0.0%';dash.column_dimensions['B'].width=50
    if answer:chart(dash,'Return cases by channel',1,2,8,10,'F2')
    wb._sheets.remove(dash);wb._sheets.insert(1,dash)
    return wb

def reconciliation(answer):
    wb=base('Invoice reconciliation',['Aggregate split payments by invoice ID with SUMIF before calculating balances.','Flag positive balance as OPEN, negative as OVERPAID and zero as SETTLED. Include exact settlement.','Identify orphan payments independently; do not allocate an unknown invoice ID to a valid invoice.','Reconcile invoice total = allocated payments + net balance. Net open balance includes overpayments; show both separately.','Prepare a finance action list with owner and evidence required before correcting source records.'],answer)
    amounts=[1000,800,1200,1500,600,2000,1100,2000]
    sheet(wb,'Invoices',['invoice_id','supplier','invoice_amount'],[[f'INV-{101+i}',f'Supplier {i%3+1}',a] for i,a in enumerate(amounts)])
    payments=[['PAY-1','INV-101',1000],['PAY-2','INV-102',300],['PAY-3','INV-102',500],['PAY-4','INV-103',1200],['PAY-5','INV-104',1000],['PAY-6','INV-105',600],['PAY-7','INV-106',1500],['PAY-8','INV-107',1000],['PAY-9','INV-108',2100],['PAY-10','INV-999',125]]
    sheet(wb,'Payments',['payment_id','invoice_id','paid_amount'],payments)
    rows=[]
    for r in range(2,10):rows.append([f'=Invoices!A{r}',f'=Invoices!C{r}',f'=SUMIF(Payments!$B$2:$B$11,A{r},Payments!$C$2:$C$11)' if answer else None,f'=B{r}-C{r}' if answer else None,f'=IF(D{r}>0,"OPEN",IF(D{r}<0,"OVERPAID","SETTLED"))' if answer else None,'Finance analyst'])
    p=sheet(wb,'Prepared',['invoice_id','invoice_amount','allocated_payments','balance','status','owner'],rows);add_table(p,'InvoicePrepared')
    for row in p.iter_rows(min_row=2,min_col=2,max_col=4):
        for c in row:c.number_format='£#,##0.00;[Red](£#,##0.00)'
    sheet(wb,'Payment checks',['payment_id','invoice_id','amount','match_status'],[[f'=Payments!A{r}',f'=Payments!B{r}',f'=Payments!C{r}',f'=IF(COUNTIF(Invoices!$A$2:$A$9,B{r})=0,"ORPHAN","MATCHED")' if answer else None] for r in range(2,12)])
    dash=sheet(wb,'Analysis',['Control / metric','Amount / answer'],[['Invoice total','=SUM(Invoices!C2:C9)' if answer else None],['Allocated payments','=SUM(Prepared!C2:C9)' if answer else None],['Net outstanding','=SUM(Prepared!D2:D9)' if answer else None],['Reconciliation difference','=B2-B3-B4' if answer else None],['Source payments','=SUM(Payments!C2:C11)' if answer else None],['Orphan payment amount','=SUMIF(\'Payment checks\'!D2:D11,"ORPHAN",\'Payment checks\'!C2:C11)' if answer else None],['Payment reconciliation','=B6-B3-B7' if answer else None],['Gross unpaid','=SUMIF(Prepared!D2:D9,">0",Prepared!D2:D9)' if answer else None],['Overpaid amount','=-SUMIF(Prepared!D2:D9,"<0",Prepared!D2:D9)' if answer else None],['Expected controls','Invoices £10,200; allocated £9,200; net £1,000; orphan £125; overpaid £100.'],['Suggested action','Confirm INV-999 reference and INV-108 overpayment with bank evidence. Do not delete exceptions just to make totals match.']])
    for r in range(2,11):dash[f'B{r}'].number_format='£#,##0.00;[Red](£#,##0.00)'
    dash.column_dimensions['B'].width=100
    wb._sheets.remove(dash);wb._sheets.insert(1,dash)
    return wb

def business(answer):
    wb=base('Adoption-sensitive business case',['Review editable assumptions and units; identify which need real operational evidence.','For each adoption level calculate annual minutes saved, gross labor capacity value and net annual benefit after recurring license.','Calculate simple payback and 3-year undiscounted ROI; implementation is paid once. Treat nonpositive net benefit explicitly.','Chart net benefit against adoption. State whether released capacity becomes cash savings and identify a benefit owner.','Change adoption and minutes saved in a copy to verify formulas. Explain that tax, discounting and rollout timing are excluded.'],answer)
    sheet(wb,'Assumptions',['Driver','Value','Unit / provenance'],[['Monthly cases',1200,'cases/month; fictional sponsor estimate'],['Minutes saved per case',7,'minutes; validate with time study'],['Loaded labor cost',24,'GBP/hour; finance assumption'],['Implementation cost',60000,'GBP one time'],['Annual license',12000,'GBP/year recurring'],['Years',3,'undiscounted model horizon']])
    rows=[]
    for r,a in enumerate([.6,.75,.9],2):rows.append([a,f'=Assumptions!$B$2*12*Assumptions!$B$3*A{r}' if answer else None,f'=B{r}/60*Assumptions!$B$4' if answer else None,f'=C{r}-Assumptions!$B$6' if answer else None,f'=IF(D{r}>0,Assumptions!$B$5/D{r},"No payback")' if answer else None,f'=(D{r}*Assumptions!$B$7-Assumptions!$B$5)/Assumptions!$B$5' if answer else None])
    ws=sheet(wb,'Analysis',['Adoption','Annual minutes saved','Gross capacity value','Annual net benefit','Payback years','3-year ROI'],rows)
    for r in range(2,5):
        ws[f'A{r}'].number_format='0%';ws[f'F{r}'].number_format='0.00%';ws[f'E{r}'].number_format='0.00'
        for col in ['C','D']:ws[f'{col}{r}'].number_format='£#,##0.00'
    ws.append(['Interpretation','At 60%: £12,192 net/year, 4.92-year payback, -39.04% ROI. At 90%: £24,288, 2.47 years, 21.44%.'])
    ws.append(['Caution','Capacity value is not guaranteed cash savings. Excludes tax, discounting, implementation timing and speculative retention benefits.'])
    ws.append(['Benefit owner','Operations director; finance validates cost basis; weekly adoption and error-rate guardrails.'])
    ws.column_dimensions['B'].width=45
    for r in range(5,8):ws.row_dimensions[r].height=60;ws.merge_cells(start_row=r,start_column=2,end_row=r,end_column=6);ws.cell(r,2).alignment=Alignment(wrap_text=True,vertical='top')
    if answer:chart(ws,'Annual net benefit by adoption',1,4,2,4,'A10')
    wb._sheets.remove(ws);wb._sheets.insert(1,ws)
    return wb

for name,fn in [('returns-analysis',returns),('invoice-reconciliation',reconciliation),('business-case',business)]:
    for answer in [False,True]:
        wb=fn(answer);path=OUT/f'{name}-{"answers" if answer else "practice"}.xlsx';wb.save(path)
        check=load_workbook(path)
        if 'Start' not in check.sheetnames or len(check.sheetnames)<3:
            raise ValueError(f'{path.name}: expected Start and at least three worksheets')
        if any(c.data_type=='e' for ws in check for row in ws for c in row):
            raise ValueError(f'{path.name}: workbook contains spreadsheet errors')
        print(path.name,len(check.sheetnames),'sheets')
# Independent source controls.
if sum(5+(i%5)*2 for i in range(48))*24/60 != 170.4:
    raise ValueError('Returns source control failed: expected handling cost of £170.40')
if sum([1000,800,1200,1500,600,2000,1100,2000])!=10200:
    raise ValueError('Invoice source control failed: expected total of £10,200')
if sum([1000,300,500,1200,1000,600,1500,1000,2100])!=9200:
    raise ValueError('Payment source control failed: expected allocated total of £9,200')
