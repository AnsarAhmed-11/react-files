import { useActionState } from "react"
import axios from "axios"
import { useState } from "react"

const Delete = () => {
    const formHandler = async (prevData, formData) => {
        const email = formData.get('email')
        const password = formData.get('password')
        await new Promise(res => setTimeout(res, 1000))
        try {
            const res = await axios.post("http://localhost:5000/delete", {
                email, password
            })
            return { message: res.data.message }//making object whose key name is message

        } catch (error) {
            return { error: error.response?.data?.message }
        }
    }
    const [data, action, pending] = useActionState(formHandler, undefined)
    const [showPassword, setPassword] = useState(false)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Delete Form</h2>
                <div className="form-fields">
                    <label html For='email'>Email</label>
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
                        {pending ? 'Wait Until Submitting' : 'Delete'}
                    </button>
                </div>
                {
                    data?.error && <span>{data?.error}</span>
                }
                {
                    data?.message && <span>{data?.message}</span>
                }
            </form>
        </div>
    )
}

export default Delete