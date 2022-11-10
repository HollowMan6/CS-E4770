# CS-E4770 Second course project: Exercise Practice

## Contents

The application starts on port `7800`.

This application should pass with merits:
1. A main page with a list of programming exercises. Clicking the exercise title shows a handout, a textarea into which a solution (code) can be written, and a button that can be used to submit the solution for grading, and also a button for navigating back.
2. Randomly created user token on opening the application for the first time. The user token is stored in localstorage and is used to identify the user in the future.
3. When a solution has been submitted for grading, the user is shown the result once the grading has finished.
4. A database for storing user-specific submissions and grading results.
5. Handling submission peaks consisting of thousands of code submissions within a minute by storing submissions into a queue using RabbitMQ that is processed whenever consumed.
6. The exercise list on the main page shows which exercises the user has completed using a strike-through.
7. The main page lists always at most three non-completed exercises (and
all completed exercises).
8. The application features a cache of exercise submissions and the corresponding grading results id by using exact string matching when checking whether a code is already in the cache – do account for different exercises!
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
Performance tests are done with k6. The tests are done with 50 virtual users concurrently for 10 seconds.

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


running (10.0s), 0/5 VUs, 16403 complete and 0 interrupted iterations
default ✓ [======================================] 5 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 16403       ✗ 0
     data_received..................: 3.3 MB  329 kB/s
     data_sent......................: 4.5 MB  454 kB/s
     http_req_blocked...............: avg=2.17µs  med=1.57µs  p(95)=3.73µs   p(99)=5.63µs
     http_req_connecting............: avg=141ns   med=0s      p(95)=0s       p(99)=0s
     http_req_duration..............: avg=2.93ms  med=2.66ms  p(95)=4.95ms   p(99)=7.94ms
       { expected_response:true }...: avg=2.93ms  med=2.66ms  p(95)=4.95ms   p(99)=7.94ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 16403
     http_req_receiving.............: avg=42.57µs med=33.84µs p(95)=100.49µs p(99)=146.64µs
     http_req_sending...............: avg=13.05µs med=8.14µs  p(95)=42.13µs  p(99)=65.74µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=2.87ms  med=2.61ms  p(95)=4.88ms   p(99)=7.82ms
     http_reqs......................: 16403   1639.928037/s
     iteration_duration.............: avg=3.04ms  med=2.76ms  p(95)=5.16ms   p(99)=8.17ms
     iterations.....................: 16403   1639.928037/s
     vus............................: 5       min=5         max=5
     vus_max........................: 5       min=5         max=5
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

### API: Get grading results
Run:
```bash
docker-compose run --entrypoint=k6 k6 run result.js
```

```logs
  execution: local
     script: result.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 40s max duration (incl. graceful stop):
           * default: 50 looping VUs for 10s (gracefulStop: 30s)


running (10.0s), 00/50 VUs, 87228 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 87228     ✗ 0
     data_received..................: 18 MB   1.8 MB/s
     data_sent......................: 7.7 MB  767 kB/s
     http_req_blocked...............: avg=1.81µs med=1.51µs  p(95)=2.46µs p(99)=4.02µs
     http_req_connecting............: avg=115ns  med=0s      p(95)=0s     p(99)=0s
     http_req_duration..............: avg=5.67ms med=5.25ms  p(95)=8.08ms p(99)=10.03ms
       { expected_response:true }...: avg=5.67ms med=5.25ms  p(95)=8.08ms p(99)=10.03ms
     http_req_failed................: 0.00%   ✓ 0         ✗ 87228
     http_req_receiving.............: avg=24.7µs med=22.64µs p(95)=48.8µs p(99)=80.98µs
     http_req_sending...............: avg=6.88µs med=6.18µs  p(95)=9.78µs p(99)=26.74µs
     http_req_tls_handshaking.......: avg=0s     med=0s      p(95)=0s     p(99)=0s
     http_req_waiting...............: avg=5.64ms med=5.22ms  p(95)=8.04ms p(99)=10ms
     http_reqs......................: 87228   8720.0014/s
     iteration_duration.............: avg=5.72ms med=5.3ms   p(95)=8.13ms p(99)=10.08ms
     iterations.....................: 87228   8720.0014/s
     vus............................: 50      min=50      max=50
     vus_max........................: 50      min=50      max=50
```

## Reflection
As we store all the questions data into the front end and serve it as static files, we can easily scale the front end to handle more traffic. However, the API is the bottleneck of the system. We can scale the API to handle more traffic by adding more instances of the API. Currently, we only have cache for the submission grader result. However, furtherly, we can also improve the performance of the API by caching the data using redis. We can cache the data in the API and serve it to the front end. This will reduce the number of requests to the database and improve the performance of the API.

In addition, we can also improve the performance of the API by using multiple nodes for message queue to handle the submission concurrently. Currently, the API handles the submission using a message queue like RabbitMQ, grader can only consume the message from the message queue on by one. However, we can use multiple nodes for message queue to handle the submission. This will improve the performance.
