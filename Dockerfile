FROM node:14.16
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]

# sudo docker build --tag node-docker .
# sudo docker run -p 5000:5000 node-docker