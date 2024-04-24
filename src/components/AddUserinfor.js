import React, { useState } from "react";


// class AddUserinfor extends React.Component {
//     state = {
//         name: "",
//         age: "",
//         address: "HCM"
//     }
//     handleClick(event) {
//         console.log("Click me my button")
//         console.log("Random ", Math.floor((Math.random() * 100) + 1))

//         // merge state => react class
//         this.setState({
//             name: "Toan",
//             age: Math.floor((Math.random() * 100) + 1)
//         })
//     }
//     handleOnMoverOver(event) {
//         console.log(event.pageX)
//     }

//     handleOnchangeInput = (event) => {
//         this.setState({
//             name: event.target.value
//         })
//     }
//     handleOnchangeAge = (event) => {
//         //bad code
//         //this.state.age = event.target.value
//         this.setState({
//             age: event.target.value
//         })
//     }

//     handleOnsubmit = (event) => {
//         event.preventDefault();

//         this.props.handleAddNewUser({
//             id: Math.floor((Math.random() * 100) + 1) + "-random",
//             name: this.state.name,
//             age: this.state.age
//         })
//     }
//     render() {
//         return (
//             <div>
//                 My name is {this.state.name} and I'm from {this.state.address}

//                 <form onSubmit={(event) => this.handleOnsubmit(event)}>
//                     <label>Your Name: </label>
//                     <input
//                         value={this.state.name}
//                         type="text"
//                         onChange={(event) => this.handleOnchangeInput(event)}
//                     />
//                     <label>Your Age: </label>
//                     <input
//                         value={this.state.age}
//                         type="text"
//                         onChange={(event) => this.handleOnchangeAge(event)}
//                     />
//                     <button>Submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

const AddUserinfor = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [address] = useState('HCM');

    const handleOnchangeInput = (event) => {
        setName(event.target.value)
    }
    const handleOnchangeAge = (event) => {
        setAge(event.target.value)
    }
    const handleOnsubmit = (event) => {
        event.preventDefault();

        props.handleAddNewUser({
            id: Math.floor((Math.random() * 100) + 1) + "-random",
            name: name,
            age: age
        })
    };

    return (
        <div>
            My name is {name} and I'm from {address}

            <form onSubmit={(event) => handleOnsubmit(event)}>
                <label>Your Name: </label>
                <input
                    value={name}
                    type="text"
                    onChange={(event) => handleOnchangeInput(event)}
                />
                <label>Your Age: </label>
                <input
                    value={age}
                    type="text"
                    onChange={(event) => handleOnchangeAge(event)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AddUserinfor