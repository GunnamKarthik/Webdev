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

