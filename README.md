# SmartSpend - Student Expense & Budget Management System

## Overview

SmartSpend is a full-stack web application developed to help students and other users manage their personal finances in a simple and organised way. The applicationallows users to record their income and expenses, monitor their current balance, create monthly budgets, and understand their spending through a visual dashboard.

The system includes secure user registration and login, meaning each user has their own account and financial records. Transactions and budget information are stored in a mongoDB database and are linked to the authenticated user.

SmartSpend was developed using React and Vite for the frontend, Node.js and Express.js for the backend, and MongoDB Atlas for cloud database storage. JWT(JSON Web Token) authentication is used to protect user-specific pages and API requests.

The application has also been deployed online using Render, allowing the frontend and backend to run as cloud-hosted services.

## Organisation

The SmartSpend project is organised into two main parts:-
1) Frontend
2) Backend

## Frontend

The frontend is built using React and Vite. It provides the user interface for Registration, Login, Dashboard viewing, Transaction management, Monthly budgeting, and Currency display selection.

## Backend

The backend is built using Node.js and Express.js. 
It provides REST API endpoints for Authentication, Transactions, and budgets. 
It also handles JWT authentication and communication with the mongoDB Atlas database.

## Database

MongoDB Atlas is used as the cloud database. Mongoose is used in the backend to define and manage the User, Transaction, and Budget data models.

This separation keeps the user interface, application logic, and data storage organised, making the application easier to understand and maintain.

---

## System Requirements

## Functional Requirements

SmartSpend provides the following main functions:
1) User Registration
2) User Login and Authentication
3) Transaction Management
4) Financial Dashboard
5) Monthly Budget Management
6) Multiple Display Currencies
7) User Data Isolatoion  

## User Registration
   -> Users can create a personal SmartSpend account using their name, email address, and password.
   -> Password requirements are validated before registration.

## User Login and Authentication
   -> Registered users can securely log in to the application.
   -> JWT authentication is used to identify users and protect private routes.

## Transaction Management
   -> Users can add income and expense transactions.
   -> Existing transactions can be viewed, edited, and deleted.
   -> Each transaction includes information such as type, category, amount, description, and date.

## Financial Dashboard
   -> Users can view their monthly balance, total income, total expenses, and overall balance.
   -> Charts provide a visual summary of income, expenses, and spending categories.

## Monthly Budget Management
   -> Users can create and update a monthly budget.
   -> SmartSpend compares the budget with monthly spending and displays the remaining amount and budget progress.

## Multiple Display Currencies
   -> Users can display financial values in EUR, USD, GBP, INR, CAD, or AUD.
   -> The currency option changes the display symbol only and does not perform live exchange-rate conversion.

## User Data Isolation
   -> Transactions and budgets are linked to individual user accounts.
   -> A logged-in user cannot view another user's financial records.

### Data Requirements

SmartSpend manages three main types of data:
1) Users
2) Transactions
3) Budgets

## Users
   -> Name, email address, encrypted password, and account information.

## Transactions
   -> Transaction type, category, amount, description, date, and associated user.

## Budgets 
   -> Month, budget amount, and associated user.

---

## Architecture

SmartSpend follows a full-stack client-server architecture where the React frontend communicates with the Express backend through REST API requests.

Browser / React Frontend
        ↕ REST API
Node.js / Express Backend
        ↕ Mongoose
MongoDB Atlas Database

## Frontend 
   -> React and Vite are used to build the user interface. The frontend uses `fetch()` to communicate with the backend API.

## Backend 
   -> Node.js and Express.js handle authentication, transactions, budgets, and other application logic.

## Database 
   -> MongoDB Atlas stores user accounts, transactions, and monthly budgets. Mongoose is used to communicate with MongoDB.

## Authentication 
   -> JWT is used to authenticate users and protect private API routes.

## Password Security 
   -> Passwords are hashed using bcrypt before being stored in the database.

## Deployment 
   -> Both the frontend and backend are hosted as separate services on Render.

