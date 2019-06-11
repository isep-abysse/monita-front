import React from "react";
import {Link} from "react-router-dom";
import {authService} from "../../services/authService";
import {userService} from "../../services/userService";

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.currentUserValue,
            studentId: props.match.params.id,
            student: {},
            marks: []
        };
        this.getMarks = this.getMarks.bind(this)
    }

    componentDidMount() {
        this.getMarks()
    }

    async getMarks() {
        const student = await userService.get(this.state.studentId);
        this.setState({student: student});
        for (let i = 0; i < student.subjects.length; i++) {
            if (student.subjects[i].name === this.state.currentUser.subject) {
                for (let j = 0; j < student.subjects[i].marks.length; j++) {
                    const newMark = student.subjects[i].marks[j];
                    this.setState((prevState) => ({
                        marks: [...prevState.marks, newMark]
                    }));
                }
            }
        }
    }

    render() {
        const { student, marks } = this.state;
        return(
            <div>
                <Link to={`/`}>Retour</Link>
                <h1>Notes de l'élève {student.firstName}</h1>
                <ul>
                    {marks.map((e, key) => {
                        return <li key={key}>
                            Note: {e.value}/20 | Coefficient: {e.coefficient} | Type: {e.type}
                            <input type="text" value={e.comment} placeholder="Entrer un commentaire"/>
                        </li>
                    })}
                </ul>
            </div>
        )
    }

}

export default Student