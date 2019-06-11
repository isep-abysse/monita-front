import React from "react";
import {classroomService} from "../../services/classroomService";
import './classroom.css'
import {Link} from "react-router-dom";
import {userService} from "../../services/userService";

class Classroom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        const teacherSubject = this.state.classroom.teacher.subject;
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
        const { classroom, students, averages } = this.state;
        return(
            <div>
                <Link to={`/`}>Retour</Link>
                <h1>Classe {classroom.name}</h1>
                <section>
                    <div>
                        <Link to={`/add/${classroom.id}`}>Entrer des notes</Link>
                    </div>
                    <div>
                        <p>Définir les modalités de rattrapage</p>
                    </div>
                </section>
                <h2>Étudiants: </h2>
                <ul>
                    {students.map((e, key) => {
                        console.log(e);
                        return <li key={key}>
                            <Link to={`/student/${e.id}`}>
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