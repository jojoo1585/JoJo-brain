# GitHub bootstrap

Aanbevolen repository: `jojo-brain` met eigen lifecycle, los van `runnix`.

```bash
git remote add origin git@github.com:<account>/jojo-brain.git
git push -u origin main
git push origin v0.1.0
```

Daarna:

1. Configureer alleen niet-gevoelige URL's in `config.js`.
2. Controleer de Pages-zichtbaarheid voor het account/repositorytype.
3. Open **Settings → Pages** en kies **GitHub Actions** als source.
4. Start `Deploy JoJo Brain to Pages` handmatig of push naar `main`.

Publiceer geen lokale NAS-URL als die hostinformatie privé moet blijven. Gebruik nooit credentials, tokens of OAuth-secrets in een Pages-site.
