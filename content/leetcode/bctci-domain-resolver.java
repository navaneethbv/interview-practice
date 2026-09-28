class DomainResolver {
    private final Map<String, Set<String>> domainsAt = new HashMap<>();
    private final Map<String, Set<String>> subdomains = new HashMap<>();

    public void registerDomain(String ip, String domain) {
        domainsAt.computeIfAbsent(ip, key -> new HashSet<>()).add(domain);
        subdomains.computeIfAbsent(domain, key -> new HashSet<>());
    }

    public void registerSubdomain(String domain, String subdomain) {
        subdomains.get(domain).add(subdomain);
    }

    public boolean hasSubdomain(String ip, String domain, String subdomain) {
        return domainsAt.getOrDefault(ip, Set.of()).contains(domain)
                && subdomains.getOrDefault(domain, Set.of()).contains(subdomain);
    }
}
