import './card.css'

function Card(props){
    console.log(props)
    return (
        <div className="col-lg-4">
            <div className="card">
                <div className="card-body d-flex flex-column ">
                    <div className="row justify-content-end">
                        <div className="col-2">
                            <i className="bi bi-x"></i>
                        </div>
                    </div>
                    <div className="row">
                        <h5 className="card-title">Reminder</h5>
                        <p className="card-text">{props.reminder[1]}</p>
                        <form method="post">
                            <div className="form-group">
                                <input type="text" disabled name="reminder" className="form-control" value= {props.reminder[0]} />
                                <i className="bi bi-eye eye"></i>
                                <i className="bi bi-clipboard clipboard"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card