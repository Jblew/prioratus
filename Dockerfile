FROM node:14-alpine

WORKDIR /app
ADD package.json package-lock.json /app/

ADD . /app/

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]
