import React from 'react';

import { authService } from '../../services/authService';
import { Link } from "react-router-dom";
import {classroomService} from "../../services/classroomService";
import './home.css'

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
                <div className="container">
                    <h1>Votre relevé de notes!</h1>
                    <hr/>
                    <br/>
                    <ul>
                        {currentUser.subjects.map((e, key) => {
                            return <div key={key} className="container-row">
                                <div className="btn btn-primary">
                                    <Link to={{pathname: `/subjects/${e.name}`, state: {currentUser: currentUser}}}>
                                        {e.name}
                                    </Link>
                                </div>
                                <p>Moyenne : {e.average}/20</p>
                            </div>
                        })}
                    </ul>
                </div>
                }
                {currentUser.role === 'prof' &&
                <div className="container">
                    <h1>Vos classes!</h1>
                    <hr/>
                    <br/>
                    <ul>
                        {classrooms.map((e, key) => {
                            return <div key={key} className="btn btn-primary"><Link to={`/classroom/${e.id}`}>{e.name}</Link></div>
                        })}
                    </ul>
                    <br/>
                    <hr/>
                    <br/>
                    <div className="btn btn-primary">
                        <Link to="/addClassroom">Ajouter une classe</Link>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Home;