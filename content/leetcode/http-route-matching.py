class Router:
    def __init__(self):
        self.routes = {}

    def register(self, pattern):
        segments = [] if pattern == '/' else pattern[1:].split('/')
        literals = sum(not segment.startswith('{') for segment in segments)
        self.routes.setdefault(pattern, (segments, literals))

    def match(self, path):
        parts = [] if path == '/' else path[1:].split('/')
        answer, best = '', -1
        for pattern, (segments, literals) in self.routes.items():
            if len(segments) != len(parts) or literals <= best:
                continue
            if all(segment.startswith('{') or segment == value
                   for segment, value in zip(segments, parts)):
                answer, best = pattern, literals
        return answer
