# Use the official Alpine version of Node.js as the base image
FROM node:18.19.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire content of the current directory to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port that your Nest.js application will run on
EXPOSE 3000

# Command to run your Nest.js application
CMD ["npm", "run", "start:prod"]