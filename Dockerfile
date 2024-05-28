#ESPECIFICO A IMAGEM DE PARTIDA
FROM node:16.20.2-slim

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm ci

# Copia todo o código do projeto para o diretório de trabalho
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o aplicativo React
# Para simular produção melhor configurar o ambiente no nginx
CMD ["npm", "start"]

