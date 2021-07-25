import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div class="container">
        <div class="row justify-content-center d-flex flex-column min-vh-100 align-items-center">
            <div class="col-sm-9 col-lg-6 contact-form justify-content-center">
                
                <h2 id='heading'>Login</h2>
                <div class="row justify-content-center text-center">

                        <form method="post">
                            <div class="form-group form-floating">
                                <input type="text" required name="username" class="form-control username" placeholder="Username" />
                                <label for="username">Username</label>
                            </div>
                            <div class="form-group form-floating">
                                <input type="password" required name="password" class="form-control password" placeholder="Enter the password" />
                                <label for="password">Password</label>
                            </div>

                            <span>
                                <div class="form-group form-floating" hidden='true' id="signup-password">
                                    <input type="password" name="password-again" class="form-control" placeholder="Enter the password again" />
                                    <label for="password">Password</label>
                                </div>
                            </span>

                            <span>
                                <div class="form-group ">
                                    <input type="submit" name="btnSubmit" class="btnContact" value="Submit" />
                                    <br/>
                                    <span class="text-muted">Don't have an account?  </span><a id="signup-link">Signup</a>
                                </div>
                            </span>

                        </form>
                        
                </div>
            </div>
        </div>

    </div>
  );
}

export default App;
