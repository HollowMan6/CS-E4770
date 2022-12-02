# Project 3 report
## Content

This application should pass with merits:
1. The project contains a working Jamstack-like implementation of a Jodel-like application as outlined in the project requirements:
   - The application has a main page with a list of twenty most recent messages sorted by their posting time, a textarea into which a new message can be written, and a button that can be used to add the message.
   - When scrolling on the main page and reaching (nearly) the bottom of the page, the application retrieves more messages, twenty at a time (i.e. the application has an infinite scrolling functionality).
   - Similar to the second course project, there is no registration functionality. The user is identified through a random user token that is generated on opening the application for the first time. The user token is stored in localstorage and is used to identify the user in the future.
   - In the list of messages, each message has a text and the time when the message was posted.
   - Clicking on a message in the message list opens the message. Opening a message shows replies to the message and allows writing a reply to the message.
   - Messages have a score and they can be upvoted and downvoted. Up and downvoting messages changes the score. The votes are also stored to the database.
2. The project has a database (PostgreSQL) that stores the messages and the replies to the messages.
3. The project has a set of Kubernetes configuration files with autoscaling and a database operator that can be used to deploy the application to Kubernetes. Include the Kubernetes configuration files into a folder called kubernetes.
4. The Lighthouse performance score for the application is 100 for the application pages.
5. If the user is on the main page, new messages are added to the shown list of messages using the HTTP Event Source (Server-Sent Events).
   - If the user is on the main page, incoming up or downvotes change the score of the specific message.
   - If the user is on a message page, new replies to that message are added to the shown list of replies.
   - Work also in the situation where there are multiple application server pods. I use a separate messaging service (RabbitMQ) and broadcast those messages through Event Source to achieve the desired outcome.

## Starting locally and shutting down

Using Docker Compose.

- To start the application, open up the terminal in the source code folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Deploy using Minikube
```bash
minikube start --extra-config=kubelet.housekeeping-interval=10s
```
When minikube is running and ready, run the following command to deploy the application:
- Install operator
```bash
minikube addons enable metrics-server
minikube addons enable ingress
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.18/releases/cnpg-1.18.0.yaml
```
- Deploy a cluster
```bash
kubectl apply -f kubernetes/pg-cluster-example.yaml
```
- Login to cluster
```bash
kubectl exec -ti pg-cluster-example-1 -- /bin/bash
```
- Launch psql
```bash
psql
```
- Adjust password
```SQL
ALTER USER postgres WITH password 'postgres';
```
- Copy [the content of this SQL file](flyway/sql/V1___initial_schema.sql) and paste it into the psql console
- Quit using \q, then exit

```bash
kubectl apply -f kubernetes/app.yaml
```

Then, open the following URL in your browser: http://localhost

## Core Web Vitals tests
Using [Lighthouse](https://developers.google.com/web/tools/lighthouse) to test the Core Web Vitals of the application.

Performance: 100
Accessibility: 100
Best Practices: 99

## Performance tests
Performance tests are done with k6. The tests are done with 50 virtual users concurrently for 10 seconds.

You should run the performance tests after starting the application with `docker-compose up`. The following commands are run in the terminal in the clone source code folder that contains the `docker-compose.yml` file.

### The main/exercise page
Run:
```bash

```

```logs

```
### API: Code Submission to the database
Run:
```bash

```

```logs

```
### API: Get user completed exercises
Run:
```bash

```

```logs

```
### API: Get grading results
Run:
```bash
docker-compose run --entrypoint=k6 k6 run result.js
```

```logs

```

## Reflection

