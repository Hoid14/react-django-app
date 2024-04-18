import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import { api } from "../api";
import { Note } from "../components/Note";
import "../styles/homePage.css"

export const HomePage = () => {
    const { authTokens } = useContext(AuthContext);

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
            .get("/api/notes/", {
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            .then((res) => res.data)
            .then((data) => {
                setNotes(data)
            })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`,{
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes()
            })
            .catch((error) => alert(error));
    }

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { title, content }, {
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>


            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
        </div>
    );
}
