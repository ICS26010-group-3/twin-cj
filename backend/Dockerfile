# ====== Stage 1: Build ======
FROM node:23-slim AS builder

WORKDIR /src

# Install ALL dependencies (including devDependencies like TypeScript)
COPY package*.json ./
RUN npm install
RUN apt-get update -y && apt-get install -y openssl

# Copy prisma schema and generate client
ENV DATABASE_URL="file:twincj.db"
COPY prisma ./prisma
RUN npx prisma generate --schema ./prisma

# Copy source files
COPY . .

# Build the app (needs tsc from devDependencies)
RUN npm run build

# ====== Stage 2: Production ======
FROM node:23-slim

WORKDIR /src

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy only built files and Prisma folder
COPY --from=builder /src/dist ./dist
COPY --from=builder /src/prisma ./prisma
COPY --from=builder /src/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /src/node_modules/@prisma/client ./node_modules/@prisma/client

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

# Run the built app
CMD ["node", "dist/index.js"]
