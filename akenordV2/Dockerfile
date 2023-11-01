# Use the official Node.js 14 image based on Alpine Linux
FROM node:14-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if present) to the container
# Make sure the package.json files are located in the akenordV2 directory
COPY ./package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files to the container
# This assumes that the application files are in the akenordV2 directory
COPY . .

# Expose port 3000 for the Vite development server
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev"]
