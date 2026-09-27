class Solution {
public int getImportance(List<Employee> employees,int id) {
    Map<Integer,Employee> byId=new HashMap<>();for(Employee employee:employees) byId.put(employee.id,employee);Deque<Integer> pending=new ArrayDeque<>();pending.push(id);int total=0;
    while(!pending.isEmpty()) {Employee employee=byId.get(pending.pop());total+=employee.importance;pending.addAll(employee.subordinates);}return total;
}
}
