//images
import { ReactComponent as HowlerIcon } from "../../../images/howlerIcon.svg";
//styles
import "./Avatar.scss";

const Avatar = ({ photoURL, displayName }) => {
  return (
    <div className="avatar">
      {photoURL ? (
        <img src={photoURL} alt={displayName}></img>
      ) : (
        <HowlerIcon fill="#1D9BF0" className="howler-icon" />
      )}
    </div>
  );
};

export default Avatar;
