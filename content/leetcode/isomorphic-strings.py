class Solution:
    def isIsomorphic(self, s, t):
        source_to_target = {}
        target_to_source = {}
        for source, target in zip(s, t):
            if source in source_to_target and source_to_target[source] != target:
                return False
            if target in target_to_source and target_to_source[target] != source:
                return False
            source_to_target[source] = target
            target_to_source[target] = source
        return True
