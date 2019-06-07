import React from 'react';
import { Redirect } from 'react-router-dom'
import { authService } from '../../services/authService';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this)
    }

    // Redirect after login
    setRedirect = () => {
        this.setState({redirect: true})
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    };

    // Login
    handleChange(e) {
        this.setState({username: e.target.value})
    }

    async login(e) {
        e.preventDefault();
        await authService.login(this.state.username);
        this.setRedirect()
    }


    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <input name="email" type="text" onChange={this.handleChange}/>
                    <input name="password" type="password"/>
                    <input type="submit"/>
                </form>
                {this.renderRedirect()}
            </div>
        )
    }

}

export default Login;