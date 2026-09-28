The filesystem is a namespace of files, directories, links, devices, and sockets with ownership and access controls.
Permissions are evaluated for the effective user and group, so a command that works interactively may fail under a service account.

## Access decisions

Check ownership with `ls -l` or `stat` and check the parent directories as well as the target file.
The execute bit on a directory controls traversal, which is why a readable file can still be inaccessible.
Use the narrowest account, group, and permission set that supports the task.

## Administrative boundaries

Privilege escalation should be short-lived and explainable.
Avoid making a file world-writable to fix a permissions error.
Record which identity owns generated files and which service needs to read or write them.
