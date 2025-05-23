<template>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="jornada in jornadas" :key="jornada">
      <v-expansion-panel-title>Jornada {{ jornada }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(puntos, jugador) in sortedJugadores(jornada)" :key="jugador">
              <td>{{ jugador }}</td>
              <td>{{ puntos }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { puntosJugadores } from '../data/sampleData.js'

const jornadas = Object.keys(puntosJugadores)
  .map(Number)
  .sort((a, b) => b - a) // Orden descendente de jornadas

// Función para obtener los jugadores ordenados por puntos descendente de una jornada
function sortedJugadores(jornada) {
  const jugadores = puntosJugadores[jornada] || {}
  return Object.entries(jugadores)
    .sort(([, puntosA], [, puntosB]) => puntosB - puntosA)
    .reduce((acc, [jugador, puntos]) => {
      acc[jugador] = puntos
      return acc
    }, {})
}
</script>
