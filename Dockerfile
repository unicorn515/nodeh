FROM node:4.3
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 238
ENTRYPOINT node x.js