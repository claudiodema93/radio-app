FROM node:18-alpine as build

WORKDIR /app

# Copia i file di configurazione del progetto
COPY package.json package-lock.json* ./

# Installa le dipendenze
RUN npm ci

# Copia il codice sorgente
COPY . .

# Compila l'applicazione
RUN npm run build

# Fase di produzione
FROM nginx:alpine

# Copia i file di build dall'immagine precedente
#COPY --from=build /app/build /usr/share/nginx/html

# Copia la configurazione personalizzata di nginx (opzionale)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Esponi la porta 80
EXPOSE 80

# Avvia nginx
CMD ["nginx", "-g", "daemon off;"]