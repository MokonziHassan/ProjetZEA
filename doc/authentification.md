# Authentification

## Guard :

* Empèche les utiliseurs non identifiés d'accéder à despages restreintes sur le site
* Utilise `app.routing.ts` pour protéger les pages

## Fake Backend Provider

* Utile uniquement dans l'exemple, permet de le faire fonctionner sans backend
* Utilise MockBackend pour remplacer le backend utilisé par défaut par le service Http, il permet d'intercepter les requetes http et donne des "fake" réponses
* Utilisé pour le test unitaire

## User Model

* Définit les propriétés d'un utilisateur

## Services

### Authentication Service

* Utilise `JWT` (`JSON Web Tokens`)
* Permet de se logger/délogger de l'appli
* Pour se logger : envoi les idetifiants de l'utilisateur à l'API et vérifie le token renvoyé. Si il y en a un -> l'authentification est réussie, les détails de l'utilisateur sont ajoutés au stockage local et le token est sauvegardé dans l'`AuthenticationService.token`
* Ce token est utilisé par les autres services de l'application pour paramétrer les autorisations des requêtes http pour sécuriser l'api
* Les détails de l'utilisateur sont stockés en local ainsi il reste logger même si il rafraichit la page ou si il ferme son navigateur
* On peut facilement changer cela en stockant les données sur qqc de moins perssistatn comme dans les données de session ou dans une propriété du service d'authentification

### User Service

* Contient une méthode pour récupérer tout les utilsateurs de l'api
* Dans cet exemple, le "secure endpoint" est un faux implémenté par le backend provider

## Home Component

* Définit un composant Angular qui récupère tout les utilisateurs depuis le `user service` et les rend disponible via la propriété `users`

### Template

* Contient de la syntax Html & Angular pour afficher un message de bienvenu, une liste d'utilisateur et un lien de logout

## Login Component

* Utilise l' `Authentication Service` pour se logger et déconnecter de l'application.
* Il déconnecte l'utilisateur automatiquement à l'initialisation pour que la page de login puisse aussi être utilisé comme la page de déconnexion.

### Template

* Contient un formulaire de login avec un champ username et password
* Il affiche un message de validation pour les champs invalides quand le bouton `submit` est cliqué
* La méthode `login()` est appelé
