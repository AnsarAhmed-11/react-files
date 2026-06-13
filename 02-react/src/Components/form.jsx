import { useState } from "react"


const Form = () => {
  const [title,setTitle]=useState('')
  function handleSubmit(e) {
    e.preventDefault()
    console.log(title)
    sessionStorage.setItem('name',title)
    setTitle('')
  }
  return (
    <div>
      <form className="" onSubmit={(e) => {
        handleSubmit(e)
      }}>
        <input type="text" placeholder="Enter Name" value={title}
        onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Form
