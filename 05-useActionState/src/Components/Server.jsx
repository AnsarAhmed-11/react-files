import axios from "axios";
import { useEffect, useState } from "react";

const Server = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/message")
            .then((res) => setMessage(res.data.message))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>{message ? message : "not work ing"}</h1>
        </div>
    );
};

export default Server;