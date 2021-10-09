FROM node:alpine
WORKDIR /usr/app/library-backend
EXPOSE 8080
COPY ./ ./
RUN npm install
CMD ["node", "server.js"]