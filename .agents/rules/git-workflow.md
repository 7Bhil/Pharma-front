# Workflow Git Strict - PharmaConnect

1. **Interdiction de commiter/push sur `main` ou `master` directement.**
2. Toujours créer ou basculer sur une branche dédiée avant d'éditer ou commiter :
   - `feature/<nom>` pour les fonctionnalités
   - `fix/<nom>` pour les corrections
   - `chore/<nom>` pour la config / infra / CI
3. Avant tout commit ou push, vérifier la branche courante avec `git branch --show-current`.
4. Ne jamais pousser sur le main : toujours passer par une Pull Request ou demande explicite de l'utilisateur.
