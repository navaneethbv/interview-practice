from urllib.parse import urlsplit


class Solution:
    def crawl(self, startUrl, htmlParser):
        hostname = urlsplit(startUrl).hostname
        seen = {startUrl}
        pending = [startUrl]
        for url in pending:
            for linked in htmlParser.getUrls(url):
                if urlsplit(linked).hostname == hostname and linked not in seen:
                    seen.add(linked)
                    pending.append(linked)
        return pending
