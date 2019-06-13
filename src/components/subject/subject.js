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
        this.getMarks = this.getMarks.bind(this)
    }

    componentDidMount() {
        this.getMarks()
    }

    getMarks() {
        for (let i = 0; i < this.state.currentUser.subjects.length; i++) {
            if (this.state.currentUser.subjects[i].name === this.state.subject) {
                for (let j = 0; j < this.state.currentUser.subjects[i].marks.length; j++) {
                    const newMark = this.state.currentUser.subjects[i].marks[j];
                    this.setState((prevState) => ({
                        marks: [...prevState.marks, newMark]
                    }));
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
                <hr/>
                <br/>
                <br/>
                <ul>
                    {marks.map((e, key) => {
                        return <li key={key}>
                            Note: {e.value}/20 | Coefficient: {e.coefficient} | Type: {e.type}<br/>
                            Commentaire: {e.comment}
                        <hr/>
                        </li>
                    })}
                </ul>
            </div>
        )
    }

}

export default Subject