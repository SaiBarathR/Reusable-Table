'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { themeConfig } from '../config/theme.config'

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider theme={themeConfig}>
                {children}
            </ChakraProvider>
        </CacheProvider>
    )
}