FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Instalar vite globalmente para desarrollo
RUN npm install -g vite

# Exponer puerto
EXPOSE 3000

# Salud de la aplicación
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const http = require('http'); http.get('http://localhost:3000', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); })" || exit 1

# Comando de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
