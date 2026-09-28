class Solution {
    public int getImportance(List<Employee> employees, int id) {
        Map<Integer, Employee> employeesById = new HashMap<>();
        for (Employee employee : employees) {
            employeesById.put(employee.id, employee);
        }

        Deque<Integer> pendingIds = new ArrayDeque<>();
        pendingIds.push(id);
        int totalImportance = 0;
        while (!pendingIds.isEmpty()) {
            Employee employee = employeesById.get(pendingIds.pop());
            totalImportance += employee.importance;
            pendingIds.addAll(employee.subordinates);
        }
        return totalImportance;
    }
}
