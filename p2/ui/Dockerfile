FROM denoland/deno:alpine-1.26.2

EXPOSE 7778

WORKDIR /app

COPY . .

RUN deno cache deps.js

CMD [ "run", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app.js" ]