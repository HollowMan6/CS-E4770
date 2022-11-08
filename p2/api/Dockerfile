FROM denoland/deno:alpine-1.26.2

RUN apk add --update docker openrc

EXPOSE 7777

WORKDIR /app

COPY . .

RUN deno cache deps.js

CMD [ "run", "--watch", "--allow-net", "--allow-read", "--allow-run", "--allow-env", "--allow-write", "--no-check", "app.js" ]