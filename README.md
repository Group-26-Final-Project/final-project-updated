***

# Developing an E-voting system using Blockchain Technology - Case Study AAiT Student Council

## Team Members

* Amanuel Teklu
* Assegid Assefa
* Daniel Terefe
* Haftom Legesse
* Kaleb Mesfin

## Advisor

* Mr. Tigabu Dagne

***

## Project Summary

This project is mainly a case study that tries to solve the drawbacks of the AAiT Student Council Elections using means of mobile/web based e-voting platform developed using a decentralized public ledger (blockchain) at its core. It includes functionalities like

* Registration (Candidate/Voter)
* Login (Candidate/Voter/Admin)
* Voting for prefered candidate
* Visual Data Representation of ongoing election results
* Easy creation and manipulation of elections (Admin)... and much more

In addition to above mentioned features, voters and candidates have the freedom to exercise opinion sharing using the built in comments/ideas section. Candidates are also able to express their complaints towards their election using the complaint section. Other than that, it uses the nowadays state-of-the-art security implementaion of magic links (web) and OTP (mobile)

***

## Tools and Technologies

* Ganache - an ethereum based local blockchain used for deploying and testing smart contracts
* Solidity - language used for writing smart contract code
* React - frontend javascript library used to make frontend web apps
* React Native - javascript used to make mobile device apps
* Express - backend server to manage off-chain transactions
* MongoDB - non-relational object based database used to store off-chain data
* Github - version control system

## Installation

* Download and Install ganache (<https://trufflesuite.com/ganache/>) for your respective OS
* Download and Install truffle (<https://trufflesuite.com/docs/truffle/quickstart/>)
* Clone this repository to your local machine
* Open terminal in the root directory of the cloned repository

* ### Smart Contracts

  * Start Ganache
  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/ganache.png)
  
  * Navigate to **dvsbt_smart_contracts** folder
  * Open truffle-config.json and make sure the **networks** object contains entry **dev**. Compare it to the following screenshot

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/truffle-config.png)

  * Run **npm install** then followed by **truffle migrate --reset --network dev**

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/migration%20command.png)

  * After successful deployment, copy the following contents of the migration command output

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/get%20deployed%20contract%20address.png)

* ### Backend

  * Navigate to **dvsbt_backend** folder
  * Open/create **.env** file in current directory and replace/paste the previously copied contents
  * Run **npm install** then followed by **npm run dev**
  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/backend.png)

* ### Web (User)

  * Navigate to **dvsbt_web** folder
  * Run **npm install** then followed by **npm start**
  * Open preffered browser and go to URL **<http://localhost:3000>**

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/web_user.png)

* ### Web (Admin)

  * Navigate to **dvsbt_web_admin** folder
  * Run **npm instal** then followed by **npm start**
  * Open preffered browser and go to URL **<http://localhost:3000>**

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/web_admin.png)

* ### Mobile

  * Navigate to **dvsbt_mobile** folder
  * Setup an android emulator on your computer (<https://developer.android.com/studio/run/emulator#:~:text=1%20Select%20Tools%20%3E%20AVD%20Manager%20and%20click,Emulated%20Performance.%203%20Select%20Cold%20boot.%20See%20More>.) or install **Expo Go** app on your mobile device from Playstore
  * Run **npm install** then followed by **npm start**

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/mobile.png)
  
  * Open Expo on your mobile device and scan QR Code provided by expo server to connect to it.

  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/expo%20server%20running.png)
  ![alt text](https://github.com/Group-26-Final-Project/final-project-updated/blob/main/screenshots/expo%20go.jpg)

## Reference

* Send Web3 Transactions using nodejs - Github Link : <https://github.com/jklepatch/eattheblocks/blob/master/screencast/200-send-transaction-with-web3-nodejs/script.js>
* React Table: A complete tutorial with examples - Blog Link : <https://blog.logrocket.com/complete-guide-building-smart-data-table-react/#axios>
* Passwordless authentication / Magic Link sign in with Express, React, MongoDB - Github Link : <https://github.com/gk3000/passwordless-magic-link-sign-in-express-react>
* Create Split OTP Inputs in React Native with this Trick! - Video Link : <https://www.youtube.com/watch?v=nT18Fe6j8uQ>
* Charts in React Native - Bar chart multiple series - Video Link : <https://www.youtube.com/watch?v=O_6GVQ1EwfY>
