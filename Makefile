.PHONY: dev build serve clean index fix-assets

# Normaliza paths de assets de Enveloppe (mismo fix que el CI)
fix-assets:
	./scripts/fix-assets.sh

# Desarrollo con búsqueda (Pagefind)
dev: fix-assets
	hugo && npx pagefind --site public && hugo server --renderStaticToDisk

# Solo hugo server (rápido, sin búsqueda)
serve: fix-assets
	hugo server

# Build completo (igual que CI)
build: fix-assets
	hugo --minify

# Build + indexar Pagefind
index: fix-assets
	hugo --minify && npx pagefind --site public

# Limpiar build
clean:
	rm -rf public
