.PHONY: dev build serve clean

# Desarrollo con búsqueda (Pagefind)
dev:
	hugo && npx pagefind --site public && hugo server --renderStaticToDisk

# Solo hugo server (rápido, sin búsqueda)
serve:
	hugo server

# Build completo (igual que CI)
build:
	hugo --minify

# Build + indexar Pagefind
index:
	hugo --minify && npx pagefind --site public

# Limpiar build
clean:
	rm -rf public
