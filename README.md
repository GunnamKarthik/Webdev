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