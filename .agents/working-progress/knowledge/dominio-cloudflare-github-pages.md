# Dominio: Cloudflare + GitHub Pages

Caso resuelto el 2026-11-10. Dominio `lucianodlf.com.ar` con DNS en Cloudflare y sitio en GitHub Pages (deploy por Actions).

## Problema

- Con nubes grises y SSL en automático, el sitio se sentía lento.
- Al probar con nubes naranjas (proxy) y SSL Full (strict), el sitio dejó de cargar: tardaba y terminaba redirigiendo a `https://lucianodlf.is-a.dev/` (dominio viejo).
- GitHub Pages mostraba "DNS Check in Progress".

## Causa

- La redirección la generaba Cloudflare, no GitHub. Seguían activas reglas viejas: una Redirect Rule de la zona (`http.host eq "lucianodlf.com.ar"` a `is-a.dev`) y dos Bulk Redirects a nivel de cuenta.
- Con nube gris esas reglas no se aplicaban porque el tráfico no pasaba por Cloudflare. Al activar el proxy, empezaron a aplicarse.
- Con proxy, el dominio raíz resuelve a IPs de Cloudflare, y GitHub no puede verificar el DNS ni emitir o renovar el certificado de Let's Encrypt.
- `blog.lucianodlf.com.ar` con proxy y sin regla daba error 526: GitHub no tiene certificado para ese host, y Full (strict) lo exige.

## Cómo diagnosticarlo

- Ver quién responde: `curl -sI https://lucianodlf.com.ar/`.
  - `server: cloudflare` sin `x-github-request-id` indica una regla de Cloudflare.
  - `server: GitHub.com` indica que responde el origen.
- Ver a dónde resuelve el DNS: `dig +short A lucianodlf.com.ar`.
  - `185.199.108-111.153` es GitHub (nube gris).
  - `104.21.x` o `172.67.x` es Cloudflare (proxy).
- Probar siempre en incógnito: el navegador cachea los 301.

## Configuración correcta (vigente)

| Registro | Tipo | Destino | Proxy |
|---|---|---|---|
| `lucianodlf.com.ar` | A x4 | `185.199.108.153`, `.109`, `.110`, `.111` | gris |
| `www` | CNAME | `lucianodlf.github.io` | gris |
| `blog` | CNAME | `lucianodlf.com.ar` | naranja (lo necesita la regla) |
| `*.demo` (mitarasca, poliedrica) | A | VPS propio | gris |

- **SSL/TLS:** Full (strict). Con nube gris no tiene efecto, pero no rompe nada.
- **GitHub Pages:** custom domain `lucianodlf.com.ar` y Enforce HTTPS activado. GitHub redirige `www` y `http` al dominio raíz con HTTPS.
- **Redirect Rule `blog`:**
  - Filtro personalizado: `http.host eq "blog.lucianodlf.com.ar"`.
  - Dinámico, 301: `wildcard_replace(http.request.full_uri, "*://blog.*", "https://${2}")`.
  - Sin "conservar cadena de consulta": `full_uri` ya la incluye.
- **Sin Bulk Redirects** ni Workers.

## Lecciones

- No usar el filtro "Todas las solicitudes" con `wildcard_replace`: cuando no hay coincidencia, devuelve la URL sin cambios y redirige un host a sí mismo, en bucle. Filtrar siempre por host.
- Con proxy, Cloudflare responde las Redirect Rules sin consultar al origen, así que a dónde apunte el CNAME de `blog` es irrelevante.
- El modo Flexible genera bucles con GitHub Pages porque GitHub fuerza HTTPS. Usar Full (strict).
- La nube naranja no aporta mucho acá: GitHub Pages ya sirve desde un CDN, y el proxy complica la verificación del DNS y del certificado. Dejar el dominio raíz y `www` en gris.
- Si "DNS Check in Progress" no se resuelve, quitar el custom domain en GitHub y volver a guardarlo.
- Las reglas viejas pueden estar en tres lugares: Redirect Rules o Page Rules de la zona, y Bulk Redirects de la cuenta (fuera de la zona).

## Referencias

- [GitHub: Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub: Securing your site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [Cloudflare: Flexible SSL mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/)
- [Cloudflare: Rules language functions (`wildcard_replace`)](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/)