The frontend and backend are kept separate. This allows the same backend API to support different client applications in the future and makes the system easier to maintain and deploy.

---

## Database Schema

SmartSpend uses MongoDB Atlas as its cloud database. Mongoose schemas are used to define the structure and validation rules for the application data.

The system uses three main collections:-
1) Users
2) Transactions
3) Budgets

## Users

| Field | Description |

|---|---|

| name | User's name |

| email | User's email address and unique login identifier |

| password | Password stored securely as a hash |

| timestamps | Records when the account was created or updated |

## Transactions

| Field | Description |

|---|---|

| user | Reference to the user who owns the transaction |

| type | Income or expense |

| category | Category of the transaction |

| amount | Monetary value of the transaction |

| description | Optional information about the transaction |

| date | Date of the transaction |

| timestamps | Records when the transaction was created or updated |

## Budgets

| Field | Description |

|---|---|

| user | Reference to the user who owns the budget |

| month | Month associated with the budget |

| amount | Monthly budget amount |

| timestamps | Records when the budget was created or updated |

A user can have multiple transactions and monthly budgets. Each transaction and budget is linked to a specific user. This allows SmartSpend to keep financial information separate between different user accounts.

A unique combination of user and month is used for budgets so that each user has one budget record for a particular month.

---

## API Documentation

The SmartSpend frontend communicates with the backend through REST API endpoints. Protected endpoints require a valid JWT token.

## Authentication Endpoints

| Method | Endpoint | Description |

|---|---|---|

| POST | `/api/auth/register` | Register a new user account |

| POST | `/api/auth/login` | Log in and receive a JWT token |

## Transaction Endpoints

| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/transactions` | Get transactions belonging to the logged-in user |

| POST | `/api/transactions` | Create a new transaction |

| PUT | `/api/transactions/:id` | Update an existing transaction |

| DELETE | `/api/transactions/:id` | Delete an existing transaction |

## Budget Endpoints

| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/budgets/:month` | Get the logged-in user's budget for a selected month |

| POST | `/api/budgets` | Create or update a monthly budget |

## Protected Route

| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/protected` | Test whether JWT authentication is working |

For protected requests, the frontend sends the JWT token in the Authorization header. The backend authentication middleware verifies the token before allowing access to user-specific data.

---

## Setup and Installation 

   -> SmartSpend can be run locally using Node.js, npm, and a MongoDB Atlas database. The frontend and backend run separately during development and communicate through REST API requests.

## Prerequisites

Before running SmartSpend locally, make sure the following are available:

 1) Node.js
 2) npm (Node Package Manager)
 3) Git
 4) MongoDB Atlas account
 5) A code editor such as Visual Studio Code
 6) Internet connection for accessing mongoDB Atlas

## Clone the Repository
 
   -> Open a terminal and clone the SmartSpend Github repository:

```bash
git clone https://github.com/GunnamKarthik/Webdev.git
cd Webdev

---

## How to Use

  -> SmartSpend is designed to provide a simple workflow for managing personal income, expenses, and monthly budgets.

1. Create an Account

   -> Open SmartSpend and select *Register*. Enter your name, email address, and a valid password to create an account.

2. Login

   -> After registration, use your email address and password to log in. Once authentication is successful, SmartSpend redirects you to your personal dashboard.

3. View the Dashboard

   -> The Dashboard provides a summary of your financial activity, including:

        1) Monthly Balance
        2) Monthly Income
        3) Monthly Expenses
        4) Overall Balance
        5) Income vs Expenses chart
        6) Expense category breakdown
        7) Recent transactions

4. Manage Transactions

   -> Open the *Transactions* page to manage income and expenses.

Users can:

 1) Add a new transaction
 2) View existing transactions
 3) Edit a transaction
 4) Delete a transaction

Each transaction can contain a type, category, amount, description, and date.

