FROM node:lts-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx:mainline-alpine as serve

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/book-network-ui /usr/share/nginx/html

EXPOSE 80
