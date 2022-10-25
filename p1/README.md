# CS-E4770 First course project: Shorten URL

## Contents

All the three clones of application start on port `7777`.

The [first clone](1) is realized using Oak in JavaScript, the [second clone](2) is realized using vanilla Deno in JavaScript, too. The [third clone](3) is realized using Flask in Python.

Each of them has:
- http://localhost:7777 has a form which users can write URLs that need to be shortened and submit.
- http://localhost:7777/random to redirect to a random URL in the database.
- A PostgreSQL database that stores the URLs and their shortened tags.
- When a user accesses a shortened version of the URL,the server returns a response that redirects the user to the new URL.

## Starting and shutting down

All the clones is used with Docker Compose.

- To start the application, open up the terminal in the clone source code folder that
  contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the application, press `ctrl+C` (or similar) in the same terminal
  where you wrote the command `docker-compose up`. Another option is to open up
  a new terminal and navigate to the folder that contains the
  `docker-compose.yml` file, and then write `docker-compose stop`.

## Performance tests
Performance tests are done with k6. The tests are done with 50 virtual users concurrently for 12 seconds.

You should run the performance tests after starting the application with `docker-compose up`. The following commands are run in the terminal in the clone source code folder that contains the `docker-compose.yml` file.

### The main page
Run:
```bash
docker-compose run --entrypoint=k6 k6 run index.js
```

#### 1
```logs
running (13.1s), 00/50 VUs, 516 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 516       ✗ 0
     data_received..................: 395 kB  30 kB/s
     data_sent......................: 41 kB   3.1 kB/s
     http_req_blocked...............: avg=113.44µs med=712ns  p(95)=1.13ms   p(99)=1.39ms
     http_req_connecting............: avg=50.11µs  med=0s     p(95)=528.29µs p(99)=887.88µs
     http_req_duration..............: avg=1.24s    med=1.14s  p(95)=1.86s    p(99)=5.63s
       { expected_response:true }...: avg=1.24s    med=1.14s  p(95)=1.86s    p(99)=5.63s
     http_req_failed................: 0.00%   ✓ 0         ✗ 516
     http_req_receiving.............: avg=22.96µs  med=11.3µs p(95)=66.49µs  p(99)=110.92µs
     http_req_sending...............: avg=8.81µs   med=3.37µs p(95)=38.66µs  p(99)=88.22µs
     http_req_tls_handshaking.......: avg=0s       med=0s     p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=1.24s    med=1.14s  p(95)=1.86s    p(99)=5.63s
     http_reqs......................: 516     39.342131/s
     iteration_duration.............: avg=1.24s    med=1.14s  p(95)=1.86s    p(99)=5.64s
     iterations.....................: 516     39.342131/s
     vus............................: 8       min=8       max=50
     vus_max........................: 50      min=50      max=50
```

#### 2
```logs
running (14.2s), 00/50 VUs, 298 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 298       ✗ 0
     data_received..................: 228 kB  16 kB/s
     data_sent......................: 24 kB   1.7 kB/s
     http_req_blocked...............: avg=78.99µs med=2.07µs p(95)=531.82µs p(99)=1.17ms
     http_req_connecting............: avg=43.29µs med=0s     p(95)=217.91µs p(99)=849.26µs
     http_req_duration..............: avg=2.19s   med=1.38s  p(95)=9.25s    p(99)=14.11s
       { expected_response:true }...: avg=2.19s   med=1.38s  p(95)=9.25s    p(99)=14.11s
     http_req_failed................: 0.00%   ✓ 0         ✗ 298
     http_req_receiving.............: avg=59.46µs med=40.5µs p(95)=152.11µs p(99)=327.28µs
     http_req_sending...............: avg=26.46µs med=9.8µs  p(95)=105.52µs p(99)=253.86µs
     http_req_tls_handshaking.......: avg=0s      med=0s     p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=2.19s   med=1.38s  p(95)=9.25s    p(99)=14.11s
     http_reqs......................: 298     20.916316/s
     iteration_duration.............: avg=2.19s   med=1.38s  p(95)=9.25s    p(99)=14.11s
     iterations.....................: 298     20.916316/s
     vus............................: 6       min=6       max=50
     vus_max........................: 50      min=50      max=50
```

