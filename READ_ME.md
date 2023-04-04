# Task Manager SQL Design
* files
  * fileId 
  * uploaderId - references users(userId)
  * name 
  * key 
  * size 
  * type 
  * createdAt 
  * updatedAt
* users 
  * userId 
  * avatarId - references files(fileId)
  * firstName 
  * lastName 
  * userName - unique
  * email - unique
  * password 
  * refreshToken 
  * createdAt 
  * updatedAt
* projects - 
  * projectId 
  * ownerId - references users(userId)
  * title 
  * description 
  * createdAt 
  * updatedAt
* members 
  * memberId 
  * projectId - references projects(projectId)
  * userId - references users(userId)
  * role(owner,admin,member) 
  * createdAt 
  * updatedAt
* tasks
  * taskId 
  * projectId - references projects(projectId)
  * title 
  * description 
  * ownerId - references users(userId) 
  * createdAt 
  * updatedAt
* comments 
  * commentId 
  * taskId - references tasks(taskId)
  * body 
  * authorId - references users(userId)
  * createdAt 
  * updatedAt
* assets 
  * assetId 
  * taskId - references tasks(taskId)
  * fileId - references files(fileId)
  * uploaderId - references users(userId)
  * title 
  * description 
  * createdAt 
  * updatedAt