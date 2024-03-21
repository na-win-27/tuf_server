#TUF SERVER

## Overview

This Express.js application serves as a code compilation service, allowing users to compile and save code snippets to a MySQL database. It utilizes Redis for caching and integrates with the Judge-CE API for code compilation.

## Features

- **Code Compilation:** Users can submit code snippets to be compiled using the Judge-CE API.
- **Database Integration:** Compiled code snippets are saved to a MySQL database for future reference.
- **Caching:** Redis caching is implemented to improve performance by storing compiled results temporarily.


## Installation

1. Clone the repository:


2. Install dependencies:
npm i


3. Set up MySQL database:
   - Create a MySQL database and configure the connection details in `db/Database.js`.

4. Set up Redis:
   - Ensure Redis is installed and running on your machine.
   - Update Redis connection details in `redis/index.js` if necessary.

5. Configure Judge-CE API:
   - Obtain an API key from Judge-CE and create the `.env` file with your API key.

6. Start the server:
npm start



## Usage

- **Endpoint:** `/compile`
- **Method:** POST
- **Request Body:** JSON object containing code snippet and language information.
- **Example Request:**

