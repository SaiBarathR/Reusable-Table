import { extendTheme, theme } from "@chakra-ui/react"

export var themeConfig = {
    ...theme,
    config: {
        initialColorMode: "light",
        useSystemColorMode: "false"
    },
}

export const themes = extendTheme({ ...themeConfig })
