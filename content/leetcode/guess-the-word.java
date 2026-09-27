class Solution {
    private int matches(String a,String b){int n=0;for(int i=0;i<6;i++)if(a.charAt(i)==b.charAt(i))n++;return n;}
    public void findSecretWord(String[] words,Master master){
        List<String> possible=new ArrayList<>(Arrays.asList(words));
        while(!possible.isEmpty()){
            String chosen=possible.get(0);int best=Integer.MAX_VALUE;
            for(String word:possible){int[] buckets=new int[7];for(String other:possible)buckets[matches(word,other)]++;int worst=0;for(int n:buckets)worst=Math.max(worst,n);if(worst<best){best=worst;chosen=word;}}
            int count=master.guess(chosen);if(count==6)return;
            List<String> next=new ArrayList<>();for(String other:possible)if(matches(chosen,other)==count)next.add(other);possible=next;
        }
    }
}
