# Pruebas Unitarias - Buyers POC

Este directorio contiene las pruebas unitarias para el Buyers POC.

## Configuración

Las pruebas utilizan:
- **Jest**: Framework de testing
- **React Testing Library**: Para probar componentes React
- **jest-environment-jsdom**: Entorno de testing para componentes del navegador

## Instalación

```bash
npm install
```

## Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Estructura de Pruebas

### Componentes

- `__tests__/components/buyers-poc/search-form.test.tsx`
  - Pruebas para el formulario de búsqueda
  - Verifica renderizado, interacción de usuario, y navegación

- `__tests__/components/buyers-poc/broker-card.test.tsx`
  - Pruebas para la tarjeta del broker
  - Verifica renderizado, manejo de imágenes, y navegación

### Utilidades

- `__tests__/lib/idxbroker-utils.test.ts`
  - Pruebas para funciones utilitarias de IDX Broker
  - Verifica formateo de precios, direcciones, etc.

## Cobertura

Las pruebas están configuradas para cubrir:
- Componentes en `components/buyers-poc/`
- Páginas en `app/buyers-poc/`
- Utilidades relacionadas con IDX Broker

## Notas

- Los mocks de Next.js router están configurados en `jest.setup.js`
- Las pruebas utilizan `@testing-library/react` para renderizado y queries
- Se utiliza `jest-environment-jsdom` para simular el entorno del navegador












