FROM node:latest AS builder
WORKDIR /app
COPY ./react-events/package*.json ./
RUN ["npm", "install"]
COPY react-events .
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]