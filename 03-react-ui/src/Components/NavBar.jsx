import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

const NavaBar = () => {
    return (
        <div className="navbar">
            <GraduationCap />
            <Link to={'/'}>Home</Link>
            <Link to={'/About'}>About</Link>
            <Link to={'/Courses'}>Courses</Link>
            <Link to={'/FeedBack'}>Feedback</Link>
        </div>
    )
}

export default NavaBar
