# Use the official lightweight Bun image
FROM oven/bun:alpine

# Set working directory
WORKDIR /app

# Copy configuration and dependency manifest files
COPY package.json bun.lock tsconfig.json ./

# Install dependencies using the frozen lockfile
RUN bun install --frozen-lockfile

# Copy the rest of the source code
COPY src ./src
COPY build.ts ./build.ts

# Build the production bundle
RUN bun run build

# Expose the default server port
EXPOSE 3000

# Run in production mode
ENV NODE_ENV=production

# Start the server
CMD ["bun", "run", "start"]
