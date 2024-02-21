const express = require('express');
const app = express(); // Création d'une nouvelle application express
const path = require('path'); // Importation du module path pour gérer les chemins de fichiers
const cors = require('cors'); // Importation du module cors pour gerer les origines

app.use(cors()); // Configuration de l'application pour utiliser le module cors
app.use(express.json()); // Configuration de l'application pour utiliser le format JSON
app.use(express.urlencoded({ extended: true })); // Configuration de l'analyseur de corps de requête pour analyser les requêtes en format JSON
app.use(express.static(path.join(__dirname, "public"))); // Configuration du dossier static pour servir les fichiers statiques

const db = require("./models"); // Importation du modèle de la base de données
db.sequelize.sync().then(()=> console.log('db synchronisé')); // Synchronisation du modèle avec la base de données

// Importation des routes
const todoRoute = require('./routes/todo.routes');
app.use('/api/todo',todoRoute); // Configuration de l'application pour utiliser les routes de todo
const figureRoute = require('./routes/figure.routes');
app.use('/api/figure', figureRoute); // Configuration de l'application pour utiliser les routes de figure
const convertPictureRoute = require('./routes/convertPicture.routes');
app.use('/api', convertPictureRoute); // Configuration de l'application pour utiliser les routes de convertPicture


// Swagger API documentation
const swaggerUi = require('swagger-ui-express'); // Importation du module swagger-ui-express
const yaml = require('yamljs'); // Importation du module yamljs
const swaggerDocs = yaml.load('swagger.yaml'); // Importation du fichier swagger.yaml
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Configuration de swagger-ui-express pour servir la documentation Swagger

// Gestion des erreurs
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Erreur interne du serveur' });
  });
  // Gestion des routes non trouvées (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Route non trouvée' });
  });


const port = process.env.PORT || 8050; // Définition du port sur lequel le serveur sera lancé
// Démarrage du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    }
);