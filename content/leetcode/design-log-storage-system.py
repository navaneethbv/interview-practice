class LogSystem:
    def __init__(self):self.logs=[]
    def put(self,id,timestamp):self.logs.append((id,timestamp))
    def retrieve(self,start,end,granularity):
        length={'Year':4,'Month':7,'Day':10,'Hour':13,'Minute':16,'Second':19}[granularity]
        return [id for id,t in self.logs if start[:length]<=t[:length]<=end[:length]]
