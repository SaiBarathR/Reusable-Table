import Image from 'next/image'
import CustomTable from './Components/CustomTable'

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-8">
      <CustomTable />
    </div >
  )
}
