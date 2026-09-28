Notification systems combine user preferences, fanout, retries, delivery providers, and feedback about success or failure.
Use templates and idempotency keys so a retry does not send the same notification repeatedly.

For feeds, decide whether new posts are pushed into follower timelines or assembled when a reader opens the feed.
Push reduces read work but makes high-follower accounts expensive, while pull avoids large fanout but increases read cost.
A hybrid policy can treat ordinary and celebrity accounts differently.

Chat systems need durable message identity, ordering scope, online presence, reconnect behavior, and delivery semantics.
Do not promise global ordering when the product only needs ordering within one conversation.
