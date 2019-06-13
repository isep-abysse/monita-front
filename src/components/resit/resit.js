import React from "react";
import {authService} from "../../services/authService";
import {classroomService} from "../../services/classroomService";
import {userService} from "../../services/userService";

class Resit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.currentUserValue,
            classroomId: props.match.params.id,
            oldResit: "",
            resit: ""
        };
        this.changeResit = this.changeResit.bind(this);
        this.addResit = this.addResit.bind(this);
        this.loadResit = this.loadResit.bind(this);
        this.loadResit()
    }

    async loadResit() {
        const classroom = await classroomService.get(this.state.classroomId);
        const student = await userService.get(classroom.students[0]);
        const subject = this.state.currentUser.subject;
        for (let i = 0; i < student.subjects.length; i++) {
            if (student.subjects[i].name === subject) {
                if (student.subjects[i].resit !== "") {
                    this.setState({oldResit: student.subjects[i].resit})
                }
            }
        }

    }

    changeResit(e) {
        this.setState({resit: e.target.value})
    }

    async addResit(e) {
        e.preventDefault();
        const resit = this.state.resit;
        const subject = this.state.currentUser.subject;
        const classroom = await classroomService.get(this.state.classroomId);
        for (let i = 0; i < classroom.students.length; i++) {
            const student = await userService.get(classroom.students[i]);
            for (let j = 0; j < student.subjects.length; j++) {
                if (student.subjects[j].name === subject) {
                    student.subjects[j].resit = resit;
                    userService.update(student)
                }
            }
        }
        window.location.reload()
    }

    render() {
        const {currentUser, oldResit} = this.state;
        return (
            <div>
                <h1>Rattrapages - {currentUser.subject}</h1>
                <hr/>
                <br/>
                {oldResit !== "" &&
                    <div>
                        <h2>Modalité de rattrapage</h2>
                        <p>{oldResit}</p>
                        <hr/>
                        <br/>
                    </div>
                }
                <div>
                    <h2>Modifier</h2>
                    <form onSubmit={this.addResit}>
                        <textarea className="" placeholder="Entrez les modalités de rattrapage" onChange={this.changeResit}>

                        </textarea>
                        <input type="submit" value="Sauvegarder"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Resit