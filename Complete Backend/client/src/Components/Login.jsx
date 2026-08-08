import { useActionState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Login = () => {
const formHandler = async (prevData, formData) => {

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        await new Promise(res => setTimeout(res, 1000))

        try {
            const res = await axios.post("http://localhost:5000/dummy", {
                name, email, password
            }, {
                // withCredentials: true zaroori hai taaki browser cookie receive kare aur future requests me automatically bheje.
                withCredentials: true,
            })
            return {
                message: res.data.message || "data submit"
            }
        } catch (error) {
            return { error: error.response?.data?.message || "server error", }
        }
    }

    const [data, action, pending] = useActionState(formHandler, undefined)
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
                    <input id="password" type="password" placeholder="Enter Password" name='password' autoComplete="current-password" required />
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