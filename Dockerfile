FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY . .

RUN yarn global add pm2@2.4.4 && pm2 --version
RUN yarn global add ts-node

RUN pm2 --version
RUN pm2 install typescript

ADD package.json .
ADD yarn.lock .

RUN yarn --production
EXPOSE 3004 80

CMD ["pm2-docker", "process.yml"]
