class Solution {
public:
    char findTheDifference(string s, string t) {
        int code = 0;
        for (char c : t) code += c;
        for (char c : s) code -= c;
        return (char)code;
    }
};
