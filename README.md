Freek Store - E-commerce Demo
Un sitio web de e-commerce completamente funcional con interfaz moderna y responsiva, desarrollado con HTML, CSS y JavaScript puro.

🚀 Características
Catálogo de Productos: Muestra productos organizados por categorías

Filtros y Búsqueda: Filtra por categoría y busca productos por nombre

Carrito de Compras: Añade, elimina y modifica cantidades de productos

Sistema de Usuario: Inicio de sesión básico (demo)

Diseño Responsive: Se adapta a diferentes tamaños de pantalla

Interfaz Moderna: Animaciones suaves y gradientes atractivos

🛠️ Tecnologías Utilizadas
HTML5: Estructura semántica

CSS3: Estilos con variables CSS, flexbox, grid y animaciones

JavaScript (ES6): Lógica de la aplicación sin frameworks

JSON: Almacenamiento de datos de productos

📁 Estructura del Proyecto
text
freek-store/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── products.json       # Base de datos de productos
│
└── imagenes/           # Carpeta de imágenes de productos
    ├── laptop.jpg
    ├── Red_magic.jpg
    ├── playera.jpg
    ├── tablet_red_magic.jpg
    ├── jeans.jpg
    ├── samsung.jpg
    ├── mouse.jpg
    ├── sudadera.jpg
    ├── conjunto_de_ropa_estilizada.jpg
    ├── Paystation5_spider-man_2.jpg
    └── play5_ghost_of_yotei.jpg
🎨 Características de Diseño
Paleta de Colores
Color Primario: #7e57c2 (Púrpura)

Color Secundario: #ffffff (Blanco)

Color de Acento: #9575cd (Púrpura claro)

Fondo: #f3e5f5 (Púrpura muy claro)

Elementos Visuales
Gradientes sutiles

Sombras y efectos de elevación

Animaciones suaves en interacciones

Diseño de tarjetas con bordes redondeados

Scrollbar personalizado

🛍️ Funcionalidades
1. Gestión de Productos
Visualización en grid responsive

Filtrado por categorías (Tecnología, Ropa, Celulares)

Búsqueda en tiempo real

2. Carrito de Compras
Añadir productos

Modificar cantidades

Eliminar items

Calcular subtotal automáticamente

Sidebar deslizable

3. Sistema de Usuario
Modal de inicio de sesión

Avatar personalizado con iniciales

Simulación de autenticación

4. Responsive Design
Adaptación a móviles y tablets

Menús reorganizables

Tamaños de fuente adaptativos

🚀 Cómo Usar
Requisitos Previos
Navegador web moderno (Chrome, Firefox, Edge, Safari)

Servidor web local (opcional, pero recomendado)

Instalación Local
Clona o descarga el repositorio

Coloca todos los archivos en una carpeta

Asegúrate de que la carpeta imagenes esté en el mismo directorio

Abre index.html en tu navegador

Con Servidor Local (Recomendado)
bash
# Con Python
python -m http.server 8000

# Con Node.js y http-server
npx http-server
Luego abre http://localhost:8000 en tu navegador.

📱 Compatibilidad
✅ Chrome 60+

✅ Firefox 55+

✅ Safari 11+

✅ Edge 79+

✅ Móviles (iOS 10+, Android 7+)

🧪 Datos de Prueba
Usuario Demo
Usuario: Cualquier texto

Contraseña: Cualquier texto

Productos de Ejemplo
El sistema incluye 11 productos de ejemplo en 3 categorías diferentes:

Tecnología (Laptops, tablets, consolas, accesorios)

Ropa (Playeras, jeans, sudaderas, conjuntos)

Celulares (Smartphones gamer y de gama media)

🔧 Personalización
Añadir Nuevos Productos
Abre products.json

Añade un nuevo objeto con la siguiente estructura:

json
{
  "id": 12,
  "name": "Nombre del Producto",
  "price": 99.99,
  "category": "categoria",
  "image": "ruta/de/la/imagen.jpg"
}
Modificar Colores
Abre styles.css

Edita las variables CSS en la sección :root

Cambiar Categorías
Abre index.html

Modifica los botones en la sección .categories

Actualiza las categorías en script.js y products.json

⚠️ Limitaciones del Demo
Sin Backend: Los datos se almacenan solo en el navegador

Sin Base de Datos Real: Los productos están en un archivo JSON estático

Autenticación Simulada: No hay validación real de usuarios

Sin Pasarela de Pago: El proceso de pago es simulado

📝 Notas de Desarrollo
Proyecto educativo/demo

Código comentado para facilitar el aprendizaje

Sin dependencias externas (100% vanilla)

Estructura modular y fácil de extender

🎯 Próximas Mejoras Posibles
Persistencia de Datos: Usar localStorage para guardar el carrito

Más Categorías: Expandir el catálogo

Sistema de Valoraciones: Añadir reseñas de productos

Modo Oscuro: Alternativa de tema oscuro

Multidioma: Soporte para múltiples idiomas

📄 Licencia
Este proyecto es de uso educativo. Puedes modificarlo y distribuirlo libremente.

👥 Créditos
Proyecto desarrollado como demo para clase de desarrollo web.

Proyecto demo para clase — HTML + CSS + JS simples.

