FROM node
RUN mkdir -p /usr/src/app
RUN npm i -g nodeppt
WORKDIR /usr/src/app
EXPOSE 238
ENTRYPOINT nodeppt generate r.md -a
