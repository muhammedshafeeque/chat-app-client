export const getSender=(loggedUser,users)=>{
    return users[0].userId===loggedUser.id?users[1].name:users[0].name
}