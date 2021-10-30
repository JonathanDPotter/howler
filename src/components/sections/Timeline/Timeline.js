import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
// components
import Howl from "../Howl/Howl";
// styles
import "./Timeline.scss";
import Loading from "../../utilities/Loading";

const Timeline = () => {
  useFirestoreConnect([{ collection: "howls" }]);

  const [sortedHowls, setSortedHowls] = useState([]);

  const howls = useSelector((state) => state.firestore.ordered.howls);

  useEffect(() => {
    howls && setSortedHowls([...howls].sort((a, b) => b.time - a.time));
  }, [howls]);

  return (
    <div className="timeline">
      {sortedHowls ? (
        sortedHowls.map((howl) => <Howl key={howl.id} howl={howl} />)
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Timeline;
