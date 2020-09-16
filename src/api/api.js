export const userApi = {
    getUsers() {
        return testData
    },
    delUser(userId){
     return 4
    },
    addUser(userName, userRole){
        return Math.random().toString(16).slice(2)
    },
    updateUser(userId,userName, userRole){
        return 9
    }
}


const testData = [
    {userId: 1, userName: "Test1", userRole: "admin"},
    {userId: 2, userName: "Test2", userRole: "user"},
    {userId: 3, userName: "Test3", userRole: "guest"},
]