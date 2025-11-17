-----

# Frontend-Hackaton (Plataforma Electoral CivilTech)

Este repositorio contiene el frontend de la Plataforma de Información Electoral CivilTech, una aplicación móvil desarrollada en React Native/Expo. La aplicación está diseñada para facilitar la participación electoral y el acceso a la información, sirviendo a dos tipos de usuarios distintos: **electores** (votantes) y **miembros de mesa** (oficiales electorales).

-----

## Propósito y Alcance

Esta aplicación móvil sirve como una plataforma centralizada para la participación electoral. Está diseñada para dos roles principales:

  * **Electores (Votantes):** Pueden acceder a información de su local de votación, detalles de candidatos y plataformas de partidos políticos.
  * **Miembros de Mesa (Oficiales):** Gestionan sus asignaciones, consultan calendarios administrativos y revisan sus deberes.

Este documento cubre la arquitectura fundamental, las tecnologías seleccionadas, el modelo de acceso de usuarios y la organización del sistema.

-----

## Identidad y Plataforma

La aplicación se identifica como **"Frontend-Hackaton"** en la configuración de Expo (slug: `Frontend-Hackaton`, versión: `1.0.0`). Está construida usando el flujo administrado de Expo (`~54.0.23`) sobre React Native `0.81.5` y React `19.1.0`.

El proyecto está registrado en Expo EAS con el ID: `69a2f039-2936-40a9-889e-b469102d5cd3`.

### Soporte de Plataforma

| Plataforma | Configuración | Notas |
| :--- | :--- | :--- |
| **Android** | `com.cbelmer28.FrontendHackaton` | Icono adaptativo, display *edge-to-edge* |
| **iOS** | Soporte para tablet habilitado | Configuración estándar |
| **Web** | Favicon configurado | Soporte web incluido |

-----

## 🛠️ Stack Tecnológico

La aplicación utiliza un conjunto seleccionado de dependencias organizadas por funcionalidad:

| Categoría | Paquete | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| Framework | `expo` | \~54.0.23 | Plataforma administrada y sistema de *build* |
| Framework | `react` | 19.1.0 | Librería UI principal |
| Framework | `react-native` | 0.81.5 | Framework móvil |
| Navegación (Core) | `@react-navigation/native` | ^7.1.20 | Infraestructura base de navegación |
| Navegación (Tipos) | `@react-navigation/native-stack` | ^7.6.3 | Transiciones de pantalla (stack) |
| Navegación (Tipos) | `@react-navigation/bottom-tabs` | ^7.8.5 | Navegación por pestañas inferiores |
| Navegación (Tipos) | `@react-navigation/material-top-tabs` | ^7.4.3 | Navegación por pestañas superiores |
| Gestos | `react-native-gesture-handler` | \~2.28.0 | Manejo de eventos táctiles |
| Animación | `react-native-reanimated` | \~4.1.1 | Animaciones de alto rendimiento |
| UI Support | `react-native-pager-view` | ^6.9.1 | Vistas de página deslizables |
| UI Support | `react-native-safe-area-context` | \~5.6.0 | Manejo de áreas seguras |
| UI Support | `react-native-screens` | \~4.16.0 | Optimización nativa de pantallas |
| UI Support | `react-native-tab-view` | ^4.2.0 | Implementación de vistas de pestañas |
| Iconos | `react-native-vector-icons` | ^10.3.0 | Librería de iconos (Ionicons) |

-----

## Flujo y Arquitectura

### Flujo de Entrada de la Aplicación

La aplicación sigue un patrón de entrada estándar de Expo:

1.  **`index.js`:** Utiliza `registerRootComponent` de Expo para registrar el componente raíz y configurar el entorno.
2.  **`App.js`:** Exporta por defecto la función que renderiza `<AppNavigator />`.
3.  **`AppNavigator`:** Es la configuración de navegación raíz que gestiona la jerarquía de pantallas de la aplicación.

El punto de entrada está especificado en `package.json` (`"main": "index.js"`).

### Arquitectura de Navegación

El sistema utiliza una navegación de dos niveles que combina un **stack principal** con **navegación por pestañas basada en roles**:

  * **`AppNavigator` (Stack):** Es el navegador stack raíz. Gestiona las transiciones principales (como autenticación y pantallas de detalle), el registro de pantallas y el estado de navegación global.
  * **`MainTabs` (Bottom Tabs):** Es el componente central (hub) de navegación. Renderiza dinámicamente diferentes navegadores de pestañas inferiores según el rol del usuario (`elector` o `member`) recibido como parámetro.
  * **Pantallas de Detalle:** `CandidatoDetalle` y `PartidoDetalle` existen a nivel del stack (fuera de las pestañas) para superponerse a toda la interfaz al mostrar información detallada.

### Roles de Usuario y Control de Acceso

