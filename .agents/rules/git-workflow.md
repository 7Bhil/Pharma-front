# Protocole Git & Workflow de Branche - PharmaConnect

Ce document dicte les règles strictes d'automatisation et de discipline Git pour toute session de travail sur PharmaConnect. L'agent d'IA **doit impérativement respecter ce protocole à chaque tâche**.

---

## 1. Règle d'or absolue
- **INTERDICTION FORMELLE de commiter ou pousser directement sur `main` ou `master`.**
- Toute modification doit obligatoirement transiter par une branche dédiée.

---

## 2. Quand faut-il créer une nouvelle branche (ou pas) ?

###  IL FAUT CRÉER une nouvelle branche quand :
1. **Nouvelle fonctionnalité (Feature)** : 
   - Ajout d'une page, d'un composant, d'une route, d'une intégration API.
   - Préfixe obligatoire : `feature/<nom-court>` (ex: `feature/cart-prescription`, `feature/pharmacy-map`).
2. **Correction de bug distinct (Fix / Bugfix)** :
   - Correction d'un problème sur une fonctionnalité déjà fusionnée ou autonome.
   - Préfixe obligatoire : `fix/<nom-court>` (ex: `fix/search-filter-accent`, `fix/navbar-mobile-toggle`).
3. **Changement d'infrastructure ou de configuration (Chore / Refactor)** :
   - Mise à jour de dépendances, configuration CI/CD, réorganisation de fichiers.
   - Préfixe obligatoire : `chore/<nom-court>` ou `refactor/<nom-court>`.
4. **Nouveau sous-projet ou nouvelle brique logique** :
   - Ne jamais mélanger le développement du backend Laravel et du frontend React dans une même branche de feature si les sujets ne sont pas strictement couplés.

### ❌ IL NE FAUT PAS créer une nouvelle branche quand :
1. **Poursuite du travail sur la même fonctionnalité en cours** :
   - Si la branche actuelle (`feature/...`) est déjà celle du sujet travaillé (ex: `feature/frontend-auth-otp` pour les écrans et formulaires d'auth/home), **continuer sur cette branche existante**.
2. **Retouches mineures ou itérations immédiates demandées par l'utilisateur** :
   - Ajuster un style, corriger un montant, modifier un libellé ou une icône demandés pendant la revue d'une feature.
3. **Simples lectures / inspections** :
   - Consulter des logs, lire le code, lancer des tests ou exécuter le build ne nécessite aucun changement de branche.

---

## 3. Checklist automatique avant tout travail

Avant d'écrire ou modifier le moindre fichier, l'agent doit vérifier :
```bash
git branch --show-current
```
- Si la branche retournée est `main` ou `master` : **STOP**.
  - Créer immédiatement la branche idoine :
    ```bash
    git checkout -b feature/<nom-de-la-tache>
    ```
- Si la branche est déjà une branche de travail dédiée : continuer.

---

## 4. Règle du Push Systématique en fin de tâche

À la fin de chaque bloc de travail validé (tests/build ok) :
1. Vérifier l'état du dépôt :
   ```bash
   git status
   ```
2. Ajouter les fichiers modifiés et commiter avec un message conventionnel clair (`feat:`, `fix:`, `refactor:`, `chore:`) :
   ```bash
   git add <fichiers>
   git commit -m "<type>: <description claire>"
   ```
3. **Pousser systématiquement sur le remote distant** :
   ```bash
   git push -u origin <nom-de-la-branche>
   ```
4. Fournir à l'utilisateur le lien direct de création de Pull Request / validation.
