import React from 'react';
import LoginForm from './Auth';
import Card from './card'
import './App.css';

class App extends React.Component{
    constructor(props){
        super(props);
        this.response = null
        this.submitForm = this.submitForm.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.state = {isLoggedin: false}
    }
    
    toggleSignup(event){
        if(event.target.innerText === 'Signup'){
            document.getElementById('signup-password').removeAttribute('hidden')
            document.getElementsByClassName('text-muted')[0].setAttribute('hidden','true')
        
            
            document.getElementById('signup-password').children[0].setAttribute('required','true')
            document.getElementById('heading').innerText = 'Signup'
            document.getElementById('signup-link').innerText = 'Login'
        }
        else{
            document.getElementById('signup-password').setAttribute('hidden','true')
            document.getElementsByClassName('text-muted')[0].removeAttribute('hidden')
            // document.getElementById('signup-password-label').setAttribute('hidden','true')
            document.getElementById('signup-password').children[0].removeAttribute('required')
            // console.log(this.attributes)
            document.getElementById('heading').innerText = 'Login'
            document.getElementById('signup-link').innerText = 'Signup'
        }
        
    }

    submitForm(event){
            event.preventDefault()
            let form = document.getElementsByTagName('form')[0]
            const data = new FormData(form)
            const plainFormData = Object.fromEntries(data.entries());
            const JSONdata = JSON.stringify(plainFormData)
            if(document.getElementById('heading').innerText === 'Login'){
                // login
                fetch('http://localhost:5000/login',{
                  method: 'POST',
                  headers:{'Content-Type': 'application/json'},
                  body: JSONdata,
                }).then(resp => resp.json().then(
                  data =>{
                      if (data){
                            this.response = data
                            this.setState({isLoggedin: true})
                      }
                      else{
                          alert('Invalid username or password')
                      }
                  }))
            }
            else{
                // signup
                fetch('http://localhost:5000/signup',{
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSONdata
                }).then(resp => resp.json().then(
                  data => {
                    if (data){
                        this.response = data
                        this.setState({isLoggedin: true})
                    }
                    else{
                        alert('Failed to sign-up')
                    }
                  }))
            }
    }

    render(){
        if (!this.state.isLoggedin){
            return(
                <div>
                    <LoginForm do={this.submitForm} toggleSignup={this.toggleSignup}/>
                </div>
            )
        }
        else{
            return(
                <div className='container text-center'>
                    <h1>Adipoli, Login aay</h1>
                    <div className="row">
                        { this.response.reminders.map((item,i=0) =>{
                                return <Card key={i++} reminder={item}/>
                            }
                        )}
                    </div>
                </div>
            )
        }
    }
}


export default App
