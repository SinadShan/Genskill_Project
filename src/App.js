import React from 'react';
import LoginForm from './Auth';
import Card from './card'
import './App.css';
import AddReminder from './addRem';

class App extends React.Component{
    constructor(props){
        super(props);
        // this.response = null
        
        this.submitForm = this.submitForm.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.toggleAddReminder = this.toggleAddReminder.bind(this);
        this.submitNewReminder = this.submitNewReminder.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.deleteReminder = this.deleteReminder.bind(this);

        this.state = {
            isLoggedin: false,
            response: null,
            user: null
        }
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
            // console.log(plainFormData)
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
                            this.setState({response: data})
                            this.setState({isLoggedin: true})
                            this.setState({user: plainFormData.username})
                            localStorage.setItem('response',JSON.stringify(data))
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
                        this.setState({response: data})
                        this.setState({isLoggedin: true})
                        localStorage.setItem('response',JSON.stringify(data))
                    }
                    else{
                        alert('Failed to sign-up')
                    }
                  }))
            }
    }

    toggleAddReminder(event){
        event.preventDefault()
        document.getElementById('new-reminder-form').removeAttribute('hidden')
        document.getElementById('cancel').removeAttribute('hidden')
        document.getElementsByClassName('new-reminder-req')[0].setAttribute('required','')
        document.getElementsByClassName('new-reminder-req')[1].setAttribute('required','')
        document.getElementById('new-reminder').hidden = 'true'
    }

    submitNewReminder(event){
        event.preventDefault()
        let form = document.getElementById('new-reminder-form')
        const data = new FormData(form)
        let plainFormData = Object.fromEntries(data.entries());
        plainFormData.username=this.state.user
        const JSONdata = JSON.stringify(plainFormData)
        // console.log(plainFormData)

        fetch('http://localhost:5000/addrem',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSONdata,
        }).then(resp => resp.json().then(data =>{
                if (data){
                    this.setState({response: data},function(){
                        localStorage.setItem('response',JSON.stringify(data))
                        this.cancelAdd()
                        document.getElementsByClassName('new-reminder-req')[0].value=''
                        document.getElementsByClassName('new-reminder-req')[1].value=''
                    })
                }
            }))
        
        

    }

    cancelAdd(){
        document.getElementById('new-reminder-form').hidden = 'true'
        document.getElementById('new-reminder').removeAttribute('hidden')
        document.getElementsByClassName('new-reminder-req')[0].removeAttribute('required')
        document.getElementsByClassName('new-reminder-req')[1].removeAttribute('required')
        document.getElementById('cancel').hidden = 'true'
    }

    deleteReminder(event){
        // let form = event.target.parentElement.parentElement.parentElement.children[1].children[1]
        // const data = new FormData(form)
        let plainData = {};
        plainData['reminder']=event.target.parentElement.parentElement.parentElement.children[1].children[1].children[0].children[0].value
        plainData['date']= event.target.parentElement.parentElement.parentElement.children[1].children[0].innerText
        plainData.username=this.state.user
        console.log(plainData)
        const JSONdata = JSON.stringify(plainData)
    
        fetch('http://localhost:5000/deleteRem',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSONdata,
            }).then(resp => resp.json().then(data =>{
                if (data){
                    this.setState({response: data})
                }
            }))
    }

    render(){
        if (this.state.isLoggedin===false && localStorage.getItem('response')!=null){
            return(
                <div>
                    <LoginForm do={this.submitForm} toggleSignup={this.toggleSignup}/>
                </div>
            )
        }
        else{
            return(
                <div className="container-fluid" style={{padding: '0'}}>
                    <div className="header" style={{backgroundColor:'#36373f', padding:'15px 15px 15px 30px', marginBottom: '10px'}}>
                            <h1 style={{color: 'white'}}>User: {this.state.user}</h1>
                        </div>
                    <div className='container' style={{padding: '0'}} >
                        {/* <hr style={{height: '5px'}}/> */}
                        <div className="row" style={{padding: '10px'}}>
                            {this.state.response.reminders.map((item,i=0) =>{
                                    return <Card key={i++} reminder={item} deleteRem={this.deleteReminder}/>
                                }
                            )}
                            <AddReminder addRem={this.toggleAddReminder} cancel={this.cancelAdd} submit={this.submitNewReminder}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}


export default App
