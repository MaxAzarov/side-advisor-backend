Swagger docs: localhost:3000/api

Docker build steps:
docker build -t side-advisor-backend .
docker run -p 3000:3000 -d side-advisor-backend
