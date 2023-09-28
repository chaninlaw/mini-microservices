#Set an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
# RUN npm ci && npm cache clean --force
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application using Craco
# RUN npm run build
# Use a lightweight web server as the base image for serving the static files
# FROM nginx:alpine

# Copy the built React static files to the appropriate location
# COPY --from=builder /app/build /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/

# # Start the web server
# CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT [ "npm", "start" ]