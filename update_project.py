#!/usr/bin/env python3
"""
Portfolio Updater CLI
---------------------
Gestiona proyectos, habilidades y datos personales del portfolio.
Después de cada cambio, regenera el sitio automáticamente.

Comandos disponibles:
  add       Añadir nuevo proyecto
  edit      Editar proyecto existente
  remove    Eliminar proyecto
  list      Listar todos los proyectos
  personal  Actualizar datos personales
  skill     Gestionar habilidades (add/edit/remove)
  build     Regenerar el sitio sin cambios
  info      Ver configuración actual

Uso:
  python update_project.py list
  python update_project.py add
  python update_project.py edit proyecto-1
  python update_project.py remove proyecto-1
  python update_project.py personal
  python update_project.py skill add
  python update_project.py build
  python update_project.py info
"""

import json
import os
import sys
import subprocess
import argparse
from pathlib import Path

# Forzar UTF-8 en stdout para compatibilidad con terminales Windows (cp1252)
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')
sys.stdout.flush()


CONFIG_FILE = 'portfolio_config.json'
GENERATE_SCRIPT = 'generate.py'


# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────
def _c(text, code):
    """Colorear texto en terminal."""
    codes = {'blue': '\033[94m', 'green': '\033[92m', 'yellow': '\033[93m',
             'red': '\033[91m', 'bold': '\033[1m', 'dim': '\033[2m', 'reset': '\033[0m'}
    if sys.stdout.isatty():
        return f"{codes.get(code, '')}{text}{codes['reset']}"
    return text


def load_config():
    p = Path(CONFIG_FILE)
    if not p.exists():
        print(_c(f"✗ No se encontró {CONFIG_FILE}", 'red'))
        sys.exit(1)
    with open(p, 'r', encoding='utf-8') as f:
        raw = f.read()
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        decoder = json.JSONDecoder()
        obj, _ = decoder.raw_decode(raw)
        return obj


def save_config(config):
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    print(_c('✓ Configuración guardada.', 'green'))


def rebuild():
    print(_c('\n⟳ Regenerando portfolio...', 'blue'))
    result = subprocess.run([sys.executable, GENERATE_SCRIPT], capture_output=True, text=True)
    if result.returncode == 0:
        print(_c(result.stdout.strip(), 'green'))
    else:
        print(_c(f"✗ Error al generar: {result.stderr}", 'red'))


def prompt(label, default='', required=False):
    suffix = f" [{default}]" if default else (' (requerido)' if required else '')
    while True:
        value = input(f"  {label}{suffix}: ").strip()
        if not value and default:
            return default
        if not value and required:
            print(_c("  ↳ Este campo es requerido.", 'yellow'))
            continue
        return value or ''


def prompt_int(label, default=None, min_val=0, max_val=100):
    default_str = str(default) if default is not None else ''
    while True:
        raw = input(f"  {label} [{default_str}]: ").strip()
        if not raw and default is not None:
            return default
        try:
            val = int(raw)
            if min_val <= val <= max_val:
                return val
            print(_c(f"  ↳ Debe ser entre {min_val} y {max_val}.", 'yellow'))
        except ValueError:
            print(_c('  ↳ Introduce un número válido.', 'yellow'))


def prompt_bool(label, default=False):
    default_str = 'S/n' if default else 's/N'
    raw = input(f"  {label} [{default_str}]: ").strip().lower()
    if not raw:
        return default
    return raw in ('s', 'si', 'sí', 'y', 'yes', '1', 'true')


def slugify(text):
    import re
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    text = re.sub(r'-+', '-', text)
    return text


def print_header(title):
    print()
    print(_c('─' * 50, 'dim'))
    print(_c(f'  {title}', 'bold'))
    print(_c('─' * 50, 'dim'))


def print_project(p, index=None):
    prefix = f"  {index + 1}. " if index is not None else "  "
    feat = _c(' ★', 'yellow') if p.get('featured') else ''
    print(f"{prefix}{_c(p['title'], 'bold')}{feat}")
    print(f"     ID: {_c(p['id'], 'dim')}  |  {p['category']}  |  {p.get('year', '—')}")
    tags = ', '.join(p.get('tags', []))
    if tags:
        print(f"     Tags: {_c(tags, 'dim')}")


# ──────────────────────────────────────────────
# Comandos
# ──────────────────────────────────────────────
def cmd_list(config):
    projects = config.get('projects', [])
    print_header(f'Proyectos ({len(projects)})')
    if not projects:
        print(_c('  Sin proyectos.', 'dim'))
        return
    for i, p in enumerate(projects):
        print_project(p, i)
    print()


