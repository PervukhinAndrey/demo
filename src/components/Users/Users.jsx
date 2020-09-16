import React, {Fragment, useState} from 'react';
import s from './Users.module.css';
import {Field, Form} from "react-final-form";


const Users = ({users, addUser,updateUser, ...props}) => {
    const  [displayUserForm,setDisplayUserForm]=useState(false)
    const  [actionType,setActionType]=useState(true)  //true:add, false:update
    const  [userIdForUpdate,setUserIdForUpdate]=useState('')
    const onAddNewUser=()=>{
        setActionType(true);
        setDisplayUserForm(true);
    }

    return (
        <div className={s.user}>

            <div  className={s.leftSection}>
                <table>
                    <tbody>
                    {users.map((u) => <UserRoleInformation
                        {...props} {...u}
                        setActionType={setActionType} setDisplayUserForm={setDisplayUserForm}
                        setUserIdForUpdate={setUserIdForUpdate}  key={u.userId}/>)}
                    </tbody>
                </table>
                <button onClick={onAddNewUser} className={s.addNewUserButton}>Add New User</button>
            </div>
            <div className={displayUserForm?s.rightSection:s.hidden}>
                <UserForm  setDisplayUserForm={setDisplayUserForm} actionUser={actionType?addUser:updateUser}
                           userIdForUpdate={userIdForUpdate}/>
            </div>
        </div>
    )
}

const UserRoleInformation = ({
                                 userId, userName, userRole, delUser,
                                 setActionType,setDisplayUserForm,setUserIdForUpdate}) => {

    const onClickDelete = () => {
        delUser(userId);
    }
    const onClickChange = () => {
        setActionType(false);
        setUserIdForUpdate(userId)
        setDisplayUserForm(true);
    }
    return (
        <Fragment>
            <tr>
                <td>{userName}</td>
                <td>{userRole}</td>
                <td>
                    <button onClick={onClickDelete}>Delete</button>
                </td>
                <td>
                    <button onClick={onClickChange}>Change</button>
                </td>

            </tr>
        </Fragment>
    )
}
const UserForm = ({actionUser,setDisplayUserForm,userIdForUpdate}) => {

    const onSubmit = (values) => {
        actionUser(values.userName, values.userRole,userIdForUpdate);
        setDisplayUserForm(false)
    }
    return (
        <div className={s.userForm}>
            <Form
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {}
                    if (!values.userName) {
                        errors.userName = 'Required'
                    }
                    if (!values.userRole) {
                        errors.userRole = 'Required'
                    }

                    return errors
                }}
                render={({
                             submitError,
                             handleSubmit,
                             submitting, form
                         }) => (
                    <form onSubmit={
                        async (event) => {
                            const error = await handleSubmit(event);
                            console.log('Error not in resolved promise', error);
                            if (error) {
                                return error;
                            }
                            form.reset();

                        }
                    } className={s.form}>

                        <div className={s.formFields}>
                            <label className={s.formLabel}>User Name</label>
                            <Field name="userName">
                                {({input, meta}) => (
                                    <div>

                                        <input {...input} type="text" placeholder="Enter your name"/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <div className={s.formFields}>
                            <label className={s.formLabel}>User Role</label>

                            <Field name="userRole" component="select">


                                <option/>
                                <option value="admin">admin</option>
                                <option value="user">user</option>
                                <option value="guest">guest</option>
                            </Field>

                        </div>

                        <button type="submit" disabled={submitting} className={s.submit}>
                            Submit
                        </button>

                    </form>
                )}
            />
        </div>
    )
}

export default Users;