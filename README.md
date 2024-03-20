**README.md**

# Probability Perception Experiment Application

Welcome to the Probability Perception Experiment Application! This application is based on the paper titled ["A Discrete Adjustment Experiment on Reporting Probabilities"](http://econweb.umd.edu/~stevens/papers/KSW%20Discrete%20Adjustment%20Experiment.pdf) by Kathryn Blackmond Laskey, Paul R. Wilson, and Steven F. Lehrer.

## Introduction

This application aims to simulate the discrete adjustment experiment described in the paper, allowing users to participate in a study of probability perception and reporting. Participants will be presented with scenarios and asked to provide their probability estimates for certain events.

## Project Structure

- **frontend**: Contains the frontend React.js application.
- **backend**: Contains the backend Node.js application built with Express.js.
- add .env file with the with paramenters ```DB_HOST```, ```DB_DATABASE```, ```DB_USER```, and ```DB_PASSWORD```. Also, add ```NO_OF_ROUND``` to set number of rounds for experiment.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)
- npm (Node Package Manager)

## Installation

1. Clone the repository: `git clone [<repository-url>](https://github.com/ameya-shahu/probability-perception-exp-app.git)`
2. Navigate to the project directory: `cd probability-perception-exp-app`
3. Install dependencies for both frontend and backend:
   ```
   # dependencies for backend server
   npm install

   # dependencies for frontend
   cd ./frontend
   npm install
   ```
4. Start MongoDB service: `mongod`
5. Start the backend server:
   ```
   npm start
   ```
6. Start the frontend development server:
   ```
   cd ./frontend
   npm start
   ```
7. Access the application at `http://localhost:3000` in your web browser.

## Usage

- Participants can access the application through the provided URL and participate in the probability perception experiment.
- The backend server handles the logic and data management required for the experiment.
- Participants' responses are recorded and can be analyzed as per the experiment's requirements.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

Special thanks to the authors of the paper ["A Discrete Adjustment Experiment on Reporting Probabilities"](http://econweb.umd.edu/~stevens/papers/KSW%20Discrete%20Adjustment%20Experiment.pdf) for providing the inspiration and framework for this application.

---
