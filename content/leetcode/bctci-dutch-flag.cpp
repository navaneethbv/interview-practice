class Solution {
public:
    void dutchFlagSort(vector<char>& arr) {
        int red = 0, current = 0, blue = (int)arr.size() - 1;
        while (current <= blue) {
            if (arr[current] == 'R') {
                swap(arr[red++], arr[current++]);
            } else if (arr[current] == 'B') {
                swap(arr[current], arr[blue--]);
            } else {
                current++;
            }
        }
    }
};
