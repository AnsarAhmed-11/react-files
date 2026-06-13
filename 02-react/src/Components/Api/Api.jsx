import { useEffect, useState } from "react";
import { Commet} from "react-loading-indicators";
import Styles from './api.module.css'
import { Link } from "react-router-dom";
const Api = () => {
  const [img, setImg] = useState([]);
  const [value, setValue] = useState(1)
  const [load, setLoad] = useState(true)
  function prev() {
    if (value > 1) {
      setValue(prev => prev - 1)
    }
    else {
      alert('you cannot go further')
    }
  }

  function next() {
    setValue(prev => prev + 1)
    if (value == 10) {
      alert('you cannot go further')
      setValue(10)
    }
  }

  useEffect(() => {
    async function data() {
      setLoad()
      const response = await fetch(`https://picsum.photos/v2/list?page=${value}&limit=100`);
      const images = await response.json();
      console.log(images)
      setImg(images)
      setLoad(false)
    }
    data()
  }, [value])

  return (
    <div>
      <div className={Styles.first}>
        <h1>Page : {value}</h1>
        <h1><Link to='/state'>State</Link></h1>
      </div>

      <div className={Styles.second}>

        {load ? (
          <div className={Styles.loader}>
            <Commet color={["#3c497c", "#7c3c69", "#7c6f3c", "#3c7c4f"]} />
          </div>
        ) : (
          img.map((el) => (
            <div className={Styles.container} key={el.id}>
              <img src={`https://picsum.photos/id/${el.id}/600/400`} alt="" />
              <h3>{el.author}</h3>
            </div>
          )
          ))}
      </div>
      <div className={Styles.bottom}>
        <button className={Styles.btn} onClick={prev}>Prev</button>
        <button className={Styles.btn} onClick={next}>Next</button>
      </div>
    </div>
  )
}

export default Api
