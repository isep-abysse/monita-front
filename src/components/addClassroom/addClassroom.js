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
            students: [],
            studentIds: [],
            classrooms: []
        };
        this.loadUsers = this.loadUsers.bind(this);
        this.loadClassrooms = this.loadClassrooms.bind(this);
        this.changeName = this.changeName.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.addClassroom = this.addClassroom.bind(this);
        this.createClassroom = this.createClassroom.bind(this);
        this.loadClassrooms();
        this.loadUsers()
    }

    async loadClassrooms() {
        const classrooms = await classroomService.getEverything();
        this.setState({classrooms: classrooms})
    }

    async loadUsers() {
        const users = await userService.getAll();
        this.setState({options: users});
    }

    async loadIds() {
        return this.state.students.map((e, key) => {
            return e.id;
        });
    }

    changeName(e) {
        this.setState({name: e.target.value})
    }

    addStudent(e) {
        const elem = JSON.parse(e.target.value);
        this.setState((prevState) => ({
            students: [...prevState.students, elem]
        }));
    }

    addClassroom(e) {
        const elem = JSON.parse(e.target.value);
        console.log(elem);
        const updatedClassroom = elem;
        const teacherId = this.state.currentUser.id;
        updatedClassroom.teachers.push(teacherId);
        console.log(updatedClassroom);
        classroomService.update(updatedClassroom)
    }

    async createClassroom(e) {
        e.preventDefault();
        const studentIds = await this.loadIds();
        this.setState({studentIds: studentIds});
        const teacherId = [this.state.currentUser.id];
        classroomService.create(this.state.name, teacherId, this.state.studentIds)
    }

    render() {
        return (
            <div>
                <h2>Choissez une classe</h2>
                <form>
                    <select name="classrooms" value=' ' onChange={this.addClassroom}>
                        <option value=' '> </option>
                        {this.state.classrooms.map((e, key) => {
                            return <option key={key} value={JSON.stringify(e)}>{e.name}</option>
                        })}
                    </select>
                    {/*<input type="submit" value="Ajouter"/>*/}
                </form>
                <br/>
                <hr/>
                <br/>
                <h2>Ajoutez une classe</h2>
                <form onSubmit={this.createClassroom}>
                    <input name="name" type="text" placeholder="Nom de la classe" onChange={this.changeName}/>
                    Étudiants: <select name="students" value=' ' onChange={this.addStudent}>
                        <option value=' '> </option>
                        {this.state.options.map((e, key) => {
                            return <option key={key} value={JSON.stringify(e)}>{e.firstName}</option>
                        })}
                    </select>
                    <ul>
                    {this.state.students.map((e, key) => {
                        return <li key={key}>{e.firstName}</li>
                    })}
                    </ul>
                    <input type="submit" value="Ajouter"/>
                </form>
            </div>
        )
    }
}

export default AddClassroom