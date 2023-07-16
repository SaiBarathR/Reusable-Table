import Image from 'next/image'
import OrderDetails from './Components/OrderDetails'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-start">
      <OrderDetails />
    </div >
  )
}
