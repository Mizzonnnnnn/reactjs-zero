import React from "react";


class Userinfor extends React.Component {
    state = {
        name: "Mizzon",
        age: 19,
        address: "HCM"
    }
    handleClick(event) {
        console.log("Click me my button")
        console.log("Random ", Math.floor((Math.random() * 100) + 1))

        // merge state => react class
        this.setState({
            name: "Toan",
            age: Math.floor((Math.random() * 100) + 1)
        })
    }
    handleOnMoverOver(event) {
        console.log(event.pageX)
    }

    handleOnchangeInput = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleOnchangeAge = (event) => {
        //bad code
        //this.state.age = event.target.value
        this.setState({
            age: event.target.value
        })
    }

    handleOnsubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }
    render() {
        {
            return (
                <div>
                    My name is {this.state.name} and I'm {this.state.age}
                    <label>Your Name: </label>
                    <form onSubmit={(event) => this.handleOnsubmit(event)}>
                        <input
                            value={this.state.name}
                            type="text"
                            onChange={(event) => this.handleOnchangeInput(event)}
                        />
                        <button>Submit</button>

                        <input
                            value={this.state.age}
                            type="text"
                            onChange={(event) => this.handleOnchangeAge(event)}
                        />
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default Userinfor