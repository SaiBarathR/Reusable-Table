'use client'

import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"

type headerProps = {
    total: number,
    caption: string,
    rowData: any,
    filterRows: any
}

export default function HeaderComponent({ total, caption, rowData, filterRows }: headerProps) {

    function filterRowDatas(event: React.ChangeEvent<HTMLInputElement>) {
        const filteredList = rowData.filter((rowObj: any) => Object.values(rowObj).filter((value: any) => value.toString().toLowerCase().includes(event.target.value)).length > 0)
        filterRows(filteredList)
    }

    return (
        <div className=" border-b-gray-300 border-b ">
            <div className="flex items-center p-5 pl-6 gap-2 h-max">
                <h1 className="font-semibold text-base">{caption}</h1>
                <p className="text-[#99A0A8] text-sm mt-[2px] flex-grow">Total : {total}</p>
                <InputGroup width={"max-content"} >
                    <Input placeholder='Search' onChange={filterRowDatas} />
                    <InputRightElement width='2.5rem'> <SearchIcon color={"gray"} /></InputRightElement>
                </InputGroup>
            </div>
        </div>
    )
}