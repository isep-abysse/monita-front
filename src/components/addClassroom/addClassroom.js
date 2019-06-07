import React from "react";
import {classroomService} from "../../services/classroomService";
import {authService} from "../../services/authService";
import {userService} from "../../services/userService";

class AddClassroom extends React.Component {

    constructor(props) {
        super (props);
        this.state = {
            options: [],
            currentUser: authService.currentUserValue,
            name: "",
            students: []
        };
        this.loadUsers = this.loadUsers.bind(this);
        this.changeName = this.changeName.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.createClassroom = this.createClassroom.bind(this);
        this.loadUsers()
    }

    async loadUsers() {
        const users = await userService.getAll();
        this.setState({options: users});
    }

    createClassroom(e) {
        e.preventDefault();
        classroomService.create(this.state.name, this.state.currentUser, this.state.students)
    }

    changeName(e) {
        this.setState({name: e.target.value})
    }

    addStudent(e) {
        const elem = e.target.value;
        console.log(JSON.parse(elem));
        this.setState((prevState) => ({
            students: [...prevState.students, JSON.parse(elem)]
        }));
    }

    render() {
        return (
            <div>
                <h2>Ajoutez une classe</h2>
                <form onSubmit={this.createClassroom}>
                    <input name="name" type="text" onChange={this.changeName}/>
                    <select name="students" value=' ' onChange={this.addStudent}>
                        <option value=' '> </option>
                        {this.state.options.map((e, key) => {
                            return <option key={key} value={JSON.stringify(e)}>{e.email}</option>
                        })}
                    </select>
                    <ul>
                    {this.state.students.map((e, key) => {
                        return <li key={key}>{e.email}</li>
                    })}
                    </ul>
                    <input type="submit" value="Ajouter"/>
                </form>
            </div>
        )
    }
}

export default AddClassroom