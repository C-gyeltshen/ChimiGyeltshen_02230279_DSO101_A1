# Base image
FROM node:lts-alpine3.17 AS base

# Builder stage
FROM base AS builder

# Install glibc compatibility
RUN apk add --no-cache gcompat

WORKDIR /app

# Copy dependency files and install
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the files needed for build and Prisma
COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

# Generate Prisma client & build app
RUN npx prisma generate
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Final runtime image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

# Copy production deps and built code
COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json
COPY --from=builder --chown=hono:nodejs /app/prisma /app/prisma

# Use non-root user
USER hono

# Expose the port your app uses
EXPOSE 8080

# Deploy DB schema then run the app
CMD ["sh", "-c", "npx prisma migrate deploy && node /app/dist/index.js"]
