import React from "react";
import {Link} from "react-router-dom";
import {authService} from "../../services/authService";
import {userService} from "../../services/userService";
import "./student.css"

class Student extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.currentUserValue,
            classroomId: props.match.params.classroomId,
            studentId: props.match.params.id,
            student: {},
            marks: [],
            newValue: 0,
            newCoef: 0,
            newType: '',
            newComment: ''
        };
        this.getMarks = this.getMarks.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeCoef = this.changeCoef.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.submitMark = this.submitMark.bind(this)
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

    changeValue(e) {
        const value = e.target.valueAsNumber;
        this.setState({newValue: value})
    }

    changeCoef(e) {
        const value = e.target.valueAsNumber;
        this.setState({newCoef: value})
    }

    changeType(e) {
        const value = e.target.value;
        this.setState({newType: value})
    }

    changeComment(e) {
        const value = e.target.value;
        this.setState({newComment: value})
    }



    submitMark(e) {
        e.preventDefault();
        const pos = e.target.id;
        let student = this.state.student;
        for (let i = 0; i < student.subjects.length; i++) {
            if (student.subjects[i].name === this.state.currentUser.subject) {
                let mark = student.subjects[i].marks[pos];
                mark.value = this.state.newValue;
                mark.coef = this.state.newCoef;
                mark.type = this.state.newType;
                mark.comment = this.state.newComment;
                userService.update(student)
            }
        }
    }

    render() {
        const { student, marks, classroomId } = this.state;
        return(
            <div>
                <Link to={`/classroom/${classroomId}`}>Retour</Link>
                <h1>Notes de l'élève {student.firstName}</h1>
                <hr/>
                <br/>
                <ul>
                    {marks.map((e, key) => {
                        return <li key={key}>
                            <form id={key} onSubmit={this.submitMark}>
                                Note: <input type="number" className="small-input" placeholder={e.value} onChange={this.changeValue}/>/20
                                | Coefficient: <input type="number" className="small-input" placeholder={e.coefficient} onChange={this.changeCoef}/><br/>
                                Type: <input type="text" placeholder={e.type} onChange={this.changeType}/><br/>
                                Commentaire: <input id={key} type="text" placeholder={e.comment} onChange={this.changeComment}/><br/>
                                <input type="submit" value="Sauvegarder"/>
                            </form>
                            <hr/>
                            <br/>
                        </li>
                    })}
                </ul>
            </div>
        )
    }

}

export default Student