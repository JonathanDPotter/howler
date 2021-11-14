import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
// components
import Loading from "../../utilities/Loading";
import ViewProfile from "../../sections/ViewProfile/ViewProfile";

const Profile = () => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null);

  const { auth } = useSelector((state) => state.firebase);
  const { users } = useSelector((state) => state.firestore.ordered);

  useEffect(() => {
    users && setCurrentUser(users.find((user) => user.uid === auth.uid));
  }, [users, currentUser, setCurrentUser, auth]);

  return (
    <div className="profile-page">
      <Loading />
      {currentUser && (
        <ViewProfile
          user={currentUser}
          close={() => history.goBack()}
          update={true}
        />
      )}
    </div>
  );
};

export default Profile;
