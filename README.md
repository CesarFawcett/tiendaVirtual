# Tienda Virtual - Backend y Frontend

## Descripción
Este proyecto es una aplicación de tienda virtual completa que incluye un backend robusto construido con Spring Boot y un frontend moderno desarrollado con Next.js. El sistema permite la gestión de productos, autenticación de usuarios mediante JWT, y cuenta con una arquitectura escalable siguiendo los principios de Diseño Orientado al Dominio (DDD).

## Tecnologías Utilizadas

### Backend (`/virtual`)
- **Java 17 / Spring Boot 3.1.5**
- **Spring Security & JWT**: Para autenticación y autorización segura.
- **Spring Data JPA & PostgreSQL**: Persistencia de datos.
- **Redis**: Sistema de caché para optimización de consultas.
- **MapStruct & Lombok**: Reducción de código repetitivo y mapeo de DTOs.
- **Docker & Docker Compose**: Orquestación de contenedores.
- **Swagger/OpenAPI**: Documentación interactiva de la API.

### Frontend (`/frontend`)
- **Next.js**: Framework de React para el renderizado del lado del servidor y estático.
- **Tailwind CSS v4**: Framework de CSS para un diseño moderno y responsivo.
- **Lucide React**: Iconografía.

## Requisitos Previos
- **Docker y Docker Compose** instalado (Recomendado para el backend).
- **Node.js** (versión 18 o superior) y **npm** para el frontend.
- **Java 17** y **Maven** (si se desea ejecutar el backend sin Docker).

## Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd tiendaVirtual
```

### 2. Configurar y lanzar el Backend (vía Docker)
Entra en la carpeta del backend y lanza los servicios:
```bash
cd virtual
docker-compose up -d
```
> El backend estará disponible en `http://localhost:8080` (o el puerto configurado en `docker-compose.yml`).
> Puedes ver la documentación de la API en `http://localhost:8080/swagger-ui.html`.

### 3. Configurar y lanzar el Frontend
En otra terminal, entra en la carpeta del frontend e instala las dependencias:
```bash
cd frontend
npm install
npm run dev
```
> El frontend estará disponible en `http://localhost:3000`.

## Estructura del Proyecto
- `virtual/`: Código fuente del backend (Spring Boot).
- `frontend/`: Código fuente del frontend (Next.js).
- `endpoints.txt`: Lista rápida de peticiones para pruebas en Postman.
