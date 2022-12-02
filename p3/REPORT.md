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
4. The Lighthouse performance score for the application is 99 for the message and reply application pages.
5. With the HTTP Event Source (Server-Sent Events), all the pages are synced even when they are opened. 
   - If the user is on the main page, new messages are added to the shown list of messages .
   - If the user is on the main page, incoming up or downvotes change the score of the specific message.
   - If the user is on a message page, new replies to that message are added to the shown list of replies.
   - Work also in the situation where there are multiple application server pods. I use a separate messaging service (RabbitMQ) and broadcast those messages through Event Source to achieve the desired outcome.

## Starting locally and shutting down

Using Docker Compose.

- To start the application, open up the terminal in the source code folder that
  contains the `docker-compose.yml` file and type `docker-compose up`. the application
  will start and be available at `http://localhost:7800`.
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
- Deploy apps
```bash
minikube image build -t ui ui
minikube image build -t api api
minikube image build -t sse service 
kubectl apply -f kubernetes/app.yaml
minikube tunnel
```

Then, open the indicated ip in your browser.

## Core Web Vitals tests
Using [Lighthouse](https://developers.google.com/web/tools/lighthouse) to test the Core Web Vitals of both message and the reply pages of the application.

Performance: 99
Accessibility: 100
Best Practices: 100

## Performance tests for the application page
Performance tests are done with k6. The tests are done with 50 virtual users concurrently for 10 seconds.

You should run the performance tests after starting the application with `docker-compose up`. The following commands are run in the terminal in the clone source code folder that contains the `docker-compose.yml` file.

Run:
```bash
docker-compose run --entrypoint=k6 k6 run index.js
```

```logs
  execution: local
     script: index.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 40s max duration (incl. graceful stop):
           * default: 50 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 00/50 VUs, 36009 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 36009       ✗ 0    
     data_received..................: 46 MB   4.6 MB/s
     data_sent......................: 2.9 MB  288 kB/s
     http_req_blocked...............: avg=1.37µs  med=1.2µs   p(95)=2.1µs   p(99)=3.37µs 
     http_req_connecting............: avg=87ns    med=0s      p(95)=0s      p(99)=0s     
     http_req_duration..............: avg=13.84ms med=15.58ms p(95)=22.3ms  p(99)=27.1ms 
       { expected_response:true }...: avg=13.84ms med=15.58ms p(95)=22.3ms  p(99)=27.1ms 
     http_req_failed................: 0.00%   ✓ 0           ✗ 36009
     http_req_receiving.............: avg=23.04µs med=21.26µs p(95)=39.75µs p(99)=63.55µs
     http_req_sending...............: avg=5.34µs  med=4.89µs  p(95)=8.62µs  p(99)=14.54µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s     
     http_req_waiting...............: avg=13.82ms med=15.55ms p(95)=22.26ms p(99)=27.06ms
     http_reqs......................: 36009   3597.010693/s
     iteration_duration.............: avg=13.89ms med=15.62ms p(95)=22.35ms p(99)=27.18ms
     iterations.....................: 36009   3597.010693/s
     vus............................: 50      min=50        max=50 
     vus_max........................: 50      min=50        max=50
```

## Reflection
As we serve the frontend using react as static files, we can easily scale the front end to handle more traffic. The API is usually the bottleneck of the system, but in this project, we scaled the API using kubernetes to handle more traffic by adding more instances of the API. Currently, we do not have a cache for the database, so this can get improved. Furtherly, we can caching the data using redis and database index. We can cache the data in the API and serve it to the front end. This will reduce the number of requests to the database and further improve the performance of the API.

Now the API using one instance message queue RabbitMQ to make pages synced. This is a good solution for the current situation, but we can improve it by using a pub/sub system like Kafka. Kafka is a distributed streaming platform that can handle a lot of traffic. It is also a good solution for the current situation, but it is more complex to set up and maintain.

To maximum the performance of the application, we already use an kubernetes ingress to distribute the requests to multiple pods. If we want to improve the performance of page rendering, like reducing the page latency, we can use a CDN to cache the static files, so that the client can directly request the static files from the CDN, and the server does not need to send a response to the client.
