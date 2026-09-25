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
