class LogSystem:
    def __init__(self):
        self.logs = []

    def put(self, id, timestamp):
        self.logs.append((id, timestamp))

    def retrieve(self, start, end, granularity):
        prefix_length = {
            'Year': 4,
            'Month': 7,
            'Day': 10,
            'Hour': 13,
            'Minute': 16,
            'Second': 19,
        }[granularity]
        start_prefix = start[:prefix_length]
        end_prefix = end[:prefix_length]
        return [
            log_id
            for log_id, timestamp in self.logs
            if start_prefix <= timestamp[:prefix_length] <= end_prefix
        ]
