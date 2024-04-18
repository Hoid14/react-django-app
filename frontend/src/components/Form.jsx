
import { LoadingIndicator } from "./LoadingIndicator"

export const Form = ({name, handleSubmit, loading }) => {
    
  return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>{name}</h2>
                <input type="text" name="username" placeholder="Enter username"/>
                <input type="password" name="password" placeholder="enter password"/>
                <input type="submit"/>
                {loading && <LoadingIndicator />}
            </form>
        </div>
  )
}
