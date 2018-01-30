# Using image with Node preloaded
FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Set up Node.js
COPY package*.json ./
RUN npm install --only=production
COPY . .

# Open port and run server
EXPOSE 8080
CMD [ "node", "app.js" ]
