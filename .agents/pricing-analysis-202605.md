# Análisis de Pricing · The Street Vision

*Análisis: 2026-05-08 · Aplicando frameworks de pricing-strategy*

---

## TL;DR — Diagnóstico en una frase

**El modelo está sano para lanzar pero tiene 3 problemas estructurales que costarán plata si no se corrigen al mes 3-6**: (1) Full Day está sobre-descontado (33% off vs el 25% de industria); (2) Prime está sub-vendido vs lo que vale por exclusividad de horario; (3) la tarifa fundadores tiene poca urgencia psicológica.

---

## Diagnóstico cuantitativo del cuadro actual

| Plan | Hrs | Pasadas/día | Precio | $/hora | $/pasada |
|---|---|---|---|---|---|
| Off-Peak | 4.5 | 180 | $50.000 | **$11.111** | $278 |
| Standard | 5.0 | 200 | $85.000 | **$17.000** | $425 |
| Prime | 5.5 | 220 | $120.000 | **$21.818** | $545 |
| Full Day | 15.0 | 600 | $170.000 | **$11.333** | $283 |

### Lo que el cuadro revela

1. **Off-Peak y Full Day cuestan lo mismo por hora** ($11k/h). Esto significa que Full Day no le cobra absolutamente nada extra al cliente por las horas Prime y Standard que están adentro — está regalando ~$85k de valor.
2. **Prime cobra 96% más por hora que Off-Peak** ($21.8k vs $11.1k). Razonable, pero **no captura toda la ventaja exclusiva** de tener al cliente justo en los 3 picos diarios cuando NADIE más puede ofrecerle eso.
3. **El "salto" de Standard a Prime es solo +28%** ($85k → $120k). Pequeño para la diferencia de calidad de horario.
4. **Stack manual (Off + Std + Prime)** = $255k vs Full Day $170k → **33% de descuento por bundle**. Industria está en 15-25%. Esto sobrepaga el "ahorro por convenience".

### Cálculo del ceiling de ingresos por slot

| Estrategia | Ingreso/slot/mes | Para 9 slots |
|---|---|---|
| Vender Full Day en slot completo | $170.000 | $1.530.000 |
| Vender 3 franjas separadas (Off+Std+Prime) | $255.000 | $2.295.000 |
| **Diferencia** | **+$85.000 (50%)** | **+$765.000/mes** |

El modelo actual incentiva al cliente a comprar Full Day (le ahorra $85k) mientras castiga al vendedor (deja $85k en la mesa). Hay que rebalancearlo.

---

## Respuestas a las 10 preguntas

### 1. ¿Está bien calibrado el pricing?

**Veredicto**: 7/10. Sano para lanzar, pero con espacios de mejora.

- **Off-Peak $50k**: ✅ Bien. Sirve como puerta de entrada para el segmento más sensible al precio. Bajarla canibaliza Standard. Subirla cierra la puerta a restaurants y micropymes. Mantener.
- **Standard $85k**: ⚠️ Levemente bajo. Por sus 200 pasadas en horario comercial, podría escalar a $90-95k. Diferenciarla más de Off-Peak.
- **Prime $120k**: ⚠️ Sub-valuado. Es el ÚNICO plan con exclusividad horaria peak — debería tener una prima mayor. Recomendado escalar a **$130-140k** una vez haya validación.
- **Full Day $170k**: ❌ Sobre-descontado. Recomendado subir a **$190-200k** (descuento del bundle pasa de 33% → 22-25%, alineado con industria).

### 2. Anchor analysis — ¿cuál debería ser el plan ancla?

**Recomendación**: Full Day debe ser el ancla visual (lado derecho del cuadro), pero **Prime debería ser "el recomendado"** (visualmente destacado).

Razón: Full Day fija el techo psicológico ("aquí está lo máximo"). Prime se vuelve el "compromiso inteligente" porque captura los 3 picos, lo que para el cliente local es lo más vendible (concentra impacto en horarios de mayor flujo).

Hoy el sitio ya destaca Prime con `class="highlighted"`. Sumar copy que diga "RECOMENDADO" o "PARA LA MAYORÍA" en Prime.

### 3. Tarifa Fundadores — ¿-20% es el descuento correcto?

**Veredicto**: 20% está bien para Prime y Full Day. **Demasiado para Off-Peak**.

- Off-Peak con -20% = $40k. Demasiado barato, pierde la sensación de premium.
- Mejor: tarifa fundadores **diferenciada por plan**:
  - Off-Peak: -10% ($45k) o sin descuento (es ya entrada)
  - Standard: -15% ($72k)
  - Prime: -20% ($96k) ← el caramelo principal
  - Full Day: -25% ($127.5k → $128k) ← el mejor cierre

