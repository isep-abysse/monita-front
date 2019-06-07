import React from 'react';

import { authService } from '../../services/authService';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authService.currentUserValue,
        };
        console.log(authService.currentUserValue);
    }

    componentDidMount() {
        // authService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }
    componentDidUpdate () {
        console.log('yoyoyo')
    }

    render() {
        const { currentUser} = this.state;
        return (
            <div>
                <h1>Hi {currentUser.username}!</h1>
                <p>You're logged in !!</p>
            </div>
        );
    }
}

export default Home;