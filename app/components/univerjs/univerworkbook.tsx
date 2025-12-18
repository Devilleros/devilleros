import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core'
import UniverPresetSheetsCoreEnUS from '@univerjs/preset-sheets-core/locales/en-US'
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets'
import { useEffect, useRef } from 'react'

import '@univerjs/preset-sheets-core/lib/index.css'

export function UniverWorkbook() {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (!containerRef.current) return
      
      const { univerAPI } = createUniver({
        locale: LocaleType.EN_US,
        locales: {
          [LocaleType.EN_US]: mergeLocales(
            UniverPresetSheetsCoreEnUS,
          ),
        },
        presets: [
          UniverSheetsCorePreset({
            container: containerRef.current,
          }),
        ],
      })
      univerAPI.createWorkbook({})
      return () => {
        univerAPI.dispose()
      }
    }, [])
    return (
      <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
    )
  }