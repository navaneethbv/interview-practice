class Solution:
    def getImportance(self, employees, id):
        employees_by_id = {employee.id: employee for employee in employees}
        pending_ids = [id]
        total_importance = 0
        while pending_ids:
            employee = employees_by_id[pending_ids.pop()]
            total_importance += employee.importance
            pending_ids.extend(employee.subordinates)
        return total_importance
