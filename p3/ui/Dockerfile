FROM node:16
COPY react .
RUN npm i && npm run build

FROM denoland/deno:alpine-1.26.2
EXPOSE 7778

WORKDIR /app
RUN apk add --update npm
COPY app.js .
COPY deps.js .
RUN mkdir -p react/build
COPY --from=0 build react/build

RUN deno cache deps.js
CMD [ "run", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app.js" ]