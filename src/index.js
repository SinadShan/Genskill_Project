import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
  );
  
document.getElementById('signup-link').onclick = function (){ 
  if(this.innerText === 'Signup'){
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

document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const plainFormData = Object.fromEntries(data.entries());
  const JSONdata = JSON.stringify(plainFormData)
  if(document.getElementById('heading').innerText === 'Login'){
      // login
      fetch('http://localhost:5000/login',{
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSONdata,
      }).then(resp => resp.json().then(
        data => console.log(data)))
  }
  else{
      // signup
      fetch('http://localhost:5000/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSONdata
      }).then(resp => resp.json().then(
        data => console.log(data)))
  }

})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
