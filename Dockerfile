FROM node:18.16
WORKDIR /app
COPY package*.json ./
RUN pnpm i
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]

# sudo docker build --tag node-docker .
# sudo docker run -p 5000:5000 node-docker