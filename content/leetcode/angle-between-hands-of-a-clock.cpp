class Solution {
public:
    double angleClock(int hour, int minutes) {
        double angle = fabs((hour % 12) * 30 + minutes * 0.5 - minutes * 6);
        return min(angle, 360 - angle);
    }
};
