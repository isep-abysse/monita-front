import React from 'react';
import './App.css';
import {Router, Route, Link} from "react-router-dom";
import PrivateRoute from './components/privateRoute/privateRoute'
import Login from './components/login/login'
import Home from './components/home/home'
import AddClassroom from "./components/addClassroom/addClassroom";
import Classroom from "./components/classroom/classroom";
import AddMarks from "./components/addMarks/addMarks";
import Subject from "./components/subject/subject";
import Student from "./components/student/student";
import Resit from "./components/resit/resit";
import { authService } from './services/authService';
import { history } from "./helpers/history";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    static logout() {
        authService.logout();
        history.push('/login');
    }


    render () {
        const { currentUser } = this.state;

        return(
            <Router history={history}>
                <div>
                    {currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            <a onClick={App.logout} className="nav-item nav-link">Logout ({currentUser.firstName})</a>
                        </div>
                    </nav>
                    }
                    {/*ROUTER*/}
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <PrivateRoute exact path="/" component={Home} />
                                    <Route path="/login" component={Login} />
                                    <Route path="/addClassroom" component={AddClassroom}/>
                                    <Route path="/classroom/:id" component={Classroom}/>
                                    <Route path="/add/:id" component={AddMarks}/>
                                    <Route path="/subjects/:subject" component={Subject}/>
                                    <Route path="/:classroomId/student/:id" component={Student}/>
                                    <Route path="/resit/:id" component={Resit}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App