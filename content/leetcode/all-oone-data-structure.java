class AllOne {
    private static class Bucket {
        int count;
        Set<String> keys = new LinkedHashSet<>();
        Bucket previous;
        Bucket next;

        Bucket(int count) {
            this.count = count;
        }
    }

    private final Bucket head = new Bucket(0);
    private final Bucket tail = new Bucket(0);
    private final Map<String, Bucket> locations = new HashMap<>();

    public AllOne() {
        head.next = tail;
        tail.previous = head;
    }

    private Bucket insertAfter(Bucket bucket, int count) {
        Bucket inserted = new Bucket(count);
        inserted.previous = bucket;
        inserted.next = bucket.next;
        bucket.next.previous = inserted;
        bucket.next = inserted;
        return inserted;
    }

    private void removeIfEmpty(Bucket bucket) {
        if (bucket != head && bucket != tail && bucket.keys.isEmpty()) {
            bucket.previous.next = bucket.next;
            bucket.next.previous = bucket.previous;
        }
    }

    public void inc(String key) {
        Bucket oldBucket = locations.getOrDefault(key, head);
        Bucket nextBucket = oldBucket.next;
        if (nextBucket == tail || nextBucket.count != oldBucket.count + 1) {
            nextBucket = insertAfter(oldBucket, oldBucket.count + 1);
        }
        nextBucket.keys.add(key);
        locations.put(key, nextBucket);
        oldBucket.keys.remove(key);
        removeIfEmpty(oldBucket);
    }

    public void dec(String key) {
        Bucket oldBucket = locations.get(key);
        if (oldBucket.count == 1) {
            locations.remove(key);
        } else {
            Bucket previousBucket = oldBucket.previous;
            if (previousBucket == head || previousBucket.count != oldBucket.count - 1) {
                previousBucket = insertAfter(oldBucket.previous, oldBucket.count - 1);
            }
            previousBucket.keys.add(key);
            locations.put(key, previousBucket);
        }
        oldBucket.keys.remove(key);
        removeIfEmpty(oldBucket);
    }

    public String getMaxKey() {
        return tail.previous == head ? "" : tail.previous.keys.iterator().next();
    }

    public String getMinKey() {
        return head.next == tail ? "" : head.next.keys.iterator().next();
    }
}
