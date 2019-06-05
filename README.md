# Unknown Legend - projet de Dataviz

## Installation du projet en local

##### Importez la base de donnée 

Créez une base de donnée 'dataviz' puis importer les datas dans le fichier /server/data.sql avec la commande suivante :
<code>mysql -u username -p dataviz < path/to/file/data.sql</code>

##### Lancer le serveur node
Se placer dans le dossier server et lancez les commande suivante :
<code>npm install</code>
<code>node server.js</code>

:warning: Dans le fichier server.js, il faut modifier les variables de connection

##### Lancer la dataviz
Aller dans le dossier client
<code>npm install</code>
<code>npm start</code>