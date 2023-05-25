# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm build --prod --base-href=/goldsmith-frontend/

# Expose port 80 for the application
EXPOSE 4200
# Start the application
CMD ["npm", "run", "start"]
