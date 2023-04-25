FROM node:13-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password


# set default dir so that next commands executes in /home/app dir
WORKDIR /usr/server

COPY package.json .
COPY package-lock.json .

RUN npm install nodemon
# will execute npm install in /home/app because of WORKDIR
RUN npm install

COPY . .

# RUN npm run build
# RUN npm test
# Run the application
CMD ["sh","-c", "npm run start"]