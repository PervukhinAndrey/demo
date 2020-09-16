import {userApi} from "../api/api";


const SET_USERS = 'SET_USERS';
const CHANGE_USER = 'CHANGE_USER';
const ADD_USER = 'ADD_USER';
const DEL_USER = 'DEL_USER';


let initialState = {
    users: []
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USERS: {
            return {
                ...state, users: action.users
            };
        }
        case ADD_USER: {
            return {
                ...state, users: [...state.users, action.newUser]
            };
        }
        case DEL_USER: {
            return {
                ...state, users: state.users.filter(e=>e.userId!==action.userId)
            };
        }
        case CHANGE_USER: {
            return {
                ...state, users: state.users.map(e=> {
                    if (e.userId===action.updatedUser.userId) return action.updatedUser
                    else return e
                })
            };
        }
        default: {
            return state;
        }
    }
}
export default usersReducer;



export const setUsers = (users) => ({type: SET_USERS, users});
export const addUser = ({userId,userName,userRole}) => ({type: ADD_USER, newUser:{userId,userName,userRole}});
export const delUser = (userId) => ({type: DEL_USER, userId});
export const updateUser = (updatedUser) => ({type: CHANGE_USER, updatedUser});



export const getUsersThunkCreator = () => async (dispatch) => {
    let data = await userApi.getUsers();
    dispatch(setUsers(data));
}

export const addUserThunkCreator = (userName, userRole) => async (dispatch) => {
    let id = await userApi.addUser(userName, userRole);
    if (id)  dispatch(addUser({userId:id,userName,userRole}));
}
export const delUserThunkCreator = (userId) => async (dispatch) => {
    let result = await userApi.delUser(userId);
    if (result===4) dispatch(delUser(userId));
}

export const updateThunkCreator = (userName, userRole,userId) => async (dispatch) => {
    let result = await userApi.updateUser(userId,userName, userRole);
    if (result===9) dispatch(updateUser({userId,userName, userRole}));
}
