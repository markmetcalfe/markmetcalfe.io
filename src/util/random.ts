import { GeometryAttributes, geometryClasses } from '../3d/geometry'
import { getRandomColor } from './color'

export const getRandomNum = (min: number, max: number) =>
  Math.random() * (max - min) + min

export const getRandomInt = (min: number, max: number) =>
  Math.floor(getRandomNum(min, max))

export const getRandomBool = () => Math.random() >= 0.5

export function getRandomValue<T>(values: object | T[]): T {
  if (typeof values === 'object') {
    const entries = Object.values(values)
    return entries[getRandomInt(0, entries.length)]
  } else {
    // @ts-expect-error Weirdly being inferred as 'never'
    return values[getRandomInt(0, values.length)]
  }
}

export const getRandomGeometry = (): GeometryAttributes => {
  const [red, green, blue] = getRandomColor()
  const type = getRandomValue(geometryClasses)
  return {
    type,
    color: `rgb(${red}, ${green}, ${blue})`,
    solid: false,
    radius: getRandomNum(4, 8),
    detail: getRandomInt(type.getMinDetail(), type.getMaxDetail()),
    reverseRotation: getRandomBool(),
  }
}
