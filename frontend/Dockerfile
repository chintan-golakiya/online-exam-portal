FROM node:13-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /usr/frontend

COPY package.json .
COPY package-lock.json .

# will execute npm install in /home/app because of WORKDIR
RUN npm install
RUN npx browserslist@latest --update-db

COPY . .

RUN npm run build

# RUN npm run test

# Run the application
CMD ["sh","-c", "npm start"]