#### 3
```logs
running (12.0s), 00/50 VUs, 87701 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 87701       ✗ 0
     data_received..................: 70 MB   5.9 MB/s
     data_sent......................: 7.0 MB  584 kB/s
     http_req_blocked...............: avg=78.63µs med=66.21µs p(95)=158.07µs p(99)=243.16µs
     http_req_connecting............: avg=56.05µs med=47.85µs p(95)=124.67µs p(99)=212.13µs
     http_req_duration..............: avg=6.73ms  med=6.59ms  p(95)=7.92ms   p(99)=9.35ms
       { expected_response:true }...: avg=6.73ms  med=6.59ms  p(95)=7.92ms   p(99)=9.35ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 87701
     http_req_receiving.............: avg=36.7µs  med=32.24µs p(95)=60.17µs  p(99)=105.76µs
     http_req_sending...............: avg=20.25µs med=15.04µs p(95)=38.24µs  p(99)=57.93µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=6.67ms  med=6.54ms  p(95)=7.83ms   p(99)=9.27ms
     http_reqs......................: 87701   7303.816486/s
     iteration_duration.............: avg=6.83ms  med=6.69ms  p(95)=8.05ms   p(99)=9.47ms
     iterations.....................: 87701   7303.816486/s
     vus............................: 50      min=50        max=50
     vus_max........................: 50      min=50        max=50
```

### Submitting the form to the database
Run:
```bash
docker-compose run --entrypoint=k6 k6 run form.js
```
#### 1
```logs
running (13.3s), 00/50 VUs, 512 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 512       ✗ 0
     data_received..................: 485 kB  37 kB/s
     data_sent......................: 99 kB   7.5 kB/s
     http_req_blocked...............: avg=29.77µs med=2.25µs  p(95)=218.81µs p(99)=497.74µs
     http_req_connecting............: avg=19.94µs med=0s      p(95)=158.37µs p(99)=423.7µs
     http_req_duration..............: avg=1.23s   med=1.27s   p(95)=1.54s    p(99)=1.8s
       { expected_response:true }...: avg=1.23s   med=1.27s   p(95)=1.54s    p(99)=1.8s
     http_req_failed................: 0.00%   ✓ 0         ✗ 512
     http_req_receiving.............: avg=73.86µs med=66.42µs p(95)=111.97µs p(99)=161.61µs
     http_req_sending...............: avg=17.13µs med=13.02µs p(95)=29.31µs  p(99)=72.36µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=1.23s   med=1.27s   p(95)=1.54s    p(99)=1.8s
     http_reqs......................: 512     38.639061/s
     iteration_duration.............: avg=1.23s   med=1.27s   p(95)=1.54s    p(99)=1.8s
     iterations.....................: 512     38.639061/s
     vus............................: 11      min=11      max=50
     vus_max........................: 50      min=50      max=50
```

#### 2
```logs
running (14.8s), 00/50 VUs, 281 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 281       ✗ 0
     data_received..................: 266 kB  18 kB/s
     data_sent......................: 54 kB   3.7 kB/s
     http_req_blocked...............: avg=134.1µs  med=2.93µs  p(95)=904.4µs  p(99)=1.12ms
     http_req_connecting............: avg=108.94µs med=0s      p(95)=814.45µs p(99)=981.2µs
     http_req_duration..............: avg=2.41s    med=2.72s   p(95)=2.99s    p(99)=3.06s
       { expected_response:true }...: avg=2.41s    med=2.72s   p(95)=2.99s    p(99)=3.06s
     http_req_failed................: 0.00%   ✓ 0         ✗ 281
     http_req_receiving.............: avg=88.84µs  med=81.49µs p(95)=143.11µs p(99)=193.38µs
     http_req_sending...............: avg=42.48µs  med=16.66µs p(95)=195.25µs p(99)=309.43µs
     http_req_tls_handshaking.......: avg=0s       med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=2.41s    med=2.72s   p(95)=2.99s    p(99)=3.06s
     http_reqs......................: 281     18.935162/s
     iteration_duration.............: avg=2.41s    med=2.72s   p(95)=2.99s    p(99)=3.06s
     iterations.....................: 281     18.935162/s
     vus............................: 18      min=18      max=50
     vus_max........................: 50      min=50      max=50
```

