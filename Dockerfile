# récupération de l'image de node
FROM node:20

# Création du répertoire de travail
WORKDIR /usr/src/server

# Copie des fichiers package.json et package-lock.json dans le répertoire de travail du conteneur
COPY ./server/package*.json ./

# Installation des dépendances
RUN yarn add sharp --ignore-engines
RUN yarn install

# Copie du code source dans le répertoire de travail du conteneur
COPY ./server .

# Exposition du port 8050
EXPOSE 8050

# Commande pour lancer le serveur
CMD ["yarn", "start"]