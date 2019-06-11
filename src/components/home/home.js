import React from 'react';

import { authService } from '../../services/authService';
import { Link } from "react-router-dom";
import {classroomService} from "../../services/classroomService";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authService.currentUserValue,
            classrooms: []
        };
        console.log('component constructed');
        console.log(this.state.currentUser);
        this.getClasses = this.getClasses.bind(this)
    }

    componentDidMount() {
        console.log('component did mount');
        if (this.state.currentUser.role === 'prof') {
            this.getClasses();
        }
    }

    async getClasses() {
        const classrooms = await classroomService.getAll(this.state.currentUser.id);
        console.log(classrooms);
        this.setState({classrooms: classrooms});
        return classrooms
    }

    render() {
        const { currentUser, classrooms } = this.state;
        return (
                <div>
                    {currentUser.role === 'student' &&
                    <div>
                        <h1>Votre relevé de notes!</h1>
                        <ul>
                            {currentUser.subjects.map((e, key) => {
                                return <li key={key}>
                                    <Link to={{pathname: `/subjects/${e.name}`, state: {currentUser: currentUser}}}>
                                        {e.name}
                                    </Link>
                                    <p>Moyenne : {e.average}</p>
                                </li>
                            })}
                        </ul>
                    </div>
                    }
                    {currentUser.role === 'prof' &&
                    <div>
                        <h1>Vos classes!</h1>
                        <ul>
                            {classrooms.map((e, key) => {
                                return <li key={key}><Link to={`/classroom/${e.id}`}>{e.name}</Link></li>
                            })}
                        </ul>
                        <Link to="/addClassroom">Ajouter une classe</Link>
                    </div>
                    }
                </div>
        );
    }
}

export default Home;