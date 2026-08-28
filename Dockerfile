FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_BASE_URL=/api/v1
ARG VITE_HOSPITAL_API_BASE_URL=/hospital-api/v1
ARG VITE_WS_ENDPOINT=/api/v1/stream
ARG VITE_USE_MOCKS=true
ARG VITE_USE_MOCK_AUTH=true
ARG VITE_CALLS_API_ENABLED=true
ARG VITE_OBSERVABILITY_API_ENABLED=true

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_HOSPITAL_API_BASE_URL=$VITE_HOSPITAL_API_BASE_URL
ENV VITE_WS_ENDPOINT=$VITE_WS_ENDPOINT
ENV VITE_USE_MOCKS=$VITE_USE_MOCKS
ENV VITE_USE_MOCK_AUTH=$VITE_USE_MOCK_AUTH
ENV VITE_CALLS_API_ENABLED=$VITE_CALLS_API_ENABLED
ENV VITE_OBSERVABILITY_API_ENABLED=$VITE_OBSERVABILITY_API_ENABLED

RUN npm run build

FROM nginx:alpine AS runtime

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
