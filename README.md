# SP-Frontend
This Reposository hosts the frontend of [Easy Help](https://sp-frontend-6181.onrender.com) web app. It is done using ReactJs, HTML, and CSS. It is tested using React Testing Library and Jest with nearly 85% coverage. Bellow is a detailed file structure description as well as explanation of app flow. 
## Run application on your machine
To run the application on your machine, follow the steps below:
- Clone this repository using ```git clone https://github.com/EasyHelpV1/SP-Frontend.git```
- Install packages by running ```npm install```
- Create env file and supply it with your ```JWT_SECRET```. This token is used to verify authentication of users and admins.
- Start the app using ```npm start```
- Run tests using ```npm test```
- run tests with coverage using ```npm run  coverage```
## File Structure
### public
Contains static files especially logo pictures
### src
Contains the most of the source code for the project
### src/assets
Contains image files for the flow of the project, such as the loading image, not found image, homepage image, and more.
It also has example images to test the user image change in the userImgs folder.
### src/components
Contains the React smaller components that are used in the pages components later on:
- **adminOptions**: files for components of the admin actions including reseting a user password, edititng user, chnaging admin previlages, and more.
- **footer**: file for footer component, the footer is imported in almost all pages, except for the auth page. This folder also contains the file for the stylesheet (CSS) code for this component. 
- **home**: a few components that are used in the home page, specifically for the how-to section, and user documentation. It also contains the stylesheet for these compoments.
- **images**: two components for setting up and displaying the user image. **Img.js** is for allowing the user to input the image file. **ImgReady** is for displaying the images, and it is imported in the profile components, as well as post, comment, and relpy components. 
- **login**: the login component, imported in the auth page.
- **navbar**: the navbar component and its stylesheet, This component is used in all pages. 
- **otherUser**: the OtherUser component. This component is used to display a user information other than the logged in.
- **post**: the Post, Comment, and Reply components, as well as their stylesheets, used in the allPosts page.
- **register**: the Resgister component, used in the auth page for user registration.
- **userInfo**: the userInfo component, used to display the logged in user information with the option for editing the profile, and the PasswordChange component used to display the password change form in the profile page.
### src/pages
Contains website pages: Admin, Profile, Posts, Home, Email Confirmation, and Not Found.
### src/util
Contains the components utilized for authorization, with ProtectedRoute being for basic users, and AdminRoute being for admin users:
- The ProtectedRoute simply checks for the presence of JWT token and the correct user information
- The AdminRoute decodes the JWT token to check for admin role in the payload.
### App.js
The app component used as the entry point for the application, it contains route organization to the app pages
### index.js
Creates the root element and renders the application.
### globalVars
Contains variables that are used gloabally by most components, and that do not belong in .env, such as the port for the backend and the id for the default user picture.
## Tests
The tests folder contains the test files and test configuration files such as API mock calls. There is a folder for playwright tests. These tests were written for about half of the project, but since those tests were not being recognized in the coverage report, a change of testing from Playwright to React Testing Library was neccessary. You can run test and coverage using the commands mentioned above. 
##.config
.config files are mostly ised to configure the tests running.
## package.json
This file includes the configuration for the React project as well as the project packages names, and versions and some of their configuration. 
## Backend
- [Backend Repository](https://github.com/EasyHelpV1/SP-Backend)
- [Backend API Documentation](https://sp-backend-b70z.onrender.com/api-docs/)
- [Backend link](https://sp-backend-b70z.onrender.com/api/v1)
## Contact
- [Easy Help Facebook](https://www.facebook.com/profile.php?id=100092154781925)
- [Easy Help Instagram](https://www.instagram.com/easyhelpv1)
- Email: easyhelp.com@gmail.com
