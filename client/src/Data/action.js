const SetUser = "SetCurrentUsername" //For Sign IN
const AddUserToArray = "AddCurrentUserToArrayOfUser" //For Log IN Later
const SetUserUndefind = "SetCurrentUserToUndefind" //For Log Out
const ChangePassword = "ChangePassword"

const CreatePost = "CreatingNewPost"

const setUser = () =>({type:SetUser})
const addUserToArray = () =>({type:AddUserToArray})
const setUserUndefind = () => ({type:SetUserUndefind})
const changePassword = () =>({type:ChangePassword})
const createPost = () =>({type:CreatePost})

export{
    SetUser,
    AddUserToArray,
    SetUserUndefind,
    ChangePassword,
    CreatePost,
    setUser,
    addUserToArray,
    setUserUndefind,
    changePassword,
    createPost
}