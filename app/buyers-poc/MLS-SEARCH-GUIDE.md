# Guía de Búsqueda por MLS - Buyers POC

## Cómo usar la búsqueda por MLS

La búsqueda por MLS permite encontrar propiedades directamente usando el número MLS (Multiple Listing Service) o Listing ID.

### Características

1. **Normalización automática**: El sistema automáticamente:
   - Elimina espacios, guiones y caracteres especiales
   - Convierte a mayúsculas
   - Valida el formato antes de buscar

2. **Múltiples formatos aceptados**: Puedes ingresar el MLS en diferentes formatos:
   - `123456789`
   - `MLS-123456789`
   - `123 456 789`
   - `MLS 123456789`
   - Todos se normalizan a: `123456789`

3. **Búsqueda en tiempo real**: El sistema busca directamente en la API de IDX Broker usando múltiples endpoints para maximizar las posibilidades de encontrar la propiedad.

### Cómo usar

1. **Accede a la página de búsqueda**: Ve a `/buyers-poc`

2. **Selecciona "Search by MLS #"**: Haz clic en la pestaña "Search by MLS #"

3. **Ingresa el número MLS**: 
   - Puedes ingresar el número con o sin formato
   - Ejemplos válidos:
     - `123456789`
     - `MLS-123456789`
     - `123 456 789`

4. **Haz clic en "Search by MLS #"** o presiona Enter

5. **Resultado**: 
   - Si la propiedad existe, verás los detalles completos
   - Si no se encuentra, verás un mensaje de error con opciones para volver a buscar

### Manejo de errores

Si el MLS no se encuentra:

- **Mensaje claro**: Se muestra un mensaje explicando que la propiedad no fue encontrada
- **Opciones de navegación**: 
  - Botón "Back to Search" para volver a la búsqueda
  - Botón "View All Properties" para ver todas las propiedades disponibles

### Notas técnicas

- El sistema intenta múltiples endpoints de IDX Broker API:
  - `/mls/listings/{id}`
  - `/mls/property/{id}`
  - `/mls/listing/{id}`

- Si la API de IDX Broker no responde, el sistema busca en datos mock realistas como fallback

- El MLS se normaliza antes de enviarse a la API para asegurar compatibilidad

### Ejemplos de uso

**Ejemplo 1: MLS simple**
```
Input: 123456789
Normalizado: 123456789
URL: /buyers-poc/listing/123456789
```

**Ejemplo 2: MLS con formato**
```
Input: MLS-123456789
Normalizado: MLS123456789
URL: /buyers-poc/listing/MLS123456789
```

**Ejemplo 3: MLS con espacios**
```
Input: 123 456 789
Normalizado: 123456789
URL: /buyers-poc/listing/123456789
```

### Troubleshooting

**Problema**: "Property not found"
- **Solución**: Verifica que el número MLS sea correcto
- Intenta buscar la propiedad usando la búsqueda estándar
- Contacta al soporte si el problema persiste

**Problema**: La búsqueda tarda mucho
- **Solución**: El sistema intenta múltiples endpoints, esto es normal
- Si tarda más de 10 segundos, puede haber un problema de conexión

**Problema**: Error de API
- **Solución**: Verifica que la API key esté configurada correctamente
- Revisa los logs del servidor para más detalles












