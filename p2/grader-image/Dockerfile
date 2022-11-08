FROM alpine:3.16

RUN apk add bash

WORKDIR /app

COPY grade.sh /app/grade.sh
RUN mkdir -p /app/submission/

# Ensure rights
RUN chmod +x *.sh

RUN adduser user --disabled-password
# Don't let random users run random stuff as root (even in a container)
RUN chown -R user:users /app

USER user

CMD ["./grade.sh"]