def cmd_add(config):
    print_header('Añadir proyecto')
    print(_c('  (Ctrl+C para cancelar)\n', 'dim'))

    categories = sorted(set(p['category'] for p in config.get('projects', [])))
    if categories:
        print(f"  Categorías existentes: {_c(', '.join(categories), 'blue')}")

    title = prompt('Título', required=True)
    suggested_id = slugify(title)
    project_id = prompt('ID (slug)', default=suggested_id)

    # Verificar ID duplicado
    existing_ids = [p['id'] for p in config.get('projects', [])]
    while project_id in existing_ids:
        print(_c(f"  ↳ El ID '{project_id}' ya existe.", 'yellow'))
        project_id = prompt('ID (slug)', required=True)

    category = prompt('Categoría', required=True)
    description = prompt('Descripción')
    tags_raw = prompt('Tags (separados por coma)', default='')
    tags = [t.strip() for t in tags_raw.split(',') if t.strip()]
    image = prompt('URL de imagen', default='')
    url = prompt('URL del proyecto', default='#')
    year = prompt('Año', default=str(__import__('datetime').date.today().year))
    featured = prompt_bool('¿Destacado?', default=False)

    new_project = {
        'id': project_id,
        'title': title,
        'category': category,
        'description': description,
        'tags': tags,
        'image': image,
        'url': url,
        'year': year,
        'featured': featured
    }

    config.setdefault('projects', []).append(new_project)
    save_config(config)
    print(_c(f"\n  ✓ Proyecto '{title}' añadido.", 'green'))
    rebuild()


def cmd_edit(config, project_id=None):
    projects = config.get('projects', [])
    if not projects:
        print(_c('  Sin proyectos para editar.', 'yellow'))
        return

    # Si no se pasó ID, mostrar lista para elegir
    if not project_id:
        cmd_list(config)
        raw = input('  Número o ID del proyecto a editar: ').strip()
        try:
            idx = int(raw) - 1
            project_id = projects[idx]['id']
        except (ValueError, IndexError):
            project_id = raw

    target = next((p for p in projects if p['id'] == project_id), None)
    if not target:
        print(_c(f"  ✗ No se encontró proyecto con ID '{project_id}'.", 'red'))
        return

    print_header(f'Editando: {target["title"]}')
    print(_c('  (Enter para mantener el valor actual)\n', 'dim'))

    target['title'] = prompt('Título', default=target['title'])
    target['category'] = prompt('Categoría', default=target['category'])
    target['description'] = prompt('Descripción', default=target.get('description', ''))
    tags_str = ', '.join(target.get('tags', []))
    tags_raw = prompt('Tags', default=tags_str)
    target['tags'] = [t.strip() for t in tags_raw.split(',') if t.strip()]
    target['image'] = prompt('URL imagen', default=target.get('image', ''))
    target['url'] = prompt('URL proyecto', default=target.get('url', '#'))
    target['year'] = prompt('Año', default=target.get('year', ''))
    target['featured'] = prompt_bool('¿Destacado?', default=target.get('featured', False))

    save_config(config)
    print(_c(f"\n  ✓ Proyecto '{target['title']}' actualizado.", 'green'))
    rebuild()


def cmd_remove(config, project_id=None):
    projects = config.get('projects', [])
    if not projects:
        print(_c('  Sin proyectos.', 'yellow'))
        return

    if not project_id:
        cmd_list(config)
        raw = input('  Número o ID del proyecto a eliminar: ').strip()
        try:
            idx = int(raw) - 1
            project_id = projects[idx]['id']
        except (ValueError, IndexError):
            project_id = raw

    target = next((p for p in projects if p['id'] == project_id), None)
    if not target:
        print(_c(f"  ✗ No se encontró '{project_id}'.", 'red'))
        return

    confirm = input(f"  ¿Eliminar '{_c(target['title'], 'bold')}'? [s/N]: ").strip().lower()
    if confirm not in ('s', 'si', 'sí', 'y', 'yes'):
        print(_c('  Cancelado.', 'dim'))
        return

    config['projects'] = [p for p in projects if p['id'] != project_id]
    save_config(config)
    print(_c(f"\n  ✓ Proyecto eliminado.", 'green'))
    rebuild()


