import React from 'react';
import { Redirect } from 'react-router-dom'
import { authService } from '../../services/authService';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
        this.setState({email: e.target.value})
    }

    async login(e) {
        e.preventDefault();
        await authService.login(this.state.email);
        this.setRedirect()
    }


    render() {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.login}>
                    <input name="email" type="text" onChange={this.handleChange} placeholder="Email"/>
                    <input name="password" type="password" placeholder="Password"/>
                    <input type="submit" value="Connexion"/>
                </form>
                {this.renderRedirect()}
            </div>
        )
    }

}

export default Login;