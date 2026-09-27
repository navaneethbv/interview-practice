import json
class Codec:
    def serialize(self, root):
        def encode(n):
            return None if n is None else [n.val,[encode(c) for c in n.children]]
        return json.dumps(encode(root))
    def deserialize(self, data):
        def decode(a):
            return None if a is None else Node(a[0],[decode(c) for c in a[1]])
        return decode(json.loads(data))
