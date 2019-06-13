import React from "react";
import {classroomService} from "../../services/classroomService";
import {userService} from "../../services/userService";
import {authService} from "../../services/authService";
import {Link} from "react-router-dom";
import './classroom.css'

class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.currentUserValue,
            classroomId: props.match.params.id,
            classroom: {},
            students: [],
            averages: []
        };
        this.getClassroom = this.getClassroom.bind(this);
        this.getAverages = this.getAverages.bind(this)
    }

    componentDidMount() {
        this.getClassroom();
    }

    async getClassroom() {
        const id = this.state.classroomId;
        const classroom = await classroomService.get(id);
        this.setState({classroom: classroom});
        for (let i = 0; i < classroom.students.length; i++) {
            const student = await userService.get(classroom.students[i]);
            this.setState((prevState) => ({
                students: [...prevState.students, student]
            }))
        }
        this.getAverages()
    }

    getAverages() {
        const teacherSubject = this.state.currentUser.subject;
        for (let i = 0; i < this.state.students.length; i++) {
            const student = this.state.students[i];
            for (let j = 0; j < student.subjects.length; j++) {
                const subject = student.subjects[j];
                if (subject.name === teacherSubject) {
                    const average = subject.average;
                    this.setState((prevState) => ({
                        averages: [...prevState.averages, average]
                    }));
                }
            }
        }
    }

    render() {
        const { classroom, students, averages, currentUser } = this.state;
        return(
            <div>
                <Link to={`/`}>Retour</Link>
                <h1>Classe {classroom.name} - {currentUser.subject}</h1>
                <hr/>
                <br/>
                <section>
                    <div className="btn btn-primary">
                        <Link to={`/add/${classroom.id}`}>Entrer des notes</Link>
                    </div>
                    <div className="btn btn-danger">
                        <p>Définir les modalités de rattrapage</p>
                    </div>
                </section>
                <hr/>
                <br/>
                <h2>Étudiants: </h2>
                <ul>
                    {students.map((e, key) => {
                        console.log(e);
                        return <li key={key}>
                            <Link to={`/${classroom.id}/student/${e.id}`}>
                                {e.firstName}
                            </Link>
                            <p> Moyenne: {averages[key]}</p>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Classroom