'use client'

import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react"

type paginationProps = {
    rows: any;
    setCurrentRow: any;
    defaultRowsPerPage: number;
    defaultPaginationLength: number;
}

export default function Paginations({ rows, setCurrentRow, defaultRowsPerPage, defaultPaginationLength }: paginationProps) {
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = useMemo(() => Math.ceil(rows.length / rowsPerPage), [rows, rowsPerPage])
    const [maxItemsBetweenArrows, setMaxItemsBetweenArrows] = useState(0);

    useEffect(() => {
        setCurrentRow(rows.slice(0, rowsPerPage))
        handleClickPagination(1)
        setMaxItemsBetweenArrows(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, rowsPerPage, totalPages])

    function handleClickPagination(pageNumber: number) {
        const endIndex = pageNumber * rowsPerPage
        const startIndex = (endIndex - rowsPerPage)
        setCurrentRow(rows.slice(startIndex, endIndex))
        setCurrentPage(pageNumber - 1)
    }

    function Arrows(props: any) {
        return <div {...props}> <ChevronDownIcon boxSize={6} />
        </div>
    }

    function handleCliickPaginationArrows(direction: string) {
        const limit = direction === "left" ? maxItemsBetweenArrows - (defaultPaginationLength - 1) >= 0 ? maxItemsBetweenArrows - (defaultPaginationLength - 1) : 0 : maxItemsBetweenArrows === 0 ? maxItemsBetweenArrows + (defaultPaginationLength) : maxItemsBetweenArrows + (defaultPaginationLength + 1);
        if (limit < (totalPages)) {
            setMaxItemsBetweenArrows(limit - 1)
            handleClickPagination(limit + 1)
        }
    }

    return <div className="w-full items-center flex gap-1 justify-center">
        <div>
            <Menu>
                <MenuButton as={Button} className="bg-slate-200" rightIcon={<ChevronDownIcon />}>
                    Rows Per Page: {rowsPerPage}
                </MenuButton>
                <MenuList className="p-3">
                    {[...Array(5).keys()].map((item, index) => <MenuItem onClick={() => setRowsPerPage((item + 1) * defaultRowsPerPage)} className="hover:bg-slate-100 w-full flex items-center justify-center rounded-lg" key={item}>{(item + 1) * defaultRowsPerPage}</MenuItem>)}
                </MenuList>
            </Menu>
        </div>
        <Arrows className="w-7 h-7 flex rounded cursor-pointer rotate-90 items-center justify-center hover:bg-sky-400" onClick={() => { currentPage === 0 ? null : handleCliickPaginationArrows("left") }} />
        <div className="flex gap-2  ">
            {[...Array(totalPages).keys()].map((number, i) => {
                return (maxItemsBetweenArrows === 0 ? i < defaultPaginationLength : (i > (maxItemsBetweenArrows) && i < (maxItemsBetweenArrows + (defaultPaginationLength + 1)))) && <button onClick={() => { handleClickPagination(number + 1) }} key={i} className={`w-7 h-7 flex items-center  hover:bg-sky-400 hover:border-sky-400 justify-center rounded border ${currentPage === (i) ? "border-[#3D8BF8]" : "border-[#99A0A8] "}`}>
                    <p className={`${currentPage === (i) ? "text-[#3D8BF8]" : "text-black"}`}>{number + 1}</p>
                </button>
            })
            }
        </div>
        <Arrows className="w-7 h-7 rounded cursor-pointer flex items-center justify-center rotate-[270deg] hover:bg-sky-400" onClick={() => { handleCliickPaginationArrows('right') }} />
    </div >
}
