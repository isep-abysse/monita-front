import React from "react";
import {authService} from "../../services/authService";
import {Link} from "react-router-dom";

class Subject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authService.currentUserValue,
            subject: props.match.params.subject,
            marks: []
        };
        console.log(this.state.currentUser);
    }

    componentDidMount() {
        for (let i = 0; i < this.state.currentUser.subjects.length; i++) {
            if (this.state.currentUser.subjects[i].name === this.state.subject) {
                for (let j = 0; j < this.state.currentUser.subjects[i].marks.length; j++) {
                    const newMark = this.state.currentUser.subjects[i].marks[j];
                    this.state.marks.push(newMark)
                }
            }
        }
    }

    render() {
        const { marks, subject } = this.state;
        return(
            <div>
                <Link to={`/`}>Retour</Link>
                <h1>Notes de la matière {subject}</h1>
                <ul>
                    {marks.map((e, key) => {
                        return <li key={key}>{e.value}</li>
                    })}
                </ul>
            </div>
        )
    }

}

export default Subject