**Razón**: el descuento más agresivo debe estar donde el ROI para Street Vision es mayor (Full Day genera más relación, menos rotación de clientes, contratos más estables). Off-Peak ya es accesible.

### 4. Bundling

**Recomendación**: agregar 2 bundles que no canibalicen:

**Bundle "Renovación Semanal"** ($95k/mes):
- Plan Off-Peak ($50k) + Pack 4 cambios ($32k) + bonus de creatividad inicial
- Target: supermercados, retail con promo semanal, restaurants.
- Ahorro vs comprar separado: $7-10k.
- Margen para Street Vision: +$45k vs Off-Peak solo.

**Bundle "Lanzamiento"** ($60k por 5 días):
- Plan evento 5 días ($100k) + 1 spot exclusivo de 2 min ($40k) + diseño custom incluido
- Target: inmobiliarias estrenando proyecto, productoras de evento, lanzamientos de marca.
- Total real: $60k, posicionado como "kit completo de lanzamiento".

### 5. Pricing psychology

| Cambio | Recomendación | Por qué |
|---|---|---|
| Charm pricing ($49.990 vs $50.000) | ❌ NO | Audience PYME, no e-commerce. La precisión $49.990 huele a outlet. Mantener números redondos = sensación premium/seriedad. |
| Tag "Más Popular" en Prime | ✅ SÍ | Hoy dice "Picos máximos". Cambiar a **"⭐ MÁS ELEGIDO"** o **"RECOMENDADO"** una vez tengamos clientes (mes 2-3). |
| Orden left-to-right | ⚠️ Cambiar | Hoy: Off-Peak → Standard → Prime → Full Day. Mejor: **Off-Peak → Standard → Prime (destacado) → Full Day**. Hoy ya está así. ✅ |
| Mostrar "ahorro" en Full Day | ✅ SÍ | Agregar badge "AHORRA $85.000 vs comprar por franja" a Full Day. Hace explícito el valor del bundle. |

### 6. Annual prepay discount

**Recomendación**: **NO ofrecer prepago anual al inicio** (mes 1-6).

Razones:
- En pre-launch no hay validación de retención mensual. Vender 12 meses por adelantado = riesgo legal + mochila de obligación si la pantalla falla.
- Tu cashflow es bajo y constante; no necesitas el cash-up-front.
- Si sí vas a hacerlo (mes 6+ con 9 slots vendidos): -10% por anual prepago. Ej: Full Day anual = $170k × 12 × 0.9 = **$1.836.000 prepago**.

Alternativa más segura: **descuento por comprometerse 6 meses** (-10%, prepago opcional). Menor riesgo, mismo efecto de retención.

### 7. Risk reversal — ¿money-back guarantee?

**Recomendación**: SÍ, pero limitado.

**"Garantía Primera Semana"**: si en los primeros 7 días al aire no estás conforme con cómo se ve tu pieza en pantalla, **rediseñamos sin costo o devolvemos el 100%**.

Razones:
- El miedo principal del cliente local es "que mi aviso se vea mal". No "que no funcione".
- Esta garantía protege contra ese miedo concreto, no contra una promesa imposible (resultados de venta).
- Es CASI gratis para Street Vision: el costo real es rediseñar, no devolver plata (pocos pedirán reembolso si la pieza está bien hecha).

**NO** ofrecer "garantía de resultados" tipo "si no vendes más, te devolvemos plata" — imposible de medir, alta exposición a abuso.

### 8. Willingness to pay — Constitución (~50k hab)

**Estimación de WTP por segmento** (basado en presupuesto típico de marketing local en ciudades chicas):

| Segmento | Presupuesto mes total | Plan recomendado | % del budget |
|---|---|---|---|
| **Restaurant / micropyme** | $30-80k | Off-Peak ($50k) | 60-100% |
| **Retail mediano** | $100-200k | Standard ($85k) | 40-50% |
| **Óptica / clínica / servicios** | $150-350k | Prime ($120k) | 30-50% |
| **Cadena local / sucursal regional** | $300-700k | Full Day ($170k) o Prime+Standard combo | 25-40% |
| **Inmobiliaria / lanzamiento** | $200-500k (puntual) | Full Day + spot exclusivo | 35-50% |

**Conclusión WTP**: el modelo actual está **dentro del rango aceptable** para todos los segmentos objetivo. Off-Peak captura el budget de restaurant completo (riesgo: si no rinde, pierden todo el marketing). Mejor migrar restaurants directo a Standard cuando puedan.

### 9. Roadmap de subida de precios