#### 3
```logs
running (12.0s), 00/50 VUs, 21351 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 200

     checks.........................: 100.00% ✓ 21351       ✗ 0
     data_received..................: 22 MB   1.8 MB/s
     data_sent......................: 4.1 MB  343 kB/s
     http_req_blocked...............: avg=90.04µs med=84.44µs p(95)=144.91µs p(99)=242.85µs
     http_req_connecting............: avg=61.05µs med=58.88µs p(95)=102.39µs p(99)=181.12µs
     http_req_duration..............: avg=27.99ms med=27.26ms p(95)=32.08ms  p(99)=39.37ms
       { expected_response:true }...: avg=27.99ms med=27.26ms p(95)=32.08ms  p(99)=39.37ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 21351
     http_req_receiving.............: avg=54.33µs med=52.89µs p(95)=71.95µs  p(99)=118.7µs
     http_req_sending...............: avg=29.6µs  med=22.76µs p(95)=53.72µs  p(99)=71.48µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=27.9ms  med=27.18ms p(95)=31.96ms  p(99)=39.24ms
     http_reqs......................: 21351   1775.333134/s
     iteration_duration.............: avg=28.12ms med=27.39ms p(95)=32.23ms  p(99)=39.54ms
     iterations.....................: 21351   1775.333134/s
     vus............................: 50      min=50        max=50
     vus_max........................: 50      min=50        max=50
```

### Asking for redirection
Run:
```bash
docker-compose run --entrypoint=k6 k6 run redirect.js
```
#### 1
```logs
running (12.0s), 00/50 VUs, 67825 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 302

     checks.........................: 100.00% ✓ 67825      ✗ 0
     data_received..................: 17 MB   1.4 MB/s
     data_sent......................: 5.9 MB  491 kB/s
     http_req_blocked...............: avg=1.53µs  med=853ns   p(95)=1.46µs  p(99)=2.15µs
     http_req_connecting............: avg=113ns   med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=8.8ms   med=8.45ms  p(95)=10.78ms p(99)=11.98ms
       { expected_response:true }...: avg=8.8ms   med=8.45ms  p(95)=10.78ms p(99)=11.98ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 67825
     http_req_receiving.............: avg=34.52µs med=33.84µs p(95)=50.35µs p(99)=94.89µs
     http_req_sending...............: avg=4.36µs  med=3.82µs  p(95)=5.92µs  p(99)=12.79µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=8.76ms  med=8.41ms  p(95)=10.74ms p(99)=11.95ms
     http_reqs......................: 67825   5648.83825/s
     iteration_duration.............: avg=8.84ms  med=8.48ms  p(95)=10.82ms p(99)=12.03ms
     iterations.....................: 67825   5648.83825/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
```

#### 2
```logs
running (12.0s), 00/50 VUs, 88036 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 303

     checks.........................: 100.00% ✓ 88036      ✗ 0
     data_received..................: 19 MB   1.6 MB/s
     data_sent......................: 7.7 MB  638 kB/s
     http_req_blocked...............: avg=1.24µs  med=810ns   p(95)=1.49µs  p(99)=2.19µs
     http_req_connecting............: avg=186ns   med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=6.77ms  med=6.43ms  p(95)=8.66ms  p(99)=10.27ms
       { expected_response:true }...: avg=6.77ms  med=6.43ms  p(95)=8.66ms  p(99)=10.27ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 88036
     http_req_receiving.............: avg=31.22µs med=27.64µs p(95)=49.96µs p(99)=94.32µs
     http_req_sending...............: avg=4.23µs  med=3.48µs  p(95)=6.31µs  p(99)=14.9µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=6.74ms  med=6.39ms  p(95)=8.62ms  p(99)=10.23ms
     http_reqs......................: 88036   7331.40593/s
     iteration_duration.............: avg=6.81ms  med=6.46ms  p(95)=8.7ms   p(99)=10.28ms
     iterations.....................: 88036   7331.40593/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
```

