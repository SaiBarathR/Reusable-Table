'use client'

import { Box } from '@chakra-ui/react';
import OrderDetails from './Components/OrderDetails'

export default function Home() {
  return (
    <Box className='flex flex-col w-full p-6 h-full items-center justify-center'>
      <OrderDetails />
    </Box>
  )
}
