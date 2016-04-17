FROM node
RUN mkdir -p /usr/src
WORKDIR /usr/src
EXPOSE 3000
ENTRYPOINT webpack-dev-server
