FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production

# Dépendances système utiles (curl pour le healthcheck)
RUN apk add --no-cache curl

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/src ./src
COPY backend/public ./public
COPY backend/.sequelizerc ./
COPY database /database

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

ENV NODE_ENV=${NODE_ENV}

CMD ["node", "src/index.js"]
