FROM node:13-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /usr/user-frontend

COPY . .
RUN rm -rf node_modules/ package-lock.json
RUN npm install
RUN npm run build



# Run the application
CMD ["sh","-c", "npm start"]