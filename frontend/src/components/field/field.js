import { React } from "react";
import "./field.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import TooltipMessage from "../tooltipMessage/tooltipMessage";

function Field({
  placeHolder,
  fieldClass,
  label,
  type,
  id,
  onChange,
  error,
  info,
  infoType,
  iconShow,
  value,
  min
}) {
  let messageClass = "";
  if (error) {
    messageClass = "error";
  } else if (infoType === "strong") {
    messageClass = "success";
  }

  return (
    <div className="field">
      {label && <label>{label}</label>}
      {iconShow && <i className="showPassword">{iconShow}</i>}
      <input
        type={type}
        className={`${fieldClass} ${messageClass}`}
        id={id}
        name={id}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
        min={min}
      ></input>
      {(error || info) && (
        <div className="fieldInfo">
          <p className={`${messageClass}message`}>
            {error || info}{" "}
            {info && (
              <TooltipMessage
                title={
                  <ul>
                    <li>
                      Password you provided must have at least 8 characters.
                    </li>
                    <li>Use upper and lower case character</li>
                    <li> 1 or more numbers</li>
                    <li>Use special characters</li>
                  </ul>
                }
                arrow
                placement="top"
              >
                <i>
                  <AiOutlineInfoCircle />
                </i>
              </TooltipMessage>
            )}
          </p>
          {info && (
            <div className="progressBar">
              <div className={`progress ${infoType}`}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Field;
