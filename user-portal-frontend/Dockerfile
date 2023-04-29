FROM node:13-alpine

WORKDIR /usr/user-portal-frontend

COPY . .
RUN rm -rf node_modules/ package-lock.json
RUN npm install
RUN npm run build


CMD ["sh", "-c", "npm start"]