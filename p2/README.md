# Walking Skeleton

The walking skeleton for Course Project Two consists of five services: (1) a frontend responsible for a user interface, (2) a backend responsible for an API, (3) a database server, (4) a flyway image used for setting up the database schema, and (5) an Nginx web server that acts as a reverse proxy.

When you start the walking skeleton, the Nginx web server is available on the port 7800. Requests to paths starting with `/api` are directed to the backend, while other requests are directed to the frontend.


## Grading Functionality

There exists a grader image that can be used for grading submitted programming exercises. This is in folder "grader-image" -- *you need to build it for it to work*. Building it happens either by running the `build.sh` script or by running the command `docker build -t grader-image .` in the "grader-image" folder.

The grader essentially waits for a while and returns a random result.

The backend server uses the grader image (in `grade.js`) -- in brief, in `grade.js`, submitted code is copied to a new grader container that is then run, after which the result from grading is copied from the container. While the code has been written into a JS file, one could as well create shell scripts for the same purpose.

We **strongly** recommend creating a separate service that is responsible for grading of incoming submissions and moving the `grade.js` functionality into that service. In this case, the backend would then submit codes for grading into that service.
