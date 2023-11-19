FROM node:16

# Create App directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 7777
CMD ["npm","run","start"]