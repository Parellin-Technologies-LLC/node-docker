FROM node:10

# Create app directory
WORKDIR /opt/app

COPY package*.json ./

RUN npm i -g pm2
RUN npm ci --only=production

COPY ./src ./src
COPY ./ecosystem.config.js .

# Open port 3000
EXPOSE 3000

# Run command "npm start"
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]
