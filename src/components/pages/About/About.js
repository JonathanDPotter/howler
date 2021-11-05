import React from "react";
import { useHistory } from "react-router";
// components
import Avatar from "../../sections/Avatar/Avatar";
// styles
import "./About.scss";

const About = () => {
  const history = useHistory();
  return (
    <div className="about-page">
      <Avatar />
      <h1 className="title">About Howler</h1>
      <p className="about-text">
        Howler is a social media site similar to Twitter where people can come
        and post their howls to be read and enjoyed by other users. There is no
        following, rather everone sees what everyone else is saying. The reasons
        for this are two-fold. There will likely not be very many people on the
        site, so it shouldn't be a major inconvenience to read everyone's howls,
        and it would be a lot more work to include that functionality. I really
        only want to spend so much time on this before moving on to something
        else.
      </p>
      <p className="about-info">
        Howler was coded using React by Jonathan Potter for The Odin Project's
        Javascript Final Project and the source code can be found on GitHub
        here: <a href="https://github.com/JonathanDPotter/howler">link</a>.
      </p>
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

export default About;
