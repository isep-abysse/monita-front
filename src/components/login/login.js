import React from 'react';
import './login.css'
import { Redirect } from 'react-router-dom'
import { authService } from '../../services/authService';
import {history} from "../../helpers/history";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            // redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this)
    }

    // Login
    handleChange(e) {
        this.setState({email: e.target.value})
    }

    async login(e) {
        e.preventDefault();
        await authService.login(this.state.email);
        history.push('/');
        window.location.reload()
    }

    // Register student
    async registerStudent(e) {
        e.preventDefault();
        let body = {};
        for (let i = 0; i < e.target.length - 1; i++) {
            switch (i) {
                case 0: body.email = e.target[i].value;
                break;
                case 1: body.firstName = e.target[i].value;
                break;
                case 2: body.lastName = e.target[i].value;
                break;
                case 3: body.password = e.target[i].value;
                break;
            }
        }
        body.role = 'student';
        await authService.register(body);
        await authService.login(body.email);
        history.push('/');
        window.location.reload()
    }

    // Register teacher
    async registerTeacher(e) {
        e.preventDefault();
        let body = {};
        for (let i = 0; i < e.target.length - 1; i++) {
            switch (i) {
                case 0: body.email = e.target[i].value;
                break;
                case 1: body.firstName = e.target[i].value;
                break;
                case 2: body.lastName = e.target[i].value;
                break;
                case 3: body.subject = e.target[i].value;
                break;
                case 4: body.password = e.target[i].value;
                break;
            }
        }
        body.role = 'prof';
        await authService.register(body);
        await authService.login(body.email);
        history.push('/');
        window.location.reload()
    }



    render() {
        return (
            <div>
                <h1 className="title">Monita</h1>
                <h2>Se connecter</h2>
                <form onSubmit={this.login}>
                    <input name="email" type="email" onChange={this.handleChange} placeholder="Email"/>
                    <input name="password" type="password" placeholder="Mot de Passe"/>
                    <input type="submit" value="Connexion"/>
                </form>
                <br/>
                <hr/>
                <br/>
                <h2>S'inscrire en tant qu'étudiant</h2>
                <form onSubmit={this.registerStudent}>
                    <input name="email" type="email" placeholder="Email"/>
                    <input name="firstName" type="text" placeholder="Prénom"/>
                    <input name="lastName" type="text" placeholder="Nom"/>
                    <input name="password" type="password" placeholder="Mot de Passe"/>
                    <input type="submit" value="Inscription"/>
                </form>
                <br/>
                <hr/>
                <br/>
                <h2>S'inscrire en tant qu'enseignant</h2>
                <form onSubmit={this.registerTeacher}>
                    <input name="email" type="email" placeholder="Email"/>
                    <input name="firstName" type="text" placeholder="Prénom"/>
                    <input name="lastName" type="text" placeholder="Nom"/>
                    <input name="subject" placeholder="Matière (Ex: Informatique)"/>
                    <input name="password" type="password" placeholder="Mot de Passe"/>
                    <input type="submit" value="Inscription"/>
                </form>
            </div>
        )
    }
}

export default Login;