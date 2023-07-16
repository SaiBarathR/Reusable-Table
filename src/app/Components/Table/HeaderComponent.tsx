'use client'

type headerProps = {
    total: number,
    caption: string,

}

export default function HeaderComponent({ total, caption }: headerProps) {
    return (
        <div className=" border-b-gray-300 border-b ">
            <div className="flex items-center p-5 pl-6 gap-2 h-max">
                <h1 className="font-semibold text-base">{caption}</h1>
                <p className="text-[#99A0A8] text-sm mt-[2px]">Total : {total}</p>
                
            </div>
        </div>
    )
}