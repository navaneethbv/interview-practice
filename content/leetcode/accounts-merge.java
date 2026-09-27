class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        Map<String, String> parent = new HashMap<>();
        Map<String, Integer> componentSize = new HashMap<>();
        Map<String, String> accountNames = new HashMap<>();
        for (List<String> account : accounts) {
            String name = account.get(0);
            for (int index = 1; index < account.size(); index++) {
                String email = account.get(index);
                parent.putIfAbsent(email, email);
                componentSize.putIfAbsent(email, 1);
                accountNames.put(email, name);
                String firstEmail = account.get(1);
                union(parent, componentSize, email, firstEmail);
            }
        }
        Map<String, List<String>> groups = new HashMap<>();
        for (String email : parent.keySet()) {
            String root = find(parent, email);
            groups.computeIfAbsent(root, ignored -> new ArrayList<>()).add(email);
        }
        List<List<String>> mergedAccounts = new ArrayList<>();
        for (Map.Entry<String, List<String>> group : groups.entrySet()) {
            List<String> emails = group.getValue();
            Collections.sort(emails);
            List<String> account = new ArrayList<>();
            account.add(accountNames.get(group.getKey()));
            account.addAll(emails);
            mergedAccounts.add(account);
        }
        return mergedAccounts;
    }

    private void union(Map<String, String> parent, Map<String, Integer> componentSize,
                       String firstEmail, String secondEmail) {
        String firstRoot = find(parent, firstEmail);
        String secondRoot = find(parent, secondEmail);
        if (firstRoot.equals(secondRoot)) {
            return;
        }
        if (componentSize.get(firstRoot) > componentSize.get(secondRoot)) {
            String temporary = firstRoot;
            firstRoot = secondRoot;
            secondRoot = temporary;
        }
        parent.put(firstRoot, secondRoot);
        componentSize.put(secondRoot, componentSize.get(firstRoot) + componentSize.get(secondRoot));
    }

    private String find(Map<String, String> parent, String email) {
        String root = email;
        while (!parent.get(root).equals(root)) {
            root = parent.get(root);
        }
        while (!parent.get(email).equals(email)) {
            String nextEmail = parent.get(email);
            parent.put(email, root);
            email = nextEmail;
        }
        return root;
    }
}
