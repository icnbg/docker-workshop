FROM node

ADD ./src /app
WORKDIR /app
RUN npm install
RUN echo "hello world" > file
CMD ["node", "index.js"]