#### 3
```logs
running (12.1s), 00/50 VUs, 6535 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 302

     checks.........................: 100.00% ✓ 6535       ✗ 0
     data_received..................: 2.8 MB  228 kB/s
     data_sent......................: 569 kB  47 kB/s
     http_req_blocked...............: avg=108.19µs med=94.66µs p(95)=208.67µs p(99)=293.82µs
     http_req_connecting............: avg=76.34µs  med=66.94µs p(95)=164.08µs p(99)=240.46µs
     http_req_duration..............: avg=92ms     med=91.07ms p(95)=98.78ms  p(99)=106.41ms
       { expected_response:true }...: avg=92ms     med=91.07ms p(95)=98.78ms  p(99)=106.41ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 6535
     http_req_receiving.............: avg=66.11µs  med=62.4µs  p(95)=99.24µs  p(99)=147.3µs
     http_req_sending...............: avg=30.12µs  med=24.4µs  p(95)=56.73µs  p(99)=86.27µs
     http_req_tls_handshaking.......: avg=0s       med=0s      p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=91.9ms   med=90.98ms p(95)=98.67ms  p(99)=106.27ms
     http_reqs......................: 6535    540.524306/s
     iteration_duration.............: avg=92.15ms  med=91.21ms p(95)=99.01ms  p(99)=106.63ms
     iterations.....................: 6535    540.524306/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
```

### Random redirection
Run:
```bash
docker-compose run --entrypoint=k6 k6 run random.js
```
#### 1
```logs
running (12.0s), 00/50 VUs, 68104 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 302

     checks.........................: 100.00% ✓ 68104       ✗ 0
     data_received..................: 19 MB   1.6 MB/s
     data_sent......................: 5.9 MB  488 kB/s
     http_req_blocked...............: avg=1.46µs med=917ns   p(95)=1.66µs  p(99)=2.39µs
     http_req_connecting............: avg=214ns  med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=8.76ms med=8.48ms  p(95)=10.71ms p(99)=12ms
       { expected_response:true }...: avg=8.76ms med=8.48ms  p(95)=10.71ms p(99)=12ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 68104
     http_req_receiving.............: avg=36.9µs med=34.52µs p(95)=76.38µs p(99)=114.68µs
     http_req_sending...............: avg=4.85µs med=4.08µs  p(95)=7.16µs  p(99)=16.82µs
     http_req_tls_handshaking.......: avg=0s     med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=8.72ms med=8.44ms  p(95)=10.67ms p(99)=11.95ms
     http_reqs......................: 68104   5671.268243/s
     iteration_duration.............: avg=8.8ms  med=8.52ms  p(95)=10.75ms p(99)=12.05ms
     iterations.....................: 68104   5671.268243/s
     vus............................: 50      min=50        max=50
     vus_max........................: 50      min=50        max=50
```

#### 2
```logs
running (12.0s), 00/50 VUs, 79291 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 303

     checks.........................: 100.00% ✓ 79291      ✗ 0
     data_received..................: 19 MB   1.6 MB/s
     data_sent......................: 6.8 MB  568 kB/s
     http_req_blocked...............: avg=1.11µs  med=874ns   p(95)=1.6µs   p(99)=2.3µs
     http_req_connecting............: avg=58ns    med=0s      p(95)=0s      p(99)=0s
     http_req_duration..............: avg=7.52ms  med=7.2ms   p(95)=9.54ms  p(99)=11.84ms
       { expected_response:true }...: avg=7.52ms  med=7.2ms   p(95)=9.54ms  p(99)=11.84ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 79291
     http_req_receiving.............: avg=32.68µs med=28.84µs p(95)=58.08µs p(99)=104.68µs
     http_req_sending...............: avg=4.74µs  med=3.91µs  p(95)=7.27µs  p(99)=16.92µs
     http_req_tls_handshaking.......: avg=0s      med=0s      p(95)=0s      p(99)=0s
     http_req_waiting...............: avg=7.48ms  med=7.17ms  p(95)=9.5ms   p(99)=11.79ms
     http_reqs......................: 79291   6603.05754/s
     iteration_duration.............: avg=7.56ms  med=7.24ms  p(95)=9.59ms  p(99)=11.89ms
     iterations.....................: 79291   6603.05754/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
```

