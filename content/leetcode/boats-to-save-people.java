class Solution {
public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int lightest = 0;
    int heaviest = people.length - 1;
    int boats = 0;
    while (lightest <= heaviest) {
        if (people[lightest] + people[heaviest] <= limit) {
            lightest++;
        }
        heaviest--;
        boats++;
    }
    return boats;
}
}
