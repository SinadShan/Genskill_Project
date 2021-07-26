
import './card.css'

export default function AddReminder(props){
    return(
        <div className="col-6 col-lg-4">
                <div className="card">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <div className="row">
                            <h5 className="card-title">Stay Productive!</h5>
                            <form hidden id="new-password-form">
                                <div className="form-group">
                                    <input type="date" name="date" className="form-control new-password-req datepicker" placeholder="Date"/>
                                    <input type="text" name="reminder" className="form-control new-password-req" autocomplete='off' placeholder="Reminder"/>
                                    <div className="row">
                                        <div className="col-6">
                                            <input type="button" id="cancel" className="form-control btn btn-primary" onClick={props.cancel} value="Cancel"/>
                                        </div>
                                        <div className="col-6">
                                            <input type="submit" className="form-control btn btn-primary" value="Submit"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                            <a href="#" id="new-password" className="btn btn-primary" onClick={props.addRem}>Add a Reminder</a>
                        </div>
                    </div>
                </div>
            </div>
    )
}