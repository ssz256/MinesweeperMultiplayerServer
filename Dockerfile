FROM node:9-slim
WORKDIR /wsserver
COPY package.json ./app
RUN npm install