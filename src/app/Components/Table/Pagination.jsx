'use client'

import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react"

export default function Paginations({ rows, setCurrentRow, defaultRowsPerPage, defaultPaginationLength }) {
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = useMemo(() => Math.ceil(rows.length / rowsPerPage), [rows, rowsPerPage])
    const [maxItemsBetweenArrows, setMaxItemsBetweenArrows] = useState(0);

    useEffect(() => {
        setCurrentRow(rows.slice(0, rowsPerPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, rowsPerPage, totalPages])

    function handleClickPagination(pageNumber) {
        const endIndex = pageNumber * rowsPerPage
        const startIndex = (endIndex - rowsPerPage)
        setCurrentRow(rows.slice(startIndex, endIndex))
        setCurrentPage(pageNumber - 1)
    }

    function Arrows(props) {
        return <div {...props}> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 0.582031L1 6.58203L7 12.582" stroke="#7A7A7A" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
    }

    function handleCliickPaginationArrows(direction) {
        const limit = direction === "left" ? maxItemsBetweenArrows - (defaultPaginationLength - 1) : maxItemsBetweenArrows === 0 ? maxItemsBetweenArrows + (defaultPaginationLength) : maxItemsBetweenArrows + (defaultPaginationLength + 1);
        if (limit < (totalPages)) {
            setMaxItemsBetweenArrows(limit - 1)
            handleClickPagination(limit + 1)
        }
    }

    return <div className="w-full items-center flex gap-1 justify-center">
        <div>
            <Menu>
                <MenuButton as={Button} className="bg-slate-200" rightIcon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>}>
                    Rows Per Page: {rowsPerPage}
                </MenuButton>
                <MenuList className="p-3">
                    {[...Array(5).keys()].map((item, index) => <MenuItem onClick={() => setRowsPerPage((item + 1) * defaultRowsPerPage)} className="hover:bg-slate-100 w-full flex items-center justify-center rounded-lg" key={item}>{(item + 1) * defaultRowsPerPage}</MenuItem>)}
                </MenuList>
            </Menu>
        </div>
        <Arrows className="w-7 h-7 flex rounded cursor-pointer items-center justify-center hover:bg-sky-400" onClick={() => { currentPage === 0 ? null : handleCliickPaginationArrows("left") }} />
        <div className="flex gap-2  ">
            {[...Array(totalPages).keys()].map((number, i) => {
                return (maxItemsBetweenArrows === 0 ? i < defaultPaginationLength : (i > (maxItemsBetweenArrows) && i < (maxItemsBetweenArrows + (defaultPaginationLength + 1)))) && <button onClick={() => { handleClickPagination(number + 1) }} key={i} className={`w-7 h-7 flex items-center  hover:bg-sky-400 hover:border-sky-400 justify-center rounded border ${currentPage === (i) ? "border-[#3D8BF8]" : "border-[#99A0A8] "}`}>
                    <p className={`${currentPage === (i) ? "text-[#3D8BF8]" : "text-black"}`}>{number + 1}</p>
                </button>
            })
            }
        </div>
        <Arrows className="w-7 h-7 rounded cursor-pointer flex items-center justify-center rotate-180 hover:bg-sky-400" onClick={() => { handleCliickPaginationArrows('right') }} />
    </div >
}
