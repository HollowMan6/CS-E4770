FROM python:3.10
EXPOSE 7777
WORKDIR /app
COPY . .
RUN pip3 install -r requirements.txt
CMD ["gunicorn", "--bind", "0.0.0.0:7777", "--workers", "2", "app:app"]
