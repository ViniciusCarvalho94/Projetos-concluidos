FROM node:alpine
EXPOSE 3001
WORKDIR /app
ADD ./node_modules.tar.gz ./
COPY ./ ./
ENTRYPOINT [ "npm", "start" ]