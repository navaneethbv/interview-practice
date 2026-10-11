class LRUCache {
    int capacity;
    list<pair<int, int>> order;
    unordered_map<int, list<pair<int, int>>::iterator> index;

public:
    LRUCache(int capacity) : capacity(capacity) {}

    int get(int key) {
        auto it = index.find(key);
        if (it == index.end()) return -1;
        order.splice(order.begin(), order, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = index.find(key);
        if (it != index.end()) {
            it->second->second = value;
            order.splice(order.begin(), order, it->second);
            return;
        }
        order.emplace_front(key, value);
        index[key] = order.begin();
        if ((int)order.size() > capacity) {
            index.erase(order.back().first);
            order.pop_back();
        }
    }
};
