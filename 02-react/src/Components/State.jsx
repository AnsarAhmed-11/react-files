import { useState } from "react"
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
const State = () => {
    const [name, setName] = useState({ name: 'Ansar', age: 20 })
    const [data, setData] = useState([10, 20, 30])
    function Change() {
        const newName = { ...name }
        newName.name = 'Ahmed';
        newName.age = 50;
        const newData=[...data]
        newData.push(70)
        setData(newData)
        setName(newName)
        setName(newName)
    }

    return (
        <div className="">
            <h1>this is {name.name} and Age is {name.age}</h1>
            <h1>{data}</h1>
            <button onClick={Change}>Change State</button>
            <button><Link to="/">Go to Api Images</Link></button>
        </div>
    )


}

export default State
