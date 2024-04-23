import React from "react";
import './DisplayInfor.scss';
import logo from './../logo.svg'

class Displayinfor extends React.Component {
    state = {
        isShowListUser: true
    }
    handleShowHide = () => {
        return this.setState({
            isShowListUser: !this.state.isShowListUser
        })
    }
    render() {
        //destructuring array/object
        const { listUsers } = this.props;
        // console.log(">>>> check props:: ", this.props)
        //props => viet tac properties
        return (
            <div className="display-infor-container">
                <div>
                    <span onClick={() => { this.handleShowHide() }}>
                        {this.state.isShowListUser === true ? "Hide list users" : "Show list users"}
                    </span>
                </div>
                {
                    this.state.isShowListUser &&
                    <>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={user.id} className={+user.age < 17 ? "green" : "red"}>
                                    <div>
                                        <div>My name is {user.name}</div>
                                        <div>My age is {user.age}</div>
                                    </div>

                                    <div>
                                        <button onClick={() => { this.props.handleDeleteUser(user.id) }}>de lét </button>
                                    </div>
                                </div>


                            )
                        })}
                    </>
                }
            </div>
        )
    }
}

export default Displayinfor;