FROM node
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME /usr/src/app
EXPOSE 238
ENTRYPOINT npm init
