import "./Dashboard.css";
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import { BsFillHouseDoorFill } from 'react-icons/bs';

const Dashboard = (props) => {
  let session = {}
  const navbarOptions = [
    {
      icon: BsFillHouseDoorFill,
      label: "Strona główna",
      onClick: () => {}
    }
  ]
  useEffect(() => {
    session = props.getSession()
  }, [props.getSession()])
  return (
    <>
    {session !== null ? <div id="dashboard">
      <Navbar options={navbarOptions}/>
    </div>: ''}
    </>
  )
}

export default Dashboard;