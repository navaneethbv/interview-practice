class MyHashMap:
    def __init__(self):self.buckets=[[] for _ in range(1009)]
    def put(self,key,value):
        bucket=self.buckets[key%1009]
        for pair in bucket:
            if pair[0]==key:pair[1]=value;return
        bucket.append([key,value])
    def get(self,key):
        for k,v in self.buckets[key%1009]:
            if k==key:return v
        return -1
    def remove(self,key):
        bucket=self.buckets[key%1009]
        for i,pair in enumerate(bucket):
            if pair[0]==key:bucket.pop(i);return
