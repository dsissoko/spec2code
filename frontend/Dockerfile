FROM node:20-alpine AS build
ARG VITE_API_BASE_URL=http://localhost:3001/api
ARG VITE_LOG_LEVEL=info
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_LOG_LEVEL=${VITE_LOG_LEVEL}
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
