FROM node:14-alpine

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app
RUN npm run build


FROM nginx:alpine
COPY --from=0 /app/build/ /html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
