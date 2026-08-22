import { useActionState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"

const Register = () => {
    //testing fake data --
    // const sendFakeUsers = async () => {
    //     for (let i = 0; i < 100; i++) {

    //         const fakeData = {
    //             name: `Test User ${i}`,
    //             email: `test${Date.now()}${i}@gmail.com`,
    //             password: "123456"
    //         };

    //         try {
    //             const res = await axios.post(
    //                 "http://localhost:5000/register",
    //                 fakeData,
    //                 {
    //                     withCredentials: true
    //                 }
    //             );

    //             console.log(i, res.data.message);

    //         } catch (error) {
    //             console.log(
    //                 i,
    //                 error.response?.data?.message || "error"
    //             );
    //         }
    //     }
    // };
    const formHandler = async (prevData, formData) => {

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        await new Promise(res => setTimeout(res, 1000))

        try {
            const res = await axios.post("http://localhost:5000/register", {
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
    const [showPassword, setPassword] = useState(false)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Form</h2>
                <div className="form-fields">
                    <label htmlFor='name'>Name</label>
                    <input id="name" type="text" placeholder="Enter Name" name='name' autoComplete="name" required />
                </div>
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
                    data?.message && <span style={{ color: "#1f7a8c" }}>{data?.message}</span>
                }
                <div className="footer">
                    <Link to="/update">Update</Link>
                </div>
            </form>
        </div>
    )
}

export default Register