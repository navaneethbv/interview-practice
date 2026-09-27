class Solution {
    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<Interval> intervals = new ArrayList<>();
        for (List<Interval> employee : schedule) {
            intervals.addAll(employee);
        }
        intervals.sort(Comparator.comparingInt(interval -> interval.start));
        List<Interval> freeIntervals = new ArrayList<>();
        int mergedEnd = intervals.get(0).end;
        for (Interval interval : intervals) {
            if (interval.start > mergedEnd) {
                freeIntervals.add(new Interval(mergedEnd, interval.start));
            }
            mergedEnd = Math.max(mergedEnd, interval.end);
        }
        return freeIntervals;
    }
}
