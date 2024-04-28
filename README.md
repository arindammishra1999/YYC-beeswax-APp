# yycbeeswax-mobile-application
This repository is for the development of an iOS and Android application for YYC Beeswax, for the purposes of our Software Engineering capstone project.  

## Authors:
- Colin Christophe
- Maxwell Kepler
- John McMurtry
- Arindam Mishra
- Kaumil Patel
- Jaxson Waterstreet

## Sprint Workflow
Each sprint lasts two weeks with the goal of having all tickets from the sprint merged into main by the deadline. 
Sprint Goals:
- Each ticket should be completed and merged into main by the end of the sprint - this means it is best to open a pull request a few days before the end of the sprint so that it can be reviewed and changed can be made if necessary before merging into main.
- Pull requests should have the following naming convention: "branch: jira ticket name" - for example: "cp-10: create home page."

## Development Environment Setup:
The following instructions will show you how to setup your development environment:

1. Ensure that you have the latest version of nodejs installed. Can be found here: https://nodejs.org/en/
2. Download the Expo Go app to your iPhone or Android device.
3. Clone this repository to your local computer.
4. Navigate to the YYCBeeswaxMobileApplication folder. Once inside run the command ```npx expo start``` and a QR code should appear in the terminal. If you are using an iPhone scan the QR code with your camera and it should open the Expo Go app, allowing you to view the project in real time. If you are using an Android press the scan QR Code button on the Home tab of the Expo Go app and scan the QR code you see in the terminal. If the application is not loading within the Expo Go app, try using ```npx expo start --tunnel``` then scan the QR code again. 


## Application Testing: 
To test the application, we will use the Expo Go App. The instructions are as follows:

1. Navigate to the YYCBeeswaxMobileApplication folder. Once inside run the command ```npx expo start``` and a QR code should appear in the terminal. If you are using an iPhone scan the QR code with your camera and it should open the Expo Go app, allowing you to view the project in real time. If you are using an Android press the scan QR Code button on the Home tab of the Expo Go app and scan the QR code you see in the terminal. If the application is not loading within the Expo Go app, try using ```npx expo start --tunnel``` and scan the QR code again.
2. Test the app as if it were an actual application. Changes made in the codebase will be updated immediately upon refresh in the Expo Go app. Therefore you do not need to restart the development server.

## New Feature Workflow:
When developing a new feature, the following workflow should be followed:

1. Ensure that your local repository is up to date with this one. Run the command ```git pull``` in the yyc-beeswax-mobile-application folder to ensure.
2. Create a new branch to work on the changes by using the command ```git checkout -b <ticket-name>```. Branches should follow the naming convention used on the team Jira, such as ```git checkout -b cp-7```.
3. Do all of the necessary coding and testing of the feature within this branch, using ```git add``` and ```git commit``` to save your progress.
4. Once the feature is complete and has been thoroughly tested, use ```git push``` to push these changes to this repository. You will likely need to set the upstream branch after running this command.
5. Go to GitHub and open a new pull request to merge the branch into the main branch. Write a title and description for the feature and assign a team member who did not work on the feature to review the changes. The pull request should be named with the following format: "branch: jira ticket name" - for example: "cp-10: create home page" Then create the pull request.
6. Once your pull request is approved the changes will be merged into the main branch. 

## Some App screenshots

<img src="App%20photos/landing.png" alt="App Photo 1" width="300">
<img src="App%20photos/order.png" alt="App Photo 1" width="300">
