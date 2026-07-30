import axios from "axios"
import { useState, useActionState } from "react"

const Profile = () => {
  const formHandler = async (prevData, formData) => {

    const name = formData.get('name')
    const password = formData.get('password')
    try {
      const res = await axios.post("http://localhost:5000/updateData", { name, password })
      return { message: res.data.message }
    } catch (err) {
      return { error: err.response?.data?.message || "server error", }
    }
  }
  const [data, action, pending] = useActionState(formHandler, undefined)
  const [updateField, setField] = useState("")

  return (
    <div>
      <form className="form" action={action} style={{ padding: "20px",justifyContent:"space-between",}}>
        <h2>Update Form Section</h2>
        <div className="form-fields">
          <select value={updateField} onChange={(e) => {
            setField(e.target.value)
          }} required>
            <option value="">-- Select an option --</option>
            <option value="name">Name</option>
            <option value="password">Password</option>
            <option value="both">Both name & password</option>
          </select>
        </div>
        <div className="form-fields">
          {updateField === "name" && (
            <>
              <label htmlFor='name'>Name</label>
              <input id="name" type="text" placeholder="Enter Name" name='name' autoComplete="name" required />
            </>
          )}

          {updateField === "password" && (
            <>
              <label htmlFor='password'>Password</label>
              <input id="password" type="text" placeholder="Enter password" password='password' autoComplete="password" required />
            </>
          )}
          {updateField === "both" && (
            <>
              <label htmlFor='name'>Name</label>
              <input id="name" type="text" placeholder="Enter Name" name='name' autoComplete="name" required />
              <label htmlFor='password'>Password</label>
              <input id="password" type="password" placeholder="Enter Password" name='password' autoComplete="current-password" required />
            </>
          )}
        </div>

        <div className="form-fields">
          <button disabled={pending}>
            {pending ? 'Wait Until Submitting' : 'Register'}
          </button>
        </div>
        {
          data?.error && <span style={{ color: "#d90429" }}>{data?.error}</span>
        }
        {
          data?.message && <span styles={{ color: "#1f7a8c" }}>{data?.message}</span>
        }
        <div className="footer">

        </div>
      </form>
    </div>
  )
}

export default Profile
