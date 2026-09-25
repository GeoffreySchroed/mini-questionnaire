JustBetweenUs V2.1 — Dashboard mobile réorganisé

Nouvelle hiérarchie :
1. Bienvenue / rôle / déconnexion
2. Questionnaire : lien + QR
3. Raccourcis : Personnalisation, Questions, Administrateurs, Mon compte
4. Résultats
5. Personnalisation
6. Questions
7. Administrateurs
8. Mon compte

Navigation basse mobile :
- Accueil
- Profils
- Favoris

Badge Profils :
- Il compte uniquement les participations jamais examinées.
- Une participation est marquée examinée à l'ouverture de sa fiche.
- Il ne dépend plus du statut « À contacter ».
- La migration SQL considère les participations déjà existantes comme examinées afin de démarrer avec un badge à zéro.

À faire avant test :
Exécuter V2.1_SQL_NOUVEAUX_PROFILS.sql dans Supabase SQL Editor.

Aucun autre changement de base de données.

Ajustement mobile : la recherche participant et le tri d'affichage de la section Résultats sont masqués sur GSM, car l'écran Profils possède déjà sa propre recherche. Ils restent disponibles sur PC.

Interface GSM épurée : Recherche participant, Ordre d'affichage et boutons Top 5 / Top 10 / Tous sont masqués dans Résultats. Ils restent disponibles sur ordinateur.

Ajustement mobile : la liste complète des cartes participants sous Comparer deux profils est masquée. Les profils se consultent désormais via l'onglet Profils. Le résultat d'une comparaison reste affiché dans la zone de comparaison.

Ajustement mobile : les boutons de classement Amis / Un soir / Couple sont masqués sur GSM. Ils restent disponibles sur ordinateur.

QR mobile : un simple appui/clic sur le QR télécharge l'image JustBetweenUs-QR.png. Aucun bouton supplémentaire. Compatible avec le rendu canvas ou image de la bibliothèque QR.

Correction Android QR : l'appui utilise maintenant la feuille de partage native Android avec le PNG du QR. Cela permet de l'enregistrer via Fichiers/Photos selon le téléphone. Un téléchargement classique reste prévu en secours sur les navigateurs sans partage de fichiers.
