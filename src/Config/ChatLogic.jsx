export const getSender=(loggedUser,users)=>{
    return users[0].userId===loggedUser.id?users[1].name:users[0].name
}
export const reciVer=(loggedUser,users)=>{
    return users[0].userId===loggedUser.id?users[1].userId:users[0].userId
}