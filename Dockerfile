# Stage 0, based on Node.js, to build and compile Angular
FROM node:latest as node
WORKDIR /front
COPY ./ /front/
RUN npm install
ARG configuration=production
RUN npm run build -- --prod

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /front/dist/examen2 /usr/share/nginx/html