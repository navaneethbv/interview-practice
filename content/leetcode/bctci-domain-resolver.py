class DomainResolver:
    def __init__(self):
        self.domains_at = {}
        self.subdomains = {}

    def register_domain(self, ip, domain):
        self.domains_at.setdefault(ip, set()).add(domain)
        self.subdomains.setdefault(domain, set())

    def register_subdomain(self, domain, subdomain):
        self.subdomains[domain].add(subdomain)

    def has_subdomain(self, ip, domain, subdomain):
        return domain in self.domains_at.get(ip, set()) and subdomain in self.subdomains.get(domain, set())
