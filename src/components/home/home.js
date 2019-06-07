import React from 'react';

import { authService } from '../../services/authService';
import { Link } from "react-router-dom";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authService.currentUserValue,
        };
        console.log(this.state.currentUser)
    }

    render() {
        const { currentUser} = this.state;
        return (
                <div>
                    {currentUser.role === 'student' &&
                    <div>
                        <h1>Hi {currentUser.email}!</h1>
                        <p>You're logged in as student !!</p>
                    </div>
                    }
                    {currentUser.role === 'prof' &&
                    <div>
                        <h1>Vos classes!</h1>
                        {/*todo liste des classes*/}

                        <Link to="/addClassroom">Ajouter une classe</Link>
                    </div>
                    }
                </div>
        );
    }
}

export default Home;