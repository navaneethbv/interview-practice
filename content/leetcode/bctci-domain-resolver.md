# Domain Resolver

A hosting server has several IPs, each IP can host several domains, and each domain can have subdomains.
Implement `DomainResolver`:

- `register_domain(ip, domain)` associates `domain` with `ip`; each domain is registered at most once.
- `register_subdomain(domain, subdomain)` adds a subdomain to an already registered domain.
- `has_subdomain(ip, domain, subdomain)` returns whether `domain` is registered at `ip` and has `subdomain`.

Java method names are camelCase.
Construct one instance per test and run the operations in order; registrations produce null.

## Examples

### Example 1

```text
Input: ops = ["register_domain", "register_subdomain", "has_subdomain", "has_subdomain"], args = [["1.1.1.1", "test.com"], ["test.com", "www"], ["1.1.1.1", "test.com", "www"], ["1.1.1.2", "test.com", "www"]]
Output: [null, null, true, false]
```

### Example 2

```text
Input: ops = ["has_subdomain"], args = [["1.1.1.1", "test.com", "www"]]
Output: [false]
```

## Constraints

- At most `10^5` registrations and `10^5` queries.
