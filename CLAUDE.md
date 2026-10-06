# Portfolio — Samuel Serna G.

SPA de portafolio de diseño generado estáticamente con Python. Sin frameworks ni dependencias externas en runtime.

## Estructura

```
portfolio/
├── portfolio_config.json   # Fuente de verdad: datos personales, proyectos, skills
├── generate.py             # Genera public/index.html a partir del config
├── update_project.py       # CLI interactivo para gestionar proyectos y skills
├── vercel.json             # Config de despliegue (buildCommand + outputDirectory)
├── requirements.txt        # Sin dependencias externas (solo stdlib Python 3.8+)
└── public/
    ├── index.html          # Sitio generado (no editar manualmente)
    └── images/             # Portadas de proyectos (JPG, máx 1200px)
```

## Flujo de trabajo

**Siempre editar `portfolio_config.json`, nunca `public/index.html` directamente.**

Después de cualquier cambio al config, regenerar:
```bash
python generate.py
```

O usar el CLI que guarda + regenera automáticamente:
```bash
python update_project.py add        # Añadir proyecto
python update_project.py edit <id>  # Editar proyecto por ID
python update_project.py remove <id>
python update_project.py personal   # Editar datos personales
python update_project.py skill add  # Gestionar habilidades
python update_project.py build      # Solo regenerar
python update_project.py list       # Ver proyectos actuales
python update_project.py info       # Resumen del config
```

## Arquitectura de generate.py

- Lee `portfolio_config.json` con tolerancia a JSON mal formado (trailing whitespace de editores Windows)
- Construye el HTML mediante funciones Python por sección (`build_project_cards`, `build_skills`, etc.)
- CSS y JS están embebidos como constantes string — sin archivos externos
- Salida: un único `public/index.html` autocontenido
- Fuente: Montserrat vía Google Fonts (CDN)
- Sin frameworks JS — vanilla ES5 con IntersectionObserver para animaciones

## Schema de proyecto en portfolio_config.json

```json
{
  "id": "slug-unico",
  "title": "Nombre del proyecto",
  "category": "UX Design",
  "description": "Descripción concisa (1-2 oraciones).",
  "tags": ["Tag1", "Tag2"],
  "image": "images/nombre.jpg",
  "url": "https://enlace-externo.com",
  "year": "2025",
  "featured": true
}
```

- `id`: slug único, sin espacios ni caracteres especiales
- `image`: ruta relativa desde `public/` — las imágenes van en `public/images/`
- `featured`: aparece marcado con ★ en el CLI; no afecta el orden visual actualmente
- `url`: si es `"#"` el enlace no navega a ningún lado

## Imágenes de proyectos

Formato recomendado: JPG, 1200×675px (16:9), < 200 KB.

Para extraer la portada de un PDF:
```python
import fitz  # pip install pymupdf
doc = fitz.open("proyecto.pdf")
pix = doc[0].get_pixmap(matrix=fitz.Matrix(2.0, 2.0))
pix.save("public/images/proyecto.jpg")
```

## Despliegue en Vercel

- `vercel.json` configura `buildCommand: "python generate.py"` y `outputDirectory: "public"`
- Cada `git push` a `main` redespliega automáticamente
- Las imágenes en `public/images/` se sirven junto al HTML

## Problemas conocidos

- **Windows cp1252**: Los scripts usan `sys.stdout.reconfigure(encoding='utf-8')` al inicio. Si aparece `UnicodeEncodeError`, verificar que esa línea esté presente.
- **JSON corrupto**: Algunos editores en Windows añaden trailing whitespace al guardar. `generate.py` y `update_project.py` usan `JSONDecoder.raw_decode()` como fallback.
- **Edit tool trunca archivos grandes**: Al modificar `generate.py` con herramientas automáticas, preferir escritura directa vía bash para evitar truncación silenciosa. Verificar siempre con `python3 generate.py` tras cualquier edición.
