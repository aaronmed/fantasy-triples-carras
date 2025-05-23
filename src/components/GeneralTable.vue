<template>
  <div>
    <h2 class="text-center my-8">CLASIFICACIÓN GENERAL</h2>
    <v-table
      class="elevation-3"
      fixed-header
      height="1000"
    >
      <thead>
        <tr>
          <th>Posición</th>
          <th></th>
          <th>Puntos Totales</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in sortedUsers"
          :key="user"
          :class="{'bg-leader': index === 0, 'bg-alt': index % 2 !== 0}"
        >
          <td>
            <span v-if="index === 0">🥇</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </td>
          <td>{{ user }}</td>
          <td>{{ totalPuntos(user) }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { users, equipos, puntosJugadores } from '../data/sampleData.js'
import { computed } from 'vue'

const jornadas = Object.keys(equipos)
  .map(Number)
  .sort((a, b) => b - a)


const totalPuntos = (user) => {
  return jornadas.reduce((acc, jornada) => {
    const jugadores = equipos[jornada]?.[user] || []
    const puntosJornada = puntosJugadores[jornada] || {}

    return (
      acc +
      jugadores.reduce((sum, jugador) => sum + (puntosJornada[jugador] || 0), 0)
    )
  }, 0)
}

const sortedUsers = computed(() =>
  [...users].sort((a, b) => totalPuntos(b) - totalPuntos(a))
)
</script>

<style scoped>
.bg-leader {
  background-color: rgb(40, 30, 60); /* tono más oscuro compatible con el navbar */
  color: rgb(220, 210, 255);         /* texto claro con contraste */
  font-weight: 700;
}

.bg-alt {
  background-color: rgb(20, 20, 30); /* fondo aún más oscuro para contraste */
}

v-table {
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Headers */
thead th {
  background-color: #1e88e5;
  color: white;
  text-align: left;
  padding: 12px 15px;
}

/* Cells */
tbody td {
  padding: 10px 15px;
  color: #e0e0e0;
}
</style>
