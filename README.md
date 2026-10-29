# 🌿 Eventos Chiapas

Sitio web informativo para una agencia de organización de eventos en Chiapas, México. Permite a los visitantes conocer los servicios ofrecidos, consultar la agenda de próximos eventos y ponerse en contacto con la agencia.

---

## 👥 Participantes

| Nombre |
|--------|
| Jose Alberto Gomez Vazquez 100%|
| Sergio Armando Lopez Hernandez 100%|
| Paulina Mendez Hernandez 100%|
| Abner Ismael Rodriguez Gomez 100%|

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5** | Estructura semántica de las páginas |
| **CSS3** | Estilos, variables CSS, Grid y Flexbox, diseño responsive |
| **JavaScript (ES6)** | Menú responsive, filtro de eventos y validación de formulario |
| **PWA** | Instalación desde navegadores compatibles y caché del sitio para uso sin conexión |
| **Google Fonts** | Tipografías Montserrat y Open Sans |
| **Font Awesome 6** | Iconografía del sitio |

---

## 📁 Estructura del proyecto

```
Eventos-Chiapas/
├── index.html        # Página principal (inicio)
├── eventos.html      # Agenda de próximos eventos con filtros
├── contacto.html     # Formulario y datos de contacto
├── css/
│   └── style.css     # Hoja de estilos global
├── js/
│   └── script.js     # Lógica interactiva
├── manifest.json     # Nombre, apariencia, inicio e íconos de la PWA
├── service-worker.js # Registro y estrategias de caché offline
├── img/              # Imágenes del sitio
└── README.md
```

---

## 🚀 Instrucciones de uso

### Requisitos

No se requieren dependencias ni herramientas de compilación. Para probar la PWA, sí necesitas servir los archivos desde `localhost` o desde un sitio publicado con HTTPS; abrir `index.html` con doble clic no permite instalar el service worker.

### Abrir el proyecto localmente

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Eventos-Chiapas.git
   ```

2. Entra a la carpeta del proyecto:
   ```bash
   cd Eventos-Chiapas
   ```

3. En VS Code, abre `index.html` con la extensión **Live Server**, o inicia un servidor local desde la carpeta del proyecto:
   ```bash
   python -m http.server 8000
   ```
4. Visita `http://localhost:8000` en un navegador compatible.

### Navegación

| Página | Descripción |
|--------|-------------|
| `index.html` | Inicio: servicios, valores y llamado a la acción |
| `eventos.html` | Agenda con filtros por categoría (Cultural, Corporativo, Aventura, Social) |
| `contacto.html` | Formulario de contacto e información de la agencia |

---

## 📌 Notas

- El formulario de contacto realiza validación del lado del cliente; no envía datos a ningún servidor.
- Las imágenes de la carpeta `img/` son de uso demostrativo.
- El sitio es completamente responsive y funciona en dispositivos móviles, tabletas y escritorio.

## 📲 Demostración PWA

- Cada página enlaza `manifest.json`, que declara el nombre de la app, su ícono, colores, página de inicio y modo de presentación.
- `js/script.js` registra `service-worker.js` y muestra el estado de conexión. En navegadores compatibles también ofrece el botón **Instalar aplicación**.
- El service worker guarda las páginas, estilos, scripts, imágenes y el manifest en la **Cache Storage** del navegador. La primera visita necesita conexión; después, las páginas guardadas se pueden abrir sin conexión. La caché se mantiene en el perfil del navegador/dispositivo y no se guarda dentro del repositorio. Al cambiar los recursos de la app, incrementa la versión `CACHE_NAME` en `service-worker.js` para instalar una caché nueva.
- El manifest no contiene ni recibe datos del formulario: describe la aplicación. El service worker administra archivos de la app, no datos de usuarios. El formulario actual solo valida los campos y presenta una confirmación local; no envía ni sincroniza datos.

Para comprobarlo, abre el sitio online una vez, espera a que el pie indique que la aplicación está lista y usa la opción de instalación del navegador (o el botón si aparece). Luego activa el modo offline en las herramientas de desarrollador o desconecta la red y recarga una página que ya visitaste. El acceso a Google Fonts y Font Awesome sigue dependiendo de Internet; la estructura, estilos propios, imágenes y funciones locales se guardan en caché.
