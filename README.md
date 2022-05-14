# Howler

Howler is a twitter-esque social media app.  I made this project for The Odin Project's [Javascript Final Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/javascript-final-project).  This app is deployed on Firebase [here](https://howler-1dd33.web.app/).

---

## Technologies used

This Project is written with react and redux.  It uses a firebase back-end for authentication and a real-time database and uses react-redux-firebase and redux-firestore to make reading the database easy on the front end.  

---

## Functionality

When a user first visits the site, they are sent to the login page.  If they are not already registered, they must do so.  After signing in, they see the timeline.  As I did not anticipate a lot of users, there is only one timeline where everyone sees everyone else's posts(howls).  A user can upload a profile photo and write a bio.  Users can post howls with text and images, comment on and 'favorite' other users' howls and  delete their own howls.

![image](https://user-images.githubusercontent.com/30156468/168443012-07a97953-a127-472b-934c-702196719630.png)
