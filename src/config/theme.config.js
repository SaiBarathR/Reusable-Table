import { extendTheme, theme } from "@chakra-ui/react"

export var themeConfig = {
    ...theme,
    config: {
        initialColorMode: "white",
        useSystemColorMode: "false"
    },
}

export const themes = extendTheme({ ...themeConfig })
