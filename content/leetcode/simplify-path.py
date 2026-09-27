class Solution:
    def simplifyPath(self, path):
        directories = []
        for part in path.split("/"):
            if part == "" or part == ".":
                continue
            if part == "..":
                if directories:
                    directories.pop()
            else:
                directories.append(part)
        return "/" + "/".join(directories)
