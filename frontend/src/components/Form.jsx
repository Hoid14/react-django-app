
import { LoadingIndicator } from "./LoadingIndicator"

export const Form = ({name, handleSubmit, loading }) => {
    
  return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input className="form-input" type="text" name="username" placeholder="Enter username"/>
                <input className="form-input" type="password" name="password" placeholder="enter password"/>
                
                {loading && <LoadingIndicator />}
                
                <button className="form-button" type="submit">
                    {name}
                </button>
            </form>
        </div>
  )
}
