SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET (:n - 1)) AS getNthHighestSalary;
