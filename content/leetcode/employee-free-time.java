class Solution {
public List<Interval> employeeFreeTime(List<List<Interval>> schedule){List<Interval>all=new ArrayList<>();for(List<Interval>row:schedule)all.addAll(row);all.sort(Comparator.comparingInt(i->i.start));List<Interval>out=new ArrayList<>();int end=all.get(0).end;for(Interval i:all){if(i.start>end)out.add(new Interval(end,i.start));end=Math.max(end,i.end);}return out;}
}
