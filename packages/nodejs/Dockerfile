FROM node:10
WORKDIR /usr/src/app
USER node
COPY --chown=node:node .env .env
COPY --chown=node:node build/ build/
EXPOSE 4000
CMD [ "node", "build/server.js" ]