def cmd_personal(config):
    p = config.get('personal', {})
    print_header('Datos personales')
    print(_c('  (Enter para mantener el valor actual)\n', 'dim'))

    p['name'] = prompt('Nombre completo', default=p.get('name', ''))
    p['title'] = prompt('Título profesional', default=p.get('title', ''))
    p['tagline'] = prompt('Tagline', default=p.get('tagline', ''))
    p['bio'] = prompt('Bio', default=p.get('bio', ''))
    p['email'] = prompt('Email', default=p.get('email', ''))
    p['linkedin'] = prompt('LinkedIn URL', default=p.get('linkedin', ''))
    p['behance'] = prompt('Behance URL', default=p.get('behance', ''))
    p['dribbble'] = prompt('Dribbble URL', default=p.get('dribbble', ''))
    p['cv_url'] = prompt('CV URL (descargable)', default=p.get('cv_url', ''))

    config['personal'] = p
    save_config(config)
    rebuild()


def cmd_skill(config, action=None):
    skills = config.setdefault('skills', [])
    print_header('Gestión de habilidades')

    if not action:
        print('  Acciones: add, edit, remove, list')
        action = input('  Acción: ').strip().lower()

    if action == 'list':
        if not skills:
            print(_c('  Sin habilidades.', 'dim'))
            return
        for i, s in enumerate(skills):
            print(f"  {i+1}. {_c(s['name'], 'bold')} — {s['level']}%")
        print()

    elif action == 'add':
        name = prompt('Nombre de la habilidad', required=True)
        level = prompt_int('Nivel (0-100)', default=85, min_val=0, max_val=100)
        skills.append({'name': name, 'level': level})
        save_config(config)
        print(_c(f"\n  ✓ Habilidad '{name}' añadida.", 'green'))
        rebuild()

    elif action == 'edit':
        if not skills:
            print(_c('  Sin habilidades.', 'yellow'))
            return
        for i, s in enumerate(skills):
            print(f"  {i+1}. {s['name']} ({s['level']}%)")
        idx_raw = input('  Número de habilidad a editar: ').strip()
        try:
            idx = int(idx_raw) - 1
            skill = skills[idx]
        except (ValueError, IndexError):
            print(_c('  ✗ Índice inválido.', 'red'))
            return
        skill['name'] = prompt('Nombre', default=skill['name'])
        skill['level'] = prompt_int('Nivel (0-100)', default=skill['level'])
        save_config(config)
        rebuild()

    elif action == 'remove':
        if not skills:
            print(_c('  Sin habilidades.', 'yellow'))
            return
        for i, s in enumerate(skills):
            print(f"  {i+1}. {s['name']}")
        idx_raw = input('  Número a eliminar: ').strip()
        try:
            idx = int(idx_raw) - 1
            removed = skills.pop(idx)
            save_config(config)
            print(_c(f"\n  ✓ '{removed['name']}' eliminada.", 'green'))
            rebuild()
        except (ValueError, IndexError):
            print(_c('  ✗ Índice inválido.', 'red'))

    else:
        print(_c(f"  ✗ Acción desconocida: '{action}'", 'red'))


def cmd_info(config):
    p = config.get('personal', {})
    print_header('Configuración actual')
    print(f"  Nombre:    {_c(p.get('name', '—'), 'bold')}")
    print(f"  Título:    {p.get('title', '—')}")
    print(f"  Email:     {_c(p.get('email', '—'), 'blue')}")
    print(f"  LinkedIn:  {p.get('linkedin', '—')}")
    print(f"  Behance:   {p.get('behance', '—')}")
    print(f"  Dribbble:  {p.get('dribbble', '—')}")
    print()
    print(f"  Proyectos:   {_c(str(len(config.get('projects', []))), 'bold')}")
    print(f"  Habilidades: {_c(str(len(config.get('skills', []))), 'bold')}")
    print()


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description='Portfolio Updater — gestiona y regenera tu portfolio',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )
    parser.add_argument('command', nargs='?', choices=['add', 'edit', 'remove', 'list', 'personal', 'skill', 'build', 'info'],
                        help='Comando a ejecutar')
    parser.add_argument('target', nargs='?', help='ID de proyecto o subcomando (para "skill")')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    try:
        config = load_config()

        if args.command == 'list':
            cmd_list(config)
        elif args.command == 'add':
            cmd_add(config)
        elif args.command == 'edit':
            cmd_edit(config, args.target)
        elif args.command == 'remove':
            cmd_remove(config, args.target)
        elif args.command == 'personal':
            cmd_personal(config)
        elif args.command == 'skill':
            cmd_skill(config, args.target)
        elif args.command == 'build':
            rebuild()
        elif args.command == 'info':
            cmd_info(config)

    except KeyboardInterrupt:
        print(_c('\n\n  Cancelado.', 'dim'))
        sys.exit(0)


if __name__ == '__main__':
    main()
