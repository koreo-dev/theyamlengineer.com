FROM node:alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/index.html /usr/share/nginx/html
COPY --from=build /app/scripts.js /usr/share/nginx/html
COPY --from=build /app/styles.css /usr/share/nginx/html
COPY --from=build /app/img /usr/share/nginx/html/img

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
