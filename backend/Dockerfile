FROM node:18-alpine

USER node
WORKDIR /home/node

# Copy package files first to leverage Docker caching
COPY --chown=node:node package*.json ./
RUN npm ci

# Then copy the rest of the application code
COPY --chown=node:node . .

ARG PORT
ENV PORT=${PORT:-8080}
EXPOSE ${PORT:-8080}

CMD ["npm", "run", "start"]