La aplicación implementa control de acceso basado en roles (RBAC) con dos tipos de usuarios distintos, cada uno con una interfaz y conjunto de características completamente diferentes:

  * **Rol Elector (`role: "elector"`)**
      * Usuario principal (votante).
      * Accede a información de su local de votación.
      * Consulta de candidatos y partidos.
      * Visualización del calendario electoral.
  * **Rol Miembro de Mesa (`role: "member"`)**
      * Usuario secundario (oficial electoral).
      * Gestiona asignaciones.
      * Consulta calendarios administrativos.
      * Revisa listas de deberes.

#### Criterios de Validación de Rol

El sistema valida la elegibilidad del usuario durante la autenticación (en `DniScreen`) al consultar la API. Rechaza a usuarios con roles específicos:

  * **Elegible:** "Elector" o "Miembro de Mesa" -\> Procede a la pantalla `VerificarScreen`.
  * **No elegible:** "Menor de edad" -\> Alerta: "No habilitado para votar"
  * **No elegible:** "Extranjero" -\> Alerta: "No habilitado para votar"
  * **Inválido:** DNI ausente o nulo -\> Alerta: "DNI no está registrado"

La selección final del rol (`elector` o `member`) ocurre en `VerificarScreen`, que recibe los datos de la persona y pasa el rol seleccionado como parámetro a `MainTabs`.

-----

## 🔌 Dependencia de API Backend

La aplicación depende completamente de una API backend externa para todas las operaciones de datos y autenticación.

  * **Host Backend:** `backend-hackaton-bice.vercel.app`
  * **Protocolo:** REST API usando `fetch` nativo.

#### Patrón de Endpoints

| Endpoint | Método | Propósito | Usado Por |
| :--- | :--- | :--- | :--- |
| `/validar-dni/:dni` | GET | Validar DNI y obtener datos de la persona | `DniScreen` |
| `/candidatos` | GET | Obtener lista de candidatos | `ElectorCandidatosScreen` |
| `/candidatos/:id` | GET | Obtener detalle de candidato | `CandidatoDetalleScreen` |
| `/partidos` | GET | Obtener lista de partidos | `SharedPartidosScreen` |
| `/partidos/:id` | GET | Obtener detalle de partido | `PartidoDetalleScreen` |

#### Patrón de Respuesta de API

Todas las respuestas de la API siguen una estructura consistente:

```json
{
  "ok": true,
  "data": [ ... ] | { ... },
  "error": "..."
}
```

#### Patrón de Obtención de Datos (Data Fetching)

Cada pantalla que consume datos sigue un patrón estandarizado:

1.  Inicializa estados (`useState`) para `loading`, `error` y `data`.
2.  Usa `useEffect` para disparar el *fetch* al montar el componente.
3.  Llama a `fetch(API_URL + endpoint)`.
4.  Parsea la respuesta JSON.
5.  Actualiza el estado según la respuesta (`ok: true` o `ok: false`).
6.  Maneja errores de red con `try-catch`.
7.  Muestra un indicador de carga, mensaje de error o los datos.

-----

## Pantallas Clave

La aplicación contiene múltiples pantallas organizadas por rol y propósito.

### Pantallas de Autenticación

  * **`SplashScreen`:** Pantalla de carga inicial con auto-navegación.
  * **`DniScreen`:** Entrada y validación de DNI (consulta a la API).
  * **`VerificarScreen`:** Interfaz de selección de rol ("Elector" o "Miembro de Mesa").

### Pantallas de Elector

  * **`HomeScreen`:** Dashboard principal con accesos directos (tiles).
  * **`ElectorInicioScreen`:** "Mi Voto" - información del local de votación.
  * **`ElectorCandidatosScreen`:** Lista y buscador de candidatos.

### Pantallas de Miembro de Mesa

  * **`MemberInicioScreen`:** Inicio de miembro con estado de asignación.
  * **`MemberAsignacionScreen`:** Detalles de la asignación.
  * **`MemberCalendarioScreen`:** Calendario específico del miembro.
  * **`MemberDeberesScreen`:** Checklist de deberes y tareas.

### Pantallas Compartidas (Ambos roles)

  * **`SharedPartidosScreen`:** Lista y buscador de partidos políticos.
  * **`SharedCalendarioScreen`:** Calendario electoral general.
  * **`CandidatoDetalleScreen`:** Información detallada de un candidato.
  * **`PartidoDetalleScreen`:** Información detallada de un partido.

-----

## Comandos de Desarrollo

El proyecto utiliza los comandos estándar de Expo definidos en `package.json`:

  * **Iniciar servidor de desarrollo:**
    ```bash
    npm start
    ```
  * **Iniciar en Android:**
    ```bash
    npm run android
    ```
  * **Iniciar en iOS:**
    ```bash
    npm run ios
    ```
  * **Iniciar en Web:**
    ```bash
    npm run web
    ```

## Despliegue en EXPO

Se realizo un despliegue en expo con perfil de Android en forma de APK ejecutable:
```bash
https://expo.dev/accounts/cbelmer28/projects/Frontend-Hackaton/builds/a4a536ce-1ac6-4021-8aed-a8639e0e6f60
```

