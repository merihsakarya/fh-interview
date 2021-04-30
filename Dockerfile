##### Stage 1
FROM node:12.13.1-alpine as node
LABEL author="Merih Sakarya"
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build time argument to set NODE_ENV ('production'' by default)
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-prod}
RUN echo $NODE_ENV

COPY . .
RUN npm run build:$NODE_ENV

##### Stage 2
FROM nginx:alpine
RUN rm -R /usr/share/nginx/html/
COPY --from=node /app/dist/financial-house /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf