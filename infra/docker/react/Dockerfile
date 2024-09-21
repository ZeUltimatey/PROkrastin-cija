# Dockerfile for React (Node.js) with multi-stage build

# Stage 1: Build the React application
FROM node:lts AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY ./src/react-app/package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY ./src/react-app /app

# Build the React application
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:latest

# Copy custom Nginx configuration file
COPY ./infra/docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy default server configuration
COPY ./infra/docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]