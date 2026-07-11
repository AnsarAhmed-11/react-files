import { useActionState } from "react"
import axios from "axios"
const Delete = () => {
    const formHandler = async (prevData, formData) => {
        const name = formData.get('name')
        // const email = formData.get('email')
        // const password = formData.get('password')
        await new Promise(res => setTimeout(res, 1000))

        try {
            const res = await axios.post("http://localhost:5000/delete", {
                name,
            })
            return { message: res.data.message }//making object whose key name is message
        } catch (error) {
            return { error: error.response?.data?.message }
        }
    }

    const [data, action, pending] = useActionState(formHandler, undefined)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Delete Form</h2>
                <div className="form-fields">
                    <label htmlFor='name'>name</label>
                    <input id="name" type="text" placeholder="Enter name" name='name' autoComplete="name" required />
                </div>

                {/*<div className="form-fields">
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="email" placeholder="Enter Email" name='email' autoComplete="email" required />
                </div>
                <div className="form-fields">
                    <label htmlFor='password'>Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name='password' autoComplete="current-password" required />
                </div>
                */}
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