
import './card.css'

function markAsCompleted(event){
    let reminder = event.target.parentElement.children[0].children[0]
    if(event.target.innerHTML==='Mark as completed'){
        event.target.innerHTML='Unmark'
        reminder.style.textDecoration='line-through'
    }
    else{
        event.target.innerHTML='Mark as completed'
        reminder.style.textDecoration='None'
    }
}

function Card(props){
    
    return (
        <div className="col-4">
            <div className="card">
                <div className="card-body d-flex flex-column">
                    <div className="row justify-content-end">
                        <div className="col-2">
                            <i className="bi bi-x" onClick={props.deleteRem}/>
                        </div>
                    </div>
                    <div className="row align-middle">
                        {/* <h5 className="card-title">Reminder</h5> */}
                        <p style={{fontSize:'1.25rem'}} className="card-text">{props.reminder[1]}</p>
                        <form method="post">
                            <div className="form-group">
                                <input type="text" style={{fontSize:'1.5rem'}} disabled name="reminder" className="form-control" value= {props.reminder[0]} />
                            </div>
                            <p className="text-muted" onClick={markAsCompleted}>Mark as completed</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card