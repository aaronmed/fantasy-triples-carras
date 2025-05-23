<template>
  <h2 class="text-center my-8">CLASIFICACIÓN POR JORNADAS</h2>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="jornada in jornadas" :key="jornada">
      <v-expansion-panel-title>Jornada {{ jornada }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table class="elevation-2" fixed-header height="600">
          <thead>
            <tr>
              <th>Posición</th>
              <th></th>
              <th>Jugadores</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in getVisibleClasificacion(jornada)"
              :key="user.name"
            >
              <td>{{ user.position }}</td>
              <td>{{ user.name }}</td>
              <td>
                <v-chip
                  v-for="p in user.detalleJugadores"
                  :key="p.draftPos"
                  class="ma-1"
                  small
                  color="primary"
                  text-color="white"
                  label
                >
                  {{ p.draftPos }}: {{ p.jugador }} ({{ p.puntos }})
                </v-chip>
              </td>
              <td>{{ user.puntos }}</td>
            </tr>
          </tbody>
        </v-table>

        <v-btn
          v-if="filasVisibles[jornada] < getClasificacion(jornada).length"
          color="primary"
          class="mt-2"
          @click="mostrarSiguienteFila(jornada)"
          small
        >
          SIGUIENTE
        </v-btn>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { reactive } from 'vue'
import { users, equipos, puntosJugadores } from '../data/sampleData.js'

// Jornadas ordenadas de mayor a menor
const jornadas = Object.keys(equipos)
  .map(Number)
  .sort((a, b) => b - a)

// Controla cuántas filas se revelan en cada jornada
const filasVisibles = reactive({})
jornadas.forEach(j => {
  filasVisibles[j] = 0
})

// Devuelve la clasificación completa con posición incluida
function getClasificacion(jornadaNumber) {
  const equiposJornada = equipos[jornadaNumber] || {}
  const puntosDeJugadores = puntosJugadores[jornadaNumber] || {}

  const resultados = users.map((user) => {
    const jugadoresUsuario = equiposJornada[user] || []
    const detalleJugadores = jugadoresUsuario
      .map((jugador, index) => ({
        jugador,
        puntos: puntosDeJugadores[jugador] || 0,
        draftPos: index + 1,
      }))
      .sort((a, b) => b.puntos - a.puntos)

    const puntos = detalleJugadores.reduce((acc, j) => acc + j.puntos, 0)
    return { name: user, puntos, detalleJugadores }
  })
  // Ordenamos y añadimos posición
  return resultados
    .sort((a, b) => b.puntos - a.puntos)
    .map((res, idx) => ({ ...res, position: idx + 1 }))
}

// Devuelve solo las últimas N filas (de abajo hacia arriba)
function getVisibleClasificacion(jornadaNumber) {
  const all = getClasificacion(jornadaNumber)
  const n = filasVisibles[jornadaNumber]
  return n > 0 ? all.slice(-n) : []
}

function mostrarSiguienteFila(jornada) {
  if (filasVisibles[jornada] < getClasificacion(jornada).length) {
    filasVisibles[jornada]++
  }
}
</script>

<style scoped>
v-table {
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Encabezados */
thead th {
  background-color: #1e88e5; /* Azul medio para modo oscuro */
  color: white;
  text-align: left;
  padding: 12px 15px;
}

/* Celdas */
tbody td {
  padding: 10px 15px;
  color: #e0e0e0; /* Texto claro para modo oscuro */
}
</style>
