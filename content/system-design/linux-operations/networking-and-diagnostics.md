Debug network failures from the application outward.
First confirm the destination and port, then name resolution, route selection, local firewall policy, remote reachability, and protocol behavior.

## Useful observations

`ss` or `netstat` shows listeners and connections, `dig` or `getent` checks name resolution, and `curl` can test an HTTP path with headers and timing.
Packet captures are powerful but should be scoped by interface, host, and port to avoid collecting unnecessary sensitive data.

## Remote access

SSH keys, host verification, least-privilege accounts, and restricted forwarding reduce the blast radius of remote administration.
Avoid putting secrets in command arguments or shell history.
