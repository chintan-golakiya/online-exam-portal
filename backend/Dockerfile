FROM node:13-alpine

WORKDIR /usr/backend

COPY . .

RUN rm -rf node_modules/ package-lock.json


RUN npm install nodemon

RUN npm install


CMD ["sh","-c", "npm run start"]