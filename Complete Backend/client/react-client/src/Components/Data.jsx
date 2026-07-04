import axios from "axios";
import { useEffect, useState } from "react";

const Data = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Data</h1>
      {users.map((el) => {
        return <div>
          {el.name}
          {el.email}
          {el.password}
        </div>

      })}
    </div>
  )
}

export default Data
