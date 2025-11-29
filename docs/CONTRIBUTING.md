# Guía para contribuir

Gracias por querer contribuir a HelioBio-Social. Este proyecto combina software y ciencia; las contribuciones deben ser claras, reproducibles y bien documentadas.

Cómo empezar
1. Fork del repo y crea una rama con prefijo:
   - feature/<breve-descripción>
   - fix/<issue-number> or fix/<breve-descripción>
   - docs/<tema>

2. Sigue el estilo de código
- Backend: PEP8, type hints cuando aplique, mypy (ver mypy.ini).
- Frontend: ESLint/Prettier configurados en .eslintrc.js y package.json.

3. Tests
- Agrega tests unitarios o de integración según corresponda.
- Ejecuta pytest para el backend y las suites del frontend antes de abrir PR.

4. Commit messages
- Usa mensajes claros y en inglés/español según prefieras, formato recomendado:
  <type>(scope): descripción corta
  types: feat, fix, docs, style, refactor, test, chore

5. Pull Request
- Describe el cambio y su justificación.
- Añade etiquetas, reviewers y referencia issues relacionados.
- Incluye capturas/ejemplos y pasos para reproducir en la descripción.

Reporte de Issues
- Abre issues para bugs, mejoras o nuevas integraciones de datos.
- Usa plantillas (si existen) y rellena la sección de pasos para reproducir.

Código científico y reproducibilidad
- Cuando añadas análisis o resultados, incluye notebooks o scripts reproducibles en analysis/.
- Indica las versiones de las dependencias y un dataset de ejemplo si es posible.

Comunicaciones
- Para discusiones amplias, abre una issue o una discusión en GitHub.
- Mantén la cortesía y claridad al interactuar con la comunidad.

Gracias por ayudar a mejorar este proyecto.
