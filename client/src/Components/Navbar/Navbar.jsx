import "./Navbar.css";

const Navbar = (props) => {
  return (
    <div id="navbar">
      <div id="options">
        {props.options.map((e, id) => {
          return (
            <div className="option" key={`option_${id}`} onClick={e.onClick}>
              <div className="icon"><e.icon/></div>
              <div className="label">{e.label}</div>
            </div>
          )
        })}
      </div>
      <div id="personal">

      </div>
    </div>
  )
}

export default Navbar;