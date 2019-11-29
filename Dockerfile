FROM node:10.16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 4001
CMD [ "npm", "start" ]
