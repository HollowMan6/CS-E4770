# CS-E4770 Second course project: Exercise Practice

## Contents

The application starts on port `7800`.

This application should pass with merits:
1. A main page with a list of programming exercises. Clicking the exercise title shows a handout, a textarea into which a solution (code) can be written, and a button that can be used to submit the solution for grading, and also a button for navigating back.
2. Randomly created user token on opening the application for the first time. The user token is stored in localstorage and is used to identify the user in the future.
3. When a solution has been submitted for grading, the user is shown the result once the grading has finished.
4. A database for storing user-specific submissions and grading results.
5. Handling submission peaks consisting of thousands of code submissions within a minute by storing submissions into a queue that is processed whenever resources are available.
6. The exercise list on the main page shows which exercises the user has completed using a strike-through.
7. The main page lists always at most three non-completed exercises (and
all completed exercises).
8. The application features a cache of exercise submissions and the corresponding grading results by using exact string matching when checking whether a code is already in the cache – do account for different exercises!
9. Lighthouse Performance score 100 for the web page (I show both the main page and the web page with same url).

## Starting and shutting down

Using Docker Compose.

- To start the application, open up the terminal in the source code folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Core Web Vitals tests
Using [Lighthouse](https://developers.google.com/web/tools/lighthouse) to test the Core Web Vitals of the application.

Performance: 100
Accessibility: 100
Best Practices: 99

## Performance tests
Performance tests are done with k6. The tests are done with 50 virtual users concurrently for 12 seconds.

You should run the performance tests after starting the application with `docker-compose up`. The following commands are run in the terminal in the clone source code folder that contains the `docker-compose.yml` file.

### The main/exercise page
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


running (10.0s), 00/50 VUs, 7330 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 7330      ✗ 0
     data_received..................: 98 MB   9.8 MB/s
     data_sent......................: 586 kB  58 kB/s
     http_req_blocked...............: avg=8.68µs  med=2.14µs  p(95)=5.65µs   p(99)=21.66µs
     http_req_connecting............: avg=791ns   med=0s      p(95)=0s       p(99)=0s
     http_req_duration..............: avg=68.31ms med=66.11ms p(95)=102.49ms p(99)=123.2ms
       { expected_response:true }...: avg=68.31ms med=66.11ms p(95)=102.49ms p(99)=123.2ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 7330
     http_req_receiving.............: avg=71.59µs med=47.87µs p(95)=155.3µs  p(99)=429.42µs
     http_req_sending...............: avg=13.83µs med=8.42µs  p(95)=24.91µs  p(99)=76.05µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=68.22ms med=66.05ms p(95)=102.43ms p(99)=123.11ms
     http_reqs......................: 7330    729.69905/s
     iteration_duration.............: avg=68.41ms med=66.19ms p(95)=102.59ms p(99)=123.26ms
     iterations.....................: 7330    729.69905/s
     vus............................: 50      min=50      max=50
     vus_max........................: 50      min=50      max=50
```

### API: Code Submission to the database
Run:
```bash
docker-compose run --entrypoint=k6 k6 run form.js
```

```logs
  execution: local
     script: form.js
     output: -

  scenarios: (100.00%) 1 scenario, 5 max VUs, 40s max duration (incl. graceful stop):
           * default: 5 looping VUs for 10s (gracefulStop: 30s)


running (23.3s), 0/5 VUs, 7 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 7        ✗ 0
     data_received..................: 1.4 kB 62 B/s
     data_sent......................: 1.9 kB 83 B/s
     http_req_blocked...............: avg=251.26µs med=253.63µs p(95)=462.22µs p(99)=479.99µs
     http_req_connecting............: avg=186.83µs med=210.32µs p(95)=316.01µs p(99)=325.55µs
     http_req_duration..............: avg=11.49s   med=11.32s   p(95)=19.86s   p(99)=21s
       { expected_response:true }...: avg=13.07s   med=11.98s   p(95)=20.1s    p(99)=21.05s
     http_req_failed................: 0.00%   ✓ 0        ✗ 7
     http_req_receiving.............: avg=137.56µs med=129.29µs p(95)=221.92µs p(99)=222.6µs
     http_req_sending...............: avg=55.29µs  med=50.78µs  p(95)=84.15µs  p(99)=88.71µs
     http_req_tls_handshaking.......: avg=0s       med=0s       p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=11.49s   med=11.32s   p(95)=19.86s   p(99)=21s
     http_reqs......................: 7      0.299925/s
     iteration_duration.............: avg=11.5s    med=11.32s   p(95)=19.86s   p(99)=21s
     iterations.....................: 7      0.299925/s
     vus............................: 1      min=1      max=5
     vus_max........................: 5      min=5      max=5
```

### API: Get user completed exercises
Run:
```bash
docker-compose run --entrypoint=k6 k6 run status.js
```

```logs
  execution: local
     script: status.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 40s max duration (incl. graceful stop):
           * default: 50 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 00/50 VUs, 84692 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 84692       ✗ 0
     data_received..................: 22 MB   2.2 MB/s
     data_sent......................: 10 MB   1.0 MB/s
     http_req_blocked...............: avg=1.91µs  med=1.52µs  p(95)=2.45µs  p(99)=3.92µs
     http_req_connecting............: avg=144ns   med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=5.84ms  med=5.38ms  p(95)=8.33ms  p(99)=11.96ms
       { expected_response:true }...: avg=5.84ms  med=5.38ms  p(95)=8.33ms  p(99)=11.96ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 84692
     http_req_receiving.............: avg=25.92µs med=23.38µs p(95)=53.26µs p(99)=90.84µs
     http_req_sending...............: avg=7.06µs  med=6.35µs  p(95)=10.02µs p(99)=29.43µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=5.81ms  med=5.35ms  p(95)=8.29ms  p(99)=11.92ms
     http_reqs......................: 84692   8466.234953/s
     iteration_duration.............: avg=5.89ms  med=5.44ms  p(95)=8.39ms  p(99)=12.03ms
     iterations.....................: 84692   8466.234953/s
     vus............................: 50      min=50        max=50
     vus_max........................: 50      min=50        max=50
```

## Reflection
As we store all the questions data into the front end and serve it as static files, we can easily scale the front end to handle more traffic. However, the API is the bottleneck of the system. We can scale the API to handle more traffic by adding more instances of the API. Currently, we only have cache for the submission grader result. However, furtherly, we can also improve the performance of the API by caching the data using redis. We can cache the data in the API and serve it to the front end. This will reduce the number of requests to the database and improve the performance of the API.

In addition, we can also improve the performance of the API by using a message queue to handle the submission. Currently, the API will handle the submission and directly send the submission to the grader. However, we can use a message queue like RabbitMQ to handle the submission. The API will send the submission to the message queue and the grader will consume the message from the message queue. This will reduce the chance for grader crash.
