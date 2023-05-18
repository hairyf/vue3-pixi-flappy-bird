import { Audio } from 'ts-audio'
const importPaths = import.meta.glob<{ default: string }>('../assets/audio/*.ogg', { eager: true })
const paths: Record<string, string> = {}

for (const key of Object.keys(importPaths)) {
  const path = importPaths[key]
  const name = key
    .replace('../assets/audio/', '')
    .replace('.ogg', '')
  delete paths[key]
  paths[name] = path.default
}

export const audios = {
  die: Audio({ file: paths.die }),
  hit: Audio({ file: paths.hit }),
  point: Audio({ file: paths.point }),
  swoosh: Audio({ file: paths.swoosh }),
  wing: Audio({ file: paths.wing }),
}
