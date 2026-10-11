SELECT user_id, name, mail FROM Users
WHERE mail GLOB '[a-zA-Z]*@leetcode.com'
  AND SUBSTR(mail, 1, LENGTH(mail) - 13) NOT GLOB '*[^a-zA-Z0-9_.-]*';
