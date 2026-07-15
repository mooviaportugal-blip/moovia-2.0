import * as THREE from 'three'

// Coordenadas: X = -4 (esquerda) a +4 (direita) | Y = topo (+4.5) a fundo (-17)
export const FLIGHT_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 4.2,  3.2,  0.5),   // entrada hero, canto superior direito
  new THREE.Vector3( 3.0,  3.1, -0.2),
  new THREE.Vector3( 1.2,  2.8,  0.5),
  new THREE.Vector3(-1.5,  1.6,  0.9),   // curva larga esquerda, seção problema
  new THREE.Vector3(-3.2,  0.5, -0.2),
  new THREE.Vector3(-2.8, -0.4,  0.3),
  new THREE.Vector3( 0.2, -1.5, -0.6),   // cross para direita, fundadores
  new THREE.Vector3( 3.4, -2.4,  0.6),
  new THREE.Vector3( 3.0, -3.4, -0.2),
  new THREE.Vector3( 1.2, -4.6,  0.7),   // assessment - dive toward center
  new THREE.Vector3(-1.0, -5.8, -0.5),
  new THREE.Vector3(-3.0, -6.8,  0.4),   // pilares, grande curva esquerda
  new THREE.Vector3(-2.6, -7.8,  0.1),
  new THREE.Vector3( 0.5, -9.0, -0.3),   // manifesto, voo nivelado
  new THREE.Vector3( 2.8,-10.2,  0.5),
  new THREE.Vector3( 1.5,-11.8, -0.2),
  new THREE.Vector3( 0.0,-13.5,  0.3),   // form
  new THREE.Vector3(-2.5,-13.7,  0.2),   // nivela e plana lateralmente
  new THREE.Vector3(-5.5,-13.8,  0.1),   // saída lateral à esquerda, sem descer

], false, 'catmullrom', 0.5)

export function getTangent(t: number) {
  const tA = Math.min(1, t + 0.005)
  const tB = Math.max(0, t - 0.005)
  return FLIGHT_PATH.getPoint(tA).sub(FLIGHT_PATH.getPoint(tB)).normalize()
}