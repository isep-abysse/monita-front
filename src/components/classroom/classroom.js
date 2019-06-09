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
            students: []
        };
        this.getClassroom = this.getClassroom.bind(this)
    }

    componentDidMount() {
        this.getClassroom()
    }

    async getClassroom() {
        const id = this.state.classroomId;
        const classroom = await classroomService.get(id);
        this.setState({classroom: classroom});
        for (let i = 0; i < classroom.students.length; i++) {
            const student = await userService.get(classroom.students[i]);
            this.setState((prevState) => ({
                students: [...prevState.students, student]
            }));
        }
    }

    render() {
        const { classroom, students } = this.state;
        return(
            <div>
                <h2>Classe {classroom.name}</h2>
                <section>
                    <div>
                        <Link to={`/classroom/add/${classroom.id}`}>Entrer des notes</Link>
                    </div>
                    <div>
                        <p>Définir les modalités de rattrapage</p>
                    </div>
                </section>
                <h3>Étudiants: </h3>
                <ul>
                    {students.map((e, key) => {
                        console.log(e);
                        return <li key={key}>{e.firstName}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Classroom