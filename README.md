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