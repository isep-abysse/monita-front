import React from "react";
import {classroomService} from "../../services/classroomService";
import {userService} from "../../services/userService";

class AddMarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classroomId: props.match.params.id,
            classroom: {},
            students: []

        };
        this.getClassroom = this.getClassroom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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

    handleSubmit(e) {
        e.preventDefault();
        const subjectName = this.state.classroom.teacher.subject;
        let coefficient = 0;
        // body.subject = subject;

        for (let i = 0; i < this.state.students.length + 2; i++) {
            if (i === 0) {
                console.log('type : ' + e.target[i].value);
                // body.type = e.target[i].value
            } else if(i === 1) {
                console.log(`coeff : ${e.target[i].valueAsNumber}`);
                coefficient = e.target[i].valueAsNumber;
                // body.coefficient = e.target[i].valueAsNumber
            } else {
                console.log(`${this.state.students[i - 2].firstName} : ${e.target[i].valueAsNumber}`);
                // Get mark
                const markValue = e.target[i].valueAsNumber;

                // Get user
                let user = this.state.students[i - 2];
                console.log(user);

                // Get user subjects and add new subject
                if (user.subjects !== null) {
                    for (let i = 0; i < user.subjects.length; i++) {
                        console.log(user.subjects[i].name);
                        if (user.subjects[i].name === subjectName) {
                            if (user.subjects[i].marks !== null) {
                                const newMark = {
                                    value: markValue,
                                    coefficient: coefficient
                                };
                                let newMarks = user.subjects[i].marks.slice();
                                newMarks.push(newMark);
                                user.subjects[i].marks = newMarks;
                                userService.addMarks(user)
                            } else {
                                user.subjects[i].marks = [{
                                    value: markValue,
                                    coefficient: coefficient
                                }];
                                userService.addMarks(user)

                            }
                        }
                    }
                } else { // New subject
                    let subject = {
                        name: subjectName,
                        marks: [{
                            value: markValue,
                            coefficient: coefficient
                        }]
                    };
                    user.subjects = [subject];
                    userService.addMarks(user)
                }
            }
        }
    }

    render() {
        const { students } = this.state;
        return (
            <div>
                <h1>Ajouter des notes</h1>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <input name="type" type="text" placeholder="Type (ex: DS)"/>
                        <input name="coefficient" type="number" placeholder="Coefficient"/>
                        {students.map((e, key) => {
                            return <li key={key}>{e.firstName}<input name="mark" type="number" placeholder="Note"/></li>
                        })}
                    </ul>
                    <input type="submit" value="Entrer"/>
                </form>
            </div>
        )
    }
}

export default AddMarks