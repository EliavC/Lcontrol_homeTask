# שלב ראשון – בניית Angular
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# שלב שני – Nginx
FROM nginx:alpine

# העתק את קבצי הבנייה מהתיקייה האמיתית שנוצרה ב־dist
COPY --from=builder /app/dist/Lcontrol-client/browser /usr/share/nginx/html



# החלף את הקונפיג של nginx בקובץ משלך
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
