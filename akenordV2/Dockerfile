FROM node:20-alpine

# Set the working directory to /app inside the container
WORKDIR /opt/app
# Copy the package.json and package-lock.json (if present) to the container
# Make sure the package.json files are located in the akenordV2 directory
COPY . .
# Install npm dependencies
RUN npm install
# Copy the rest of the application files to the container
# This assumes that the application files are in the akenordV2 directory

# Expose port 3000 for the Vite development server
# Start the Vite development server
ENTRYPOINT ["npm", "start"]