5. Manage Monthly Budget

   -> Open the *Budget* page and select the required month.

   -> Enter a monthly budget amount and save it. SmartSpend compares the budget with the expenses recorded for that month and displays:

    1) Monthly Budget
    2) Amount Spent
    3) Remaining Amount
    4) Budget Progress

The saved budget remains available when the user returns to the application.

6. Change Display Currency

  -> The currency selector in the navigation bar allows the user to choose:

   1) EUR (€)
   2) USD ($)
   3) GBP (£)
   4) INR (₹)
   5) CAD (C$)
   6) AUD (A$)

This feature changes how monetary values are displayed. It does not perform live currency conversion or change the underlying stored amounts.

7. Logout

   -> Select *Logout* when finished. The authentication token is removed and protected pages such as Dashboard, Transactions, and Budget cannot be accessed again until the user logs in.

   ---

## Testing

SmartSpend was manually tested throughout the development process to make sure the main features worked correctly and that the frontend, backend, and database communicated as expected.

The following functional tests were completed:

| Test | Expected Behaviour | Result |

|---|---|---|

| User Registration | A new user should be able to create an account using valid details | Passed |

| User Login | A registered user should be able to log in with valid credentials | Passed |

| JWT Authentication | Protected API routes should only be accessible with a valid authentication token | Passed |

| Protected Pages | Users who are not logged in should be redirected to the login page | Passed |

| Add Transaction | A logged-in user should be able to add a new income or expense transaction | Passed |

| View Transactions | The user should only see transactions belonging to their account | Passed |

| Edit Transaction | An existing transaction should be updated successfully | Passed |

| Delete Transaction | A selected transaction should be removed successfully | Passed |

| Dashboard Summary | Income, expenses, monthly balance, and overall balance should reflect the user's financial data | Passed |

| Dashboard Charts | Financial charts should display the user's income and expense information | Passed |

| Create Monthly Budget | A user should be able to enter and save a monthly budget | Passed |

| Budget Persistence | A saved budget should remain available after refreshing or reopening the page | Passed |

| Budget Calculation | SmartSpend should calculate the amount spent, remaining budget, and budget progress | Passed |

| User Data Isolation | A newly created user should not be able to see another user's transactions or budget information | Passed |

| Currency Selection | The selected currency symbol should be displayed across the relevant financial pages | Passed |

| Logout | Logging out should remove the authentication token and prevent access to protected pages | Passed |

| Direct Route Refresh | Refreshing a deployed route such as `/dashboard` should load the React application correctly | Passed |

| Cloud Database Connection | The deployed backend should successfully communicate with MongoDB Atlas | Passed |

## CRUD Testing

The Transactions feature was specifically tested for all four CRUD operations:

 1) Create
    -> Added new income and expense transactions.

 2) Read
    -> Retrieved and displayed transactions belonging to the logged-in user.

 3) Update 
    -> Edited an existing transaction and confirmed that the updated information was displayed.

 4) Delete 
    -> Deleted a transaction and confirmed that it was removed from the application.

## Deployment Testing

After deployment, the frontend and backend were tested using the live Render services.

The deployed application was tested for registration, login, dashboard loading, transaction management, budget management, currency display, logout, protected routes, and communication with MongoDB Atlas.

The tests confirmed that the main SmartSpend functionality works in both the local development environment and the deployed application.

## Testing Approach

Testing for this project was carried out manually through the user interface and API behaviour during development and after deployment. Automated testing frameworks were not implemented for this version of SmartSpend.

---

## Project Structure

SmartSpend is divided into separate frontend and backend folders. This keeps the user interface, server-side logic, database models, and API routes organised.

