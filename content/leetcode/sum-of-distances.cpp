class Solution {
public:
    vector<long long> distance(vector<int>& nums) {
        int n = nums.size();
        vector<long long> ans(n);
        for (int pass = 0; pass < 2; pass++) {
            unordered_map<int, pair<long long, long long>> seen;
            for (int step = 0; step < n; step++) {
                int i = pass == 0 ? step : n - 1 - step;
                auto& [count, total] = seen[nums[i]];
                ans[i] += llabs(count * i - total);
                count++;
                total += i;
            }
        }
        return ans;
    }
};
