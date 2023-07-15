'use client'

import "./customTable.css"
import { useEffect, useMemo, useState } from "react";
import { rowsObject } from './constants'
import CustomTable from './CustomTable'

export default function OrderDetails() {
    const [rowData, setRowData] = useState<any>([]);
    const columnsData = useMemo(() => [
        'timeStamp', 'purchaseId', 'mail', 'name', 'source', 'status', 'select'],
        []);

    useEffect(() => {
        setRowData(rowsObject)
    }, [])

    function CustomSelect() {
        return <div>
            Select
        </div>
    }

    return (<div className="text-black p-12">
        <CustomTable
            headers={columnsData}
            rows={rowData}
        />
    </div>
    )
}



