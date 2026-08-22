import { useActionState, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
const Login = () => {
    const send = useNavigate()
    const formHandler = async (prevData, formData) => {

        const email = formData.get('email')
        const password = formData.get('password')
        try {
            const res = await axios.post("http://localhost:5000/Login", {
                email, password
            }, {
                // withCredentials: true zaroori hai taaki browser cookie receive kare aur future requests me automatically bheje.
                withCredentials: true,
            })
            if (res.data.success === true) {
                localStorage.setItem("isLoggedIn", res.data.success)
                alert("welcome to update profile page")
                send("/Profile")
            }

            return {
                message: res.data.message || "data submit"
            }
        } catch (error) {
            return { error: error.response?.data?.message || "server error", }
        }
    }

    const [data, action, pending] = useActionState(formHandler, undefined)
    const [showPassword, setPassword] = useState(false)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Login</h2>
                <div className="form-fields">
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="email" placeholder="Enter Email" name='email' autoComplete="email" required />
                </div>
                <div className="form-fields">
                    <label htmlFor='password'>Password</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        name="password"
                        autoComplete="new-password"
                        required
                    />

                    <input
                        type="checkbox"
                        name="show"
                        id="showPassword"
                        checked={showPassword}
                        onChange={(e) => setPassword(e.target.checked)}
                    />
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
                    data?.message && <span style={{ color: "#4df4a3" }}>{data?.message}</span>
                }
                <div className="footer">
                    <Link to="/update">Update</Link>
                </div>
            </form>
        </div>
    )
}

export default Login