```text
Webdev/
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Budget.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   └── budgets.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Transactions.jsx
│   │   │   └── Budget.jsx
│   │   │
│   │   ├── utils/
│   │   │   └── currency.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Main Folders

-> **backend/models** - Contains the Mongoose models used for users, transactions, and budgets.

-> **backend/routes** - Contains the REST API routes for authentication, transactions, and budgets.

-> **backend/middleware** - Contains the JWT authentication middleware used to protect private API routes.

-> **frontend/src/components** - Contains reusable React components such as the navigation bar and protected route component.

-> **frontend/src/pages** - Contains the main application pages including Login, Register, Dashboard, Transactions, and Budget.

-> **frontend/src/utils** - Contains supporting utility functions such as currency display handling.

-> **server.js** - Configures the Express server, MongoDB connection, middleware, API routes, and application port.

---

## Technologies Used

SmartSpend was developed using a combination of frontend, backend, database, security, visualisation, version control, and cloud deployment technologies.

| Technology | Purpose |

|---|---|

| React | Used to build the frontend user interface and application pages |

| Vite | Used as the frontend development and build tool |

| JavaScript | Main programming language used throughout the frontend and backend |

| CSS | Used to design and style the SmartSpend user interface |

| Node.js | Provides the runtime environment for the backend |

| Express.js | Used to create the backend server and REST API routes |

| MongoDB Atlas | Cloud database used to store users, transactions, and budgets |

| Mongoose | Used to define data models and communicate with MongoDB |

| JSON Web Token (JWT) | Used for user authentication and protecting private API routes |

| bcrypt | Used to hash user passwords before storing them in the database |

| Recharts | Used to create financial charts and visualisations on the dashboard |

| CORS | Allows communication between the separately hosted frontend and backend |

| dotenv | Used to load sensitive backend configuration from environment variables |

| Git | Used for source code version control |

| GitHub | Used to store and manage the project repository |

| Render | Used to deploy the SmartSpend frontend and backend online |

The project does not use a live currency conversion API. The currency selector changes the display currency symbol only and does not convert the stored financial values.

---

## Deployment

SmartSpend is deployed online using Render, while MongoDB Atlas is used as the cloud database. The frontend and backend are deployed as separate services.

## Backend Deployment

The Node.js and Express backend is deployed as a Render Web Service.

The backend deployment configuration includes:

1) **Root Directory:** `backend`
2) **Build Command:** `npm install`
3) **Start Command:** `node server.js`
4) **Environment Variables:** `MONGO_URI` and `JWT_SECRET`
5) **Port:** Uses the port provided by Render through `process.env.PORT`

The backend connects to MongoDB Atlas using the database connection string stored securely as an environment variable.

Live Backend:

https://smartspend-backend-320f.onrender.com

## Frontend Deployment

The React and Vite frontend is deployed as a Render Static Site.

The frontend deployment configuration includes:

1) **Root Directory:** `frontend`
2) **Build Command:** `npm run build`
3) **Publish Directory:** `dist`
4) **Environment Variable:** `VITE_API_URL`

`VITE_API_URL` is configured to point to the deployed SmartSpend backend so that the frontend can communicate with the REST API.

A Render rewrite rule is also configured:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

This allows React Router pages such as `/dashboard`, `/transactions`, and `/budget` to work correctly when the page is refreshed or accessed directly.

## Database Deployment

MongoDB Atlas provides the cloud database for SmartSpend.

The database stores:

1) Transactions
2) Monthly budgets

The database connection details are not stored directly in the source code. They are provided to the backend using environment variables.

## Live Application

The deployed SmartSpend application is available at:

https://smartspend-frontend-9sb8.onrender.com

## GitHub Repository

The complete project source code and development history are available at:

https://github.com/GunnamKarthik/Webdev

The deployed architecture follows this flow:

```text
User
  |
  v
React + Vite Frontend
(Render Static Site)
  |
  | REST API
  v
Node.js + Express Backend
(Render Web Service)
  |
  | Mongoose
  v
MongoDB Atlas
```

---

## Useful Links

The following links provide access to the SmartSpend source code, deployed application, and backend service.

-> **GitHub Repository:** [SmartSpend Source Code](https://github.com/GunnamKarthik/Webdev)

-> **Live Application:** [SmartSpend Frontend](https://smartspend-frontend-9sb8.onrender.com)

-> **Backend Service:** [SmartSpend Backend](https://smartspend-backend-320f.onrender.com)