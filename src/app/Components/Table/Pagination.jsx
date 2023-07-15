'use client'

import { useEffect, useState, useMemo } from "react"

export default function Paginations({ rows, changeRows, rowsPerPage, setCurrentRow, currentRow }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useMemo(() => Math.ceil(rows.length / rowsPerPage), [rows, rowsPerPage])
    useEffect(() => {
        setCurrentRow(rows.slice(0, rowsPerPage))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, rowsPerPage, totalPages])

    function handleClickPAgination(pageNumber) {
        return () => {
            const endIndex = pageNumber * rowsPerPage
            const startIndex = (endIndex - rowsPerPage)
            console.log(pageNumber, endIndex, startIndex)
            setCurrentRow(rows.slice(startIndex, endIndex))
            setCurrentPage(pageNumber)
        }
    }
    // console.log(totalPages, "tots")

    function Arrows(props) {
        return <div {...props}> <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 0.582031L1 6.58203L7 12.582" stroke="#7A7A7A" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        </div>
    }

    return <div className="w-full items-center flex gap-1 justify-center">
        <Arrows className="w-7 h-7 flex rounded cursor-pointer items-center justify-center hover:bg-sky-400" onClick={handleClickPAgination(1)} />
        <div className="flex gap-2  ">
            {[...Array(totalPages).keys()].map((number, i) => {
                return <button onClick={handleClickPAgination(number + 1)} key={i} className={`w-7 h-7 flex items-center  hover:bg-sky-400 hover:border-sky-400 justify-center rounded border border-[#99A0A8] ${currentPage === number + 1 && "border-[#3D8BF8]"}`}>
                    <p className={`${currentPage === number + 1 ? "text-[#3D8BF8]" : "text-black"}`}>{number + 1}</p>
                </button>
            })
            }
        </div>
        <Arrows className="w-7 h-7 rounded cursor-pointer flex items-center justify-center rotate-180 hover:bg-sky-400" onClick={handleClickPAgination(totalPages)} />
    </div>
}