| Hito | Cuándo | Cambio | Por qué |
|---|---|---|---|
| **Lanzamiento** | Mes 0 | Mantener cuadro actual | Validar demanda real |
| **5 fundadores cerrados** | Mes 1-2 | Cerrar ventana fundadores | Crear urgencia para próximos clientes |
| **7/9 slots ocupados** | Mes 4-6 | Subir Full Day a $190k. Subir Prime a $130k. Standard y Off-Peak quedan. | Mayor demanda → menor elasticidad de precio en planes premium |
| **9/9 slots con waiting list** | Mes 6-9 | Subir TODA la grilla 15%. Crear "Plan Premium Exclusivo" (1 slot exclusivo Prime, $250k) | Lista de espera = monopolio local validado |
| **Año 2** | Mes 12+ | Subir 20% en renovaciones. Lanzar 2da pantalla con tarifas 30% más altas | Capacidad expandida, brand consolidado |

**Comunicar subidas**: Avisar 30 días antes. Grandfather al cliente activo en su tarifa actual por 3-6 meses adicionales (premio a la fidelidad).

### 10. Anti-cannibalization (Full Day vs franjas)

**Problema actual**: Full Day a $170k vs Stack manual (Off+Std+Prime) $255k = cliente puede pagar $170k y ahorrar $85k.

**Soluciones**:

**A. Subir Full Day a $200k** (mes 4+, post-validación)
- Stack manual sigue costando $255k → Full Day ahorra $55k (22%) en lugar de $85k (33%).
- Sigue siendo atractivo, pero el cliente premium está pagando 22% más.

**B. Restricción de Full Day**: agregar *"Compromiso mínimo 3 meses con Full Day"*.
- Da estabilidad de ingresos a Street Vision.
- Cliente que solo quiere "todo el día por 1 mes" debe pagar el plan completo de 3 meses ($510k) o ir a stack manual.

**C. Beneficios exclusivos de Full Day** que NO se pueden obtener con stack:
- 4 cambios de creatividad/mes incluidos (ya tiene esto)
- Reporte SEMANAL de rotación (vs mensual)
- 1 spot exclusivo gratis al mes (1-2 minutos)
- Logo en footer de streetvision.cl como "anunciante destacado"
- Posibilidad de comprar exclusividad por rubro local (-50% de descuento en cláusula no-compete vs PYME competidora)

Esto convierte Full Day en algo más que "más horas" — es el plan de marca premium.

---

## Recomendaciones priorizadas

### 🟢 HACER AHORA (pre-launch / esta semana)

1. **Agregar badge "AHORRA $85.000 vs comprar por franja"** en plan Full Day. Hace explícito el value del bundle.
2. **Agregar copy**: *"Tarifa Fundadores limitada: solo 5 cupos · -20% solo primeros 3 meses"* con contador o número remanente. Crea urgencia.
3. **Reformular Prime**: cambiar tag de "Picos máximos" a "⭐ El más elegido" cuando haya 2-3 clientes (no antes, sería mentir).
4. **Garantía Primera Semana** en sección de FAQ:
   *"¿Y si no me gusta cómo queda mi aviso? Rediseñamos sin costo o devolvemos el 100% en los primeros 7 días al aire."*
5. **Diferenciar tarifa fundadores por plan**:
   - Off-Peak: -10% ($45k)
   - Standard: -15% ($72k)
   - Prime: -20% ($96k)
   - Full Day: -25% ($127.500)
6. **Agregar bundle "Renovación Semanal"** en sección Extras: Off-Peak + 4 cambios = $80k (ahorro de $2k visible).

### 🟡 HACER MES 3-6 (post-validación inicial)

7. **Subir Prime a $130k** y **Full Day a $190k** una vez tengas 5+ clientes activos y pidas testimonials.
8. **Crear plan "Exclusivo de Rubro"**: $250k/mes para ser la única óptica/farmacia/restaurant en pantalla durante el mes. Compromiso mínimo 3 meses.
9. **Lanzar prepago 6 meses con -10%**: solo a clientes activos hace 2+ meses (pre-validados).
10. **Agregar Bundle "Lanzamiento" 5 días**: $60k para inmobiliarias y eventos (gancho de adquisición).

### 🔴 HACER MES 6-12 (post product-market fit)

11. Subida general de precios 15% en grilla.
12. Lanzar "Plan Premium Exclusivo" $250-300k con 2 cambios semanales y soporte directo.
13. Implementar sistema de **billing automático** vía Mercado Pago / Webpay (hoy probablemente cobras por transferencia).
14. Cláusula de **renovación automática** con aviso de 14 días.
15. Análisis Van Westendorp con primeros 20 clientes para calibrar pricing año 2.

