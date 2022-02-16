import './Error.css';
const Error = (props) => {
  return (
    <div id="Error">
      <div id="Error-code">{props.code}</div>
      <div id="Error-msg">{props.msg}</div>
    </div>
  )
}
export default Error;