Estimation gives the design a scale vocabulary.
Start with active users, requests per user, peak-to-average ratio, payload size, retention, and replication factor.
Convert those assumptions into requests per second, storage per day, bandwidth, and the number of machines or partitions implied by the load.

## Use ranges

An order-of-magnitude estimate is usually more useful than false precision.
Show the multiplication so an assumption can be changed without restarting the calculation.
Include headroom for bursts, indexes, replicas, migrations, and background work.

## Let the estimate choose the next detail

If one database comfortably handles the first scale, keep the design simple and explain when partitioning becomes necessary.
If a single dependency is already a bottleneck, make its partitioning, caching, or asynchronous path explicit early.
