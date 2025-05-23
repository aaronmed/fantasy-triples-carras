<template>
  <v-expansion-panels multiple>
    <v-expansion-panel v-for="jornada in jornadas" :key="jornada">
      <v-expansion-panel-title>Jornada {{ jornada }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-expansion-panels multiple>
          <v-expansion-panel
            v-for="(jugadores, user) in equipos[jornada]"
            :key="user"
          >
            <v-expansion-panel-title>{{ user }}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list dense>
                <v-list-item v-for="jugador in jugadores" :key="jugador">
                  <v-list-item-content>{{ jugador }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { equipos } from '../data/sampleData.js'

const jornadas = Object.keys(equipos)
  .map(Number)
  .sort((a, b) => b - a)
</script>

<style scoped>
/* Opcional: mejora visual para modo oscuro */
v-expansion-panel-title {
  font-weight: 600;
  color: #bbdefb;
}

v-list-item-content {
  color: #e0e0e0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
