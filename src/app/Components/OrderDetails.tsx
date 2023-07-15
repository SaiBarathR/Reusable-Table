'use client'

import "./customTable.css"
import { useEffect, useMemo, useState } from "react";
import { rowsObject } from './constants'
import CustomTable from './CustomTable'

export default function OrderDetails() {
    const [rowData, setRowData] = useState<any>([]);
    const columnsData = useMemo(() => [{ label: 'timeStamp' }, { label: 'purchaseId' }, { label: 'mail' }, { label: 'name' }, { label: 'source', },
    { label: 'status', cellRenderer: StatusRenderer }, { label: 'select', cellRenderer: CustomSelect }], []);

    useEffect(() => {
        setRowData(rowsObject)
    }, [])

    function CustomSelect(value: any[]) {
        return <button className="bg-gray-300 p-1 font-medium text-black rounded-lg min-w-[60px] hover:scale-110">{value[1]}</button>
    }

    function StatusRenderer(value: any[]) {
        const backgroundColor = value[1] === 'failed' ? 'bg-red-200' : value[1] === 'waiting' ? 'bg-yellow-100' : 'bg-green-200';
        return <div className={`flex items-center p-1 capitalize text-gray-800 font-medium text-sm rounded-lg justify-center min-w-[60px] ${backgroundColor}`}>{value[1]}</div>

    }

    return (
        <div className="text-black p-12">
            <CustomTable
                headers={columnsData}
                row={rowData}
                sortable={true}
            />
        </div>
    )
}



