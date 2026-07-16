import { useActionState } from "react"
import axios from "axios"
const Update = () => {
    const formHandler = async (prevData, formData) => {
        const email = formData.get("email")
        const password = formData.get("password")
        // await new Promise(res => setTimeout(res, 1000))//it delay the request for 1s
        try {
            const res = await axios.post("http://localhost:5000/update", { email, password })
            return { message: res.data.message }
        } catch (err) {
            return { error: err.response?.data?.message }
        }
    }
    /*
     * Form going on blank page coz catch has problem Now Fixed
     */
    const [data, action, pending] = useActionState(formHandler, undefined)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Update Form</h2>
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
                        {pending ? 'Wait Until Submitting' : 'Update'}
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
export default Update
