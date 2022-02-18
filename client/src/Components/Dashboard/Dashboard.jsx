import "./Dashboard.css";
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import {
  BsFillHouseDoorFill,
  BsFillBarChartLineFill,
  BsFillCalendar2CheckFill,
  BsFillHddFill
} from 'react-icons/bs';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate
} from 'react-router-dom';
import Home from '../Home/Home';
import Stats from '../Stats/Stats';
import Calendar from '../Calendar/Calendar';
import Database from "../Database/Database";

const Dashboard = (props) => {
  let session = {}
  const { page } = useParams();
  const navigate = useNavigate();
  // TODO: ADD EACH OF PAGES
  const navbarOptions = [
    {
      icon: BsFillHouseDoorFill,
      label: "Strona główna",
      name: 'home',
      elem: Home,
      onClick: () => {
        navigate("/dashboard/home")
      }
    },
    {
      icon: BsFillBarChartLineFill,
      label: "Statystyki",
      name: 'stats',
      elem: Stats,
      onClick: () => {
        navigate("/dashboard/stats")
      }
    },
    {
      icon: BsFillCalendar2CheckFill,
      label: "Kalendarz",
      name: "calendar",
      elem: Calendar,
      onClick: () => {
        navigate("/dashboard/calendar")
      }
    },
    {
      icon: BsFillHddFill,
      label: "Baza danych",
      name: "database",
      elem: Database,
      onClick: () => {
        navigate("/dashboard/database")
      }
    }
  ]
  useEffect(() => {
    let isValid = false
    navbarOptions.forEach(e => {
      if (e.name === page) isValid = true
    })
    if (!isValid) {
      console.log('INVALID LINK')
      navigate('/dashboard/home')
    }
  }, [])
  useEffect(() => {
    session = props.getSession()
  }, [props.getSession()])
  return (
    <>
      {session !== null ? <div id="dashboard">
        <Navbar options={navbarOptions} activeOption={page}/>
        {navbarOptions.map(option => {
          return (session !== null && page === option.name) ? <option.elem key={`option-${option.name}`}/> : ''
        })}
      </div> : ''}
    </>
  )
}

export default Dashboard;