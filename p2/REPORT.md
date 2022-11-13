# CS-E4770 Second course project: Exercise Practice

## Contents

The application starts on port `7800`.

This application should pass with merits:
1. A main page with a list of programming exercises. Clicking the exercise title shows a handout, a textarea into which a solution (code) can be written, and a button that can be used to submit the solution for grading, and also a button for navigating back.
2. Randomly created user token on opening the application for the first time. The user token is stored in localstorage and is used to identify the user in the future.
3. When a solution has been submitted for grading, record that into the database, poll the result until the grading result in the database is available. The user is shown the result once the grading has finished.
4. A database for storing user-specific submissions and grading results.
5. Handling submission peaks consisting of thousands of code submissions within a minute by storing submissions into a queue using RabbitMQ that is processed whenever consumed, processing 200 submissions maximum at the same time.
6. The exercise list on the main page shows which exercises the user has completed using a strike-through.
7. The main page lists always at most three non-completed exercises (and all completed exercises).
8. The application features a cache (first check the object stored in memory, then in database) of exercise submissions and the corresponding grading results id by using exact string matching when checking whether a code is already in the cache – do account for different exercises!
9. Lighthouse Performance score 100 for the web page (I make both the main page and the web page with same url).

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


running (10.1s), 00/50 VUs, 5809 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 5809       ✗ 0
     data_received..................: 79 MB   7.9 MB/s
     data_sent......................: 465 kB  46 kB/s
     http_req_blocked...............: avg=4.55µs  med=2.39µs  p(95)=6.83µs   p(99)=32.15µs
     http_req_connecting............: avg=666ns   med=0s      p(95)=0s       p(99)=0s
     http_req_duration..............: avg=86.11ms med=83.72ms p(95)=135.42ms p(99)=149.9ms
       { expected_response:true }...: avg=86.11ms med=83.72ms p(95)=135.42ms p(99)=149.9ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 5809
     http_req_receiving.............: avg=76.25µs med=51.7µs  p(95)=167.4µs  p(99)=440.36µs
     http_req_sending...............: avg=14.23µs med=9.23µs  p(95)=28.47µs  p(99)=104.89µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=86.02ms med=83.64ms p(95)=135.37ms p(99)=149.86ms
     http_reqs......................: 5809    577.595556/s
     iteration_duration.............: avg=86.22ms med=83.82ms p(95)=135.52ms p(99)=149.95ms
     iterations.....................: 5809    577.595556/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
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

  scenarios: (100.00%) 1 scenario, 50 max VUs, 40s max duration (incl. graceful stop):
           * default: 50 looping VUs for 10s (gracefulStop: 30s)


running (10.2s), 00/50 VUs, 8407 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 8407       ✗ 0
     data_received..................: 1.8 MB  175 kB/s
     data_sent......................: 2.3 MB  228 kB/s
     http_req_blocked...............: avg=7.73µs   med=3µs     p(95)=8.78µs   p(99)=55.81µs
     http_req_connecting............: avg=1.15µs   med=0s      p(95)=0s       p(99)=0s
     http_req_duration..............: avg=60.43ms  med=57.44ms p(95)=90.57ms  p(99)=110.71ms
       { expected_response:true }...: avg=60.43ms  med=57.44ms p(95)=90.57ms  p(99)=110.71ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 8407
     http_req_receiving.............: avg=136.64µs med=37.95µs p(95)=293.83µs p(99)=1.55ms
     http_req_sending...............: avg=36.14µs  med=14.02µs p(95)=52.47µs  p(99)=238.68µs
     http_req_tls_handshaking.......: avg=0s       med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=60.26ms  med=57.22ms p(95)=90.25ms  p(99)=110.65ms
     http_reqs......................: 8407    821.554431/s
     iteration_duration.............: avg=60.77ms  med=57.76ms p(95)=91.07ms  p(99)=111.62ms
     iterations.....................: 8407    821.554431/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
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


running (10.0s), 00/50 VUs, 79022 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 79022       ✗ 0
     data_received..................: 20 MB   2.0 MB/s
     data_sent......................: 9.6 MB  956 kB/s
     http_req_blocked...............: avg=1.67µs  med=1.43µs  p(95)=2.32µs  p(99)=3.68µs
     http_req_connecting............: avg=95ns    med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=6.27ms  med=5.9ms   p(95)=8.48ms  p(99)=10.13ms
       { expected_response:true }...: avg=6.27ms  med=5.9ms   p(95)=8.48ms  p(99)=10.13ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 79022
     http_req_receiving.............: avg=23.44µs med=21.81µs p(95)=47.59µs p(99)=75.17µs
     http_req_sending...............: avg=6.33µs  med=5.85µs  p(95)=9.02µs  p(99)=24.49µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=6.24ms  med=5.87ms  p(95)=8.45ms  p(99)=10.09ms
     http_reqs......................: 79022   7897.915326/s
     iteration_duration.............: avg=6.32ms  med=5.95ms  p(95)=8.53ms  p(99)=10.19ms
     iterations.....................: 79022   7897.915326/s
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


running (10.0s), 00/50 VUs, 92442 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  10s

     ✓ is status 200

     checks.........................: 100.00% ✓ 92442       ✗ 0
     data_received..................: 19 MB   1.9 MB/s
     data_sent......................: 8.1 MB  813 kB/s
     http_req_blocked...............: avg=1.61µs  med=1.34µs  p(95)=2.24µs  p(99)=3.6µs
     http_req_connecting............: avg=108ns   med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=5.35ms  med=5.01ms  p(95)=7.69ms  p(99)=9.15ms
       { expected_response:true }...: avg=5.35ms  med=5.01ms  p(95)=7.69ms  p(99)=9.15ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 92442
     http_req_receiving.............: avg=22.25µs med=20.34µs p(95)=45.15µs p(99)=74.82µs
     http_req_sending...............: avg=6.11µs  med=5.58µs  p(95)=8.88µs  p(99)=24.01µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=5.32ms  med=4.98ms  p(95)=7.66ms  p(99)=9.11ms
     http_reqs......................: 92442   9240.860227/s
     iteration_duration.............: avg=5.4ms   med=5.06ms  p(95)=7.75ms  p(99)=9.21ms
     iterations.....................: 92442   9240.860227/s
     vus............................: 50      min=50        max=50
     vus_max........................: 50      min=50        max=50
```

## Reflection
As we store all the questions data into the front end and serve it as static files, we can easily scale the front end to handle more traffic. However, the API is the bottleneck of the system. We can scale the API to handle more traffic by adding more instances of the API. Currently, we only have cache for the submission grader result, this is not mature. However, furtherly, we can also improve the performance of the API by caching the data using redis. We can cache the data in the API and serve it to the front end. This will reduce the number of requests to the database and improve the performance of the API.

In addition, we can also improve the performance of the API by using multiple nodes for message queue to handle the submission concurrently. Currently, the API handles the submission using a message queue like RabbitMQ, grader can only consume the message from the message queue on by one. However, we can use multiple nodes for message queue to handle the submission. This will improve the performance.
