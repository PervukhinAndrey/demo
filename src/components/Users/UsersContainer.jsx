import {connect} from "react-redux";
import React from "react";
import Users from './Users'
import {
    addUserThunkCreator, getUsersThunkCreator,
    delUserThunkCreator,updateThunkCreator
} from "../../redux/usersReducer";


class ApiUsersComponent extends React.PureComponent {
    componentDidMount() {
        this.props.getUsersThunkCreator();
    }
    render() {

        return <Users users={this.props.users}
                      addUser={this.props.addUserThunkCreator}
                      delUser={this.props.delUserThunkCreator}
                      updateUser={this.props.updateThunkCreator}

        />
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
    }
}


const UsersContainer = connect(
    mapStateToProps,
    {getUsersThunkCreator, addUserThunkCreator, delUserThunkCreator,updateThunkCreator}
)(ApiUsersComponent);
export default UsersContainer;