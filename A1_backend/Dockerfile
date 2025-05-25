FROM node:18-alpine

WORKDIR /app

# Copy Prisma schema and package files first (for caching and generating client early)
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

EXPOSE 8080

# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "npx prisma generate && npm run dev"]

