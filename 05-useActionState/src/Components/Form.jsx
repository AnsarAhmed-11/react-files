import { useActionState } from "react"

const Form = () => {
    const formHandler = async (prevData, formData) => {

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        await new Promise(res => setTimeout(res, 1000))
        console.log(name);
        if (name && email && password) {
            return { message: 'data Submitted' }
        }
        else {
            return { error: 'Something went wrong..' }
        }
    }

    const [data, action, pending] = useActionState(formHandler, undefined)
    return (
        <div>
            <form className="form" action={action}>
                <h2>Form</h2>
                <div className="form-fields">
                    <label htmlFor='name'>Name</label>
                    <input type="text" placeholder="Enter Name" name='name' />
                </div>
                <div className="form-fields">
                    <label htmlFor='email'>Email</label>
                    <input type="text" placeholder="Enter Name" name='email' />
                </div>
                <div className="form-fields">
                    <label htmlFor='password'>Password</label>
                    <input type="text" placeholder="Enter Name" name='password' />
                </div>
                <div className="form-fields">
                    <button disabled={pending}>
                        {pending ? 'Wait Until Submitting' : 'Regsiter'}
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

export default Form