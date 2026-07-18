import axios from "axios";
import { useEffect, useState } from "react";

const Data = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let interval;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users-data");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="user-data">

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          )) : 
          (<td>data is not available</td>)
          }
        </tbody>
      </table>
    </div>
  );
};

export default Data;