# LemonWire 🍋
a place to rate movies you love!<br>
...and ones that make you sour

### Introduction
This was our third project (team of three) from Mod3 at Turing School of Software and Design. We were given one week to build a web app in React that allows different users to login and save their personal movie ratings with a user-friendly, interactive UI/UX. The app uses the `fetch()` method to `GET`, `POST`, and `DELETE` movie rating data while also utilizing React Redux and React Router. A major learning goal for this project was to create a robust testing suite using Jest and Enzyme to ensure all components and user interactions function correctly.

### Screenshots
![screenshot 1](https://user-images.githubusercontent.com/53405028/75131901-22f64400-5692-11ea-98f5-fafade0b9b12.png)

![screenshot 2](https://user-images.githubusercontent.com/53405028/75131950-5638d300-5692-11ea-8b0a-48b55e7a942d.png)

![screenshot 3](https://user-images.githubusercontent.com/53405028/75131980-736da180-5692-11ea-9c9a-a0a6c8773abb.png)

### In Action
![LemonWire gif](https://media.giphy.com/media/gFbMIKgVxjoUIzwybm/giphy.gif)

### Directions for Use
- On page load you will see a container near the top of the page containing movie posters of all featured movies. This box can be navigated by scrolling left or right.
- Below the featured movies container is a complete list of all available movies. A user may scroll up and down to view all movies.
- Each movie displays its average rating, seen on lemon icon in the top left corner of the movie poster.
- In the top right corner is the current user's rating. A `rate` button is displayed if the movie has yet to be rated, or if there is no user currently logged in.
- If not logged in, clicking on a movie poster will redirect the user to a login screen.
- If logged in, clicking on a movie poster will display a larger view of the movie details with an area to rate the movie.
- There is a drop box with rating scores ranging from one to ten, as well as a submit rating button.
- An old rating can be overwritten if a user submits a new rating.
- A user may logout at any time by selecting the `logout` button in the top right corner of the navigation bar.

### Project Learning Goals  
1. Reinforce React fundamentals
2. Reinforce using React Router to create a multi-page user experience
3. Reinforce component and asynchronous JS testing
4. Work with and navigate a shared, persistent API using GET, POST, and DELETE requests
5. Implement Redux as the app’s place to store shared state
6. Test Redux functions

### Technologies Used
- HTML
- CSS
- React
- Router
- Redux
- Jest/Enzyme
- NPM

### How to run on a local machine
1. shut down any live servers you currently have running (`control` + `c`)
2. clone down this repo to desired location
3. cd to the directory where you cloned the repo
4. run `npm install`
5. run `npm start`
6. you should now be able to run the app within your browser from the url: `http://localhost:3000`

### This project was created by:
Carla Geglio https://github.com/cgeglio<br>
Veronica Andrade https://github.com/VeeAndrade<br>
Zachary Nemeroff https://github.com/ZaneMeroff
