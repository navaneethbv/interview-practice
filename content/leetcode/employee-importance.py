class Solution:
    def getImportance(self, employees, id):
        by_id={employee.id:employee for employee in employees}; pending=[id]; total=0
        while pending:
            employee=by_id[pending.pop()]; total+=employee.importance; pending.extend(employee.subordinates)
        return total
