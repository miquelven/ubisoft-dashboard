"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode"
import { SettingsProvider } from "./settings"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <SettingsProvider>
        <ColorModeProvider {...props} />
      </SettingsProvider>
    </ChakraProvider>
  )
}
