# Walking Skeleton

The walking skeleton for Course Project Three consists of five services: (1) a frontend responsible for a user interface, (2) a backend responsible for an API, (3) a database server, (4) a flyway image used for setting up the database schema, and (5) an Nginx web server that acts as a reverse proxy.

When you start the walking skeleton, the Nginx web server is available on the port 7800. Requests to paths starting with `/api` are directed to the backend, while other requests are directed to the frontend.