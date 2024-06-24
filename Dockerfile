# Build stage
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./

RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

RUN pnpm install
COPY ./ .
RUN pnpm build

# Production stage
FROM nginx:latest
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
