import './App.css';


function LoginForm(props){
    return(
        <div class="container">
            <div class="row justify-content-center d-flex flex-column min-vh-100 align-items-center">
                <div class="col-sm-9 col-lg-6 contact-form justify-content-center">
                    
                    <h2 id='heading'>Login</h2>
                    <div class="row justify-content-center text-center">

                            <form method="post">
                                <div class="form-group form-floating">
                                    <input type="text" required name="username" class="form-control username" placeholder="Username" />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div class="form-group form-floating">
                                    <input type="password" required name="password" class="form-control password" placeholder="Enter the password" />
                                    <label htmlFor="password">Password</label>
                                </div>

                                <span>
                                    <div class="form-group form-floating" hidden='true' id="signup-password">
                                        <input type="password" name="password-again" class="form-control" placeholder="Enter the password again" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </span>

                                <span>
                                    <div class="form-group ">
                                        <input type="submit" onClick={props.do} name="btnSubmit" class="btnContact" value="Submit" />
                                        <br/>
                                        <span class="text-muted">Don't have an account?  </span><a id="signup-link" onClick={props.toggleSignup}>Signup</a>
                                    </div>
                                </span>

                            </form>
                            
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginForm