import "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import Howl from "../Howl/Howl";
// styles
import "./Timeline.scss";

const Timeline = () => {
  useFirestoreConnect([{ collection: "howls" }]);
  const howls = useSelector((state) => state.firestore.ordered.howls);

  let sortedHowls = [];
  if (howls) {
    sortedHowls = [...howls].sort((a, b) => b.time - a.time);
  }

  return (
    <div className="timeline">
      {sortedHowls &&
        sortedHowls.map((howl) => (
          <Howl
            key={howl.id}
            howl={howl}
          />
        ))}
    </div>
  );
};

export default Timeline;
