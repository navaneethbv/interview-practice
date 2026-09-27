class Solution {
public List<String> crawl(String startUrl,HtmlParser htmlParser) {
    String host=java.net.URI.create(startUrl).getHost();Set<String> seen=java.util.concurrent.ConcurrentHashMap.newKeySet();seen.add(startUrl);
    java.util.concurrent.ExecutorService workers=java.util.concurrent.Executors.newFixedThreadPool(4);
    try {
        List<String> level=new ArrayList<>();level.add(startUrl);
        while(!level.isEmpty()) {
            List<java.util.concurrent.Future<List<String>>> futures=new ArrayList<>();
            for(String url:level) futures.add(workers.submit(()->htmlParser.getUrls(url)));
            List<String> next=new ArrayList<>();
            for(java.util.concurrent.Future<List<String>> future:futures) for(String url:future.get()) if(host.equals(java.net.URI.create(url).getHost())&&seen.add(url)) next.add(url);
            level=next;
        }
        return new ArrayList<>(seen);
    }catch(Exception e) {throw new RuntimeException(e);}finally {workers.shutdownNow();}
}
}
