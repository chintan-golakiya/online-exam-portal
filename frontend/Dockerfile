# first stage of mode

FROM node:20-alpine As build
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@11.6.2
COPY . .
RUN npm run build

#second stage of build

FROM nginx:alpine As production
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build  /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
