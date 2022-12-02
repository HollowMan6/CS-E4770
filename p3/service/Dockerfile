FROM denoland/deno:alpine-1.26.2

RUN apk add --update bash

EXPOSE 7776

WORKDIR /app

COPY . .

RUN deno cache deps.js

RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN mv wait-for-it.sh /
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "mq:5672", "--", "deno", "run", "--watch", "--allow-net", "--allow-read", "--allow-run", "--allow-env", "--allow-write", "--no-check", "app.js" ]
