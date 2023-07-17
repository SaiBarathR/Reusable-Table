'use client'

import { useEffect, useMemo, useState } from "react";
import CustomTable from "./Table/CustomTable";
import { orderDetailsTableRows } from "../service/tableService";
import { useToast } from "@chakra-ui/react";
import Loading from "../loading";

export default function OrderDetails() {
    const toast = useToast()
    const [loading, setLoading] = useState(true);
    const [rowData, setRowData] = useState<any>([]);
    const columnsData = useMemo<any>(() => [
        { label: 'timeStamp', name: 'TimeStamp' }, { label: 'purchaseId', name: 'Purchase Id' }, { label: 'mail', name: 'Mail' }, { label: 'name', name: 'Name' }, { label: 'source', name: 'Source' },
        { label: 'status', name: 'Status', cellRenderer: StatusRenderer }, { label: 'select', name: 'Select', cellRenderer: CustomSelect }], []);

    async function getOrderRowData() {
        const resp = await orderDetailsTableRows();
        try {
            if (Object.keys(resp).includes('orderDetailRows')) {
                setRowData(resp.orderDetailRows)
                toast({
                    title: `Successfully fetched order details row data`,
                    isClosable: true,
                    position: 'top',
                    status: "success"
                })
                setLoading(false);
            }
            else {
                console.log("unable to fetch order details rows")
                setLoading(false);
            }
        }
        catch (err) {
            console.log(err + 'unable to fetch orderdetails api');
            setLoading(false);
        }
    }

    useEffect(() => {
        getOrderRowData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {loading ? <Loading /> :
                <CustomTable
                    headers={columnsData}
                    row={rowData}
                    //Optional Props
                    sortable // default false
                    caption="Bookings" //default no header so no header component will be rendered
                    pagination //default false
                    defaultRowsPerPage={6}// defaultRowsPerPage is 6
                    defaultPaginationLength={5} // defaultdefaultPaginationLength is 5
                    filterRowsByColumnGroup={[{ column: 'status', values: ['failed', 'waiting', 'paid'] }, { column: 'name', values: ['Sai Barath', 'Lokesh'] }, { column: 'purchaseId', values: ['25602'] }]} //default empty array so it will be hidden
                />}
        </div>
    )
}



