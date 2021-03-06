# Jobly Backend

This is the Express backend for Jobly, version 2.

Firstly, install dependencies in an npm environment:

    npm install

To run this:

    npm start

To run the tests:

    npm test

## Change Log

-   5-20-2021: Added documentation to sql.js
-   5-20-2021: Added tests for sql.js
-   5-20-2021: Added tests for new functionality - filtered company search - company.test.js and companies.test.js
-   5-20-2021: Added new functionality for filtered search in model and view - company.js and companies.js
-   5-20-2021: Changed middleware for routes protected for admins, updated tests
-   5-21-2021: Created jobs model (create) and test (create)
-   5-22-2021: Finished creating jobs model and tests
-   5-22-2021: Created jobs routes and tests
-   5-22-2021: Created filtered search for jobs and updated tests
-   5-22-2021: Added jobs to /companies/:handle results
-   5-22-2021: Added job application functionality with tests
-   5-22-2021: Added job applications to /users/:id route results