#### 3
```logs
running (12.2s), 00/50 VUs, 2947 complete and 0 interrupted iterations
default ✓ [======================================] 50 VUs  12s

     ✓ is status 302

     checks.........................: 100.00% ✓ 2947       ✗ 0
     data_received..................: 1.3 MB  109 kB/s
     data_sent......................: 253 kB  21 kB/s
     http_req_blocked...............: avg=126.97µs med=102.87µs p(95)=235.5µs  p(99)=589.61µs
     http_req_connecting............: avg=85.28µs  med=71.66µs  p(95)=181.02µs p(99)=236.75µs
     http_req_duration..............: avg=205.13ms med=204.28ms p(95)=220.18ms p(99)=228.71ms
       { expected_response:true }...: avg=205.13ms med=204.28ms p(95)=220.18ms p(99)=228.71ms
     http_req_failed................: 0.00%   ✓ 0          ✗ 2947
     http_req_receiving.............: avg=73.22µs  med=68.12µs  p(95)=107.72µs p(99)=156.67µs
     http_req_sending...............: avg=34.36µs  med=28.23µs  p(95)=58.38µs  p(99)=118.4µs
     http_req_tls_handshaking.......: avg=0s       med=0s       p(95)=0s       p(99)=0s
     http_req_waiting...............: avg=205.02ms med=204.18ms p(95)=220.07ms p(99)=228.57ms
     http_reqs......................: 2947    241.610662/s
     iteration_duration.............: avg=205.31ms med=204.44ms p(95)=220.32ms p(99)=228.96ms
     iterations.....................: 2947    241.610662/s
     vus............................: 50      min=50       max=50
     vus_max........................: 50      min=50       max=50
```

### Reflection
As we can see according to the performance testing result, when compared with Flask, Deno performs worse for page rendering (The first two tests), but it performs better for redirection (The last 2 test). One of the reason is that deno may not performing very well when using page templates. One possible improvement maybe is to directly return the page content by string, instead of using templates (views). Another reason is that Deno is a single-threaded runtime, which means it can only use one core of the CPU. However, Flask is a multi-threaded runtime, which means it can use multiple cores of the CPU, and I intentionally make the Flask (gunicorn) to use 2 workers. Therefore, when many users request the page concurrently, Flask will perform better than Deno. So maybe we can continue increasing the number of workers to see if it can perform better.

When comparing Oak with vanilla Deno, we can see that Oak performs better than vanilla Deno for page rendering (The first two tests), but worse for redirection (The last 2 test). This maybe because Oak is a framework, when doing page rendering, it makes a lot of optimization, but when for redirection, it has more overhead than vanilla Deno. However, Oak provides more features than vanilla Deno, which makes it easier to develop web applications. Therefore, if we want to develop a web application, we can use Oak, but if we just want to develop a simple web server, we can use vanilla Deno.

Although the main page requests has almost the same response with submitting the form to the database, the performance of the main page is better than the performance of submitting the form to the database. This is because the main page only needs to render the page, but the form submission needs to connect to the database, which takes more time. Therefore, if we want to improve the performance of the form submission, we can use a database that is closer to the server, or use a database that is more efficient.

Rendering a page generally takes more time than redirection, because rendering a page needs to send a response that contains more information. Therefore, if we want to improve the performance of page rendering, we can use a CDN to cache the static files, so that the client can directly request the static files from the CDN, and the server does not need to send a response to the client.

To maximum the performance of the application, we can use a load balancer to distribute the requests to multiple servers, using vanilla Deno to handle the redirection, and Flask Python to handle the page rendering.