---

## Cambios concretos al sitio web

Estas son las modificaciones específicas para `streetvision.cl` y `streetvision.cl/media-kit/`:

### En la sección Planes

**Hoy** (footer del cuadro de planes):
> *Tu marca aparece cada 90 segundos en pantalla mientras tu plan está activo. Spots de 10 segundos. Precios sin IVA.*

**Cambiar a**:
> *Tu marca aparece cada 90 segundos en pantalla. Spots de 10 segundos. Precios sin IVA.*
> *💡 Plan Full Day equivale a comprar Off-Peak + Standard + Prime por separado, ahorrando $85.000 (33% off).*

### En el card del plan Full Day

Agregar badge superior:
```html
<div class="plan-savings">★ AHORRA $85.000/mes vs combinación por franja</div>
```

### En el banner Tarifa Fundadores

**Hoy**:
> 🚀 **Tarifa Fundadores**: 20% OFF los primeros 3 meses para los primeros 5 anunciantes que se sumen al lanzamiento.

**Cambiar a**:
> 🚀 **Tarifa Fundadores · Solo quedan [X] cupos**:
> -10% Off-Peak · -15% Standard · -20% Prime · **-25% Full Day**
> Primeros 3 meses · 5 cupos máximo · termina cuando se llena

### Nueva sección en FAQ

**P: ¿Y si no me gusta cómo queda mi aviso en pantalla?**
> R: Te ofrecemos **Garantía Primera Semana**: si en los primeros 7 días al aire no estás conforme con cómo se ve tu pieza, la rediseñamos sin costo. Si aún así no te convence, devolvemos el 100% del primer mes. Sin letra chica.

---

## Métricas a monitorear post-launch

Para validar si el pricing está funcionando, trackear estos KPIs:

| KPI | Meta mes 3 | Cómo medir |
|---|---|---|
| **Mix de planes vendidos** | 20% Off / 30% Std / 30% Prime / 20% Full Day | Reportes mensuales internos |
| **Tasa de conversión cotización → cierre** | >35% | DMs IG + WhatsApp + form web |
| **% de clientes que compran add-ons** | >40% | Cambios extra, spots exclusivos |
| **Churn mensual** | <8% | Cancelaciones / clientes activos |
| **Revenue per slot ocupado** | >$120k promedio | $ totales / slots ocupados |
| **% clientes activan tarifa fundadores** | 100% en primeros 5 | Manual |

Si en mes 3:
- Off-Peak >50% del mix → bajar Off-Peak o subir entry barrier
- Prime <20% del mix → revisar copy de Prime, no convence
- Churn >15% → algo serio, revisar producto antes que precio

---

## Riesgos identificados

1. **Riesgo de canibalización Full Day**: cubierto en sección 10. Acción: subir Full Day a mes 4 + agregar beneficios exclusivos.
2. **Riesgo de "carrera al fondo"**: cliente regatea de Standard a Off-Peak. Mitigar con copy claro de cobertura horaria.
3. **Riesgo de "pase del fundador"**: alguien compra fundador, paga 3 meses con descuento, y se va. Mitigar con compromiso mínimo de 3 meses en Tarifa Fundadores (lockin natural).
4. **Riesgo de saturación rápida**: si los 9 slots se llenan con Tarifa Fundadores en semana 1, perdiste 5 × 20% × 3 meses = ~$200k de revenue inicial. Mitigar con cupo limitado a 5 (no más).
5. **Riesgo de comparación con OOH nacional**: cliente sofisticado compara con CMP de Talca/Santiago y ve que estás "barato". Mitigar comunicando que el valor es la EXCLUSIVIDAD GEOGRÁFICA, no la pasada.

---

## Conclusión

El cuadro actual sirve **al 100% para lanzar**. Las recomendaciones de "HACER AHORA" son cambios de copy y positioning, no de números. Eso te da el upside sin riesgo.

Las subidas reales (Prime $130k, Full Day $190k) se hacen **DESPUÉS de tener data** — no antes. Calibrar con clientes reales, no con hipótesis.

La oportunidad más grande está en el **mes 4-6** cuando tengas 5-7 slots vendidos: ahí el modelo cambia de "captura de mercado" a "optimización de revenue per slot". Ahí es cuando subes precios y agregas el plan Premium.

**Próximos 3 pasos concretos**:
1. Aplicar los 6 cambios de "HACER AHORA" al sitio (te los implemento si me dices "dale").
2. Definir los KPIs y trackearlos desde el día 1.
3. Schedule reminder en mes 3 para revisar este análisis con data real.
