import axios from "axios";
import { useEffect, useState } from "react";

const Server = () => {
    const [message, setMessage] = useState("");
    useEffect(() => {
        axios.get("http://localhost:3000")
            .then((res) => setMessage(res.data.message))
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <h1 style={{
                webkitTextStroke:'.9px #6cd5f9',color:'transparent',scale:'1.4'
            }}>{message ? message : "not work ing"}</h1>
            <h1>Now nxt with mysql</h1>
        </div>
    );
};

export default Server;