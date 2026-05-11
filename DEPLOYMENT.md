# Guide de Déploiement : ShoeShop sur Vercel

Suivez ces étapes pour mettre votre plateforme e-commerce en production.

## 1. Préparation du Dépôt GitHub

1. Créez un nouveau dépôt sur GitHub.
2. Initialisez git localement (si ce n'est pas fait) :
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Platform Ready"
   git branch -M main
   git remote add origin https://github.com/votre-user/myshop.git
   git push -u origin main
   ```

## 2. Configuration sur Vercel

1. Connectez-vous à [Vercel](https://vercel.com).
2. Cliquez sur **"New Project"**.
3. Importez votre dépôt `myshop`.
4. Dans **Environment Variables**, ajoutez toutes les variables listées ci-dessous.

## 3. Variables d'Environnement Requises

| Clé | Description |
| :--- | :--- |
| `DATABASE_URL` | URL de votre base de données PostgreSQL (ex: Supabase, Neon, AWS). |
| `AUTH_SECRET` | Une chaîne aléatoire longue (Générez avec `openssl rand -base64 32`). |
| `AUTH_GOOGLE_ID` | Client ID de Google Cloud Console. |
| `AUTH_GOOGLE_SECRET` | Client Secret de Google Cloud Console. |
| `STRIPE_SECRET_KEY` | Clé secrète de votre tableau de bord Stripe. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe. |
| `STRIPE_WEBHOOK_SECRET` | Clé pour valider les webhooks Stripe. |
| `NEXT_PUBLIC_APP_URL` | L'URL finale de votre site (ex: `https://votre-site.vercel.app`). |

## 4. Post-Déploiement

Une fois le déploiement terminé :
1. Exécutez la migration Prisma sur votre base de données de production :
   ```bash
   npx prisma db push
   ```
2. Configurez les redirections OAuth sur Google Cloud Console vers `https://votre-site.vercel.app/api/auth/callback/google`.
3. Configurez le Webhook Stripe vers `https://votre-site.vercel.app/api/webhooks/stripe`.

---

## ✅ Checklist de Production
- [ ] Build réussi sans erreurs.
- [ ] Base de données accessible.
- [ ] HTTPS activé (Automatique sur Vercel).
- [ ] SEO configuré.
