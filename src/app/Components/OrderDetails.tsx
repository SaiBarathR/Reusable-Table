'use client'

import { useEffect, useMemo, useState } from "react";
import CustomTable from "./Table/CustomTable";
import { orderDetailsTableRows } from "../service/tableService";
import { useToast } from "@chakra-ui/react";
import Loading from "../loading";

export default function OrderDetails() {
    //used for notification when api is fetched
    const toast = useToast()
    const [loading, setLoading] = useState(true);
    //row data for the table
    const [rowData, setRowData] = useState<any>([]);
    //column data with column header name as 'name' and real name as 'label' with option to- 
    //add cellrenderer to add custom react element inside the row of a partical column    
    const columnsData = useMemo<any>(() => [
        { label: 'timeStamp', name: 'TimeStamp' }, { label: 'purchaseId', name: 'Purchase Id' }, { label: 'mail', name: 'Mail' }, { label: 'name', name: 'Name' }, { label: 'source', name: 'Source' },
        { label: 'status', name: 'Status', cellRenderer: StatusRenderer }, { label: 'select', name: 'Select', cellRenderer: CustomSelect }], []);

    //function to get row data from api
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

    //Custom cellrenderer react component for column 'status' to render button in the row for the column
    //Cellrenderer gets a callback value with value[0] is column name value[1] is current row value
    function CustomSelect(value: any[]) {
        return <button className="bg-gray-300 p-1 font-medium text-black rounded-lg min-w-[60px] hover:scale-110">{value[1]}</button>
    }

    //Custom cellrenderer react component for column 'select' to render button in the row for the column
    //Cellrenderer gets a callback value with value[0] is column name value[1] is current row value
    //Depending on row value different color chip is provided for the row value
    function StatusRenderer(value: any[]) {
        const backgroundColor = value[1] === 'failed' ? 'bg-red-200' : value[1] === 'waiting' ? 'bg-yellow-100' : 'bg-green-200';
        return <div className={`flex items-center p-1 capitalize text-gray-800 font-medium text-sm rounded-lg justify-center min-w-[60px] ${backgroundColor}`}>{value[1]}</div>
    }

    return (
        <div className="text-black p-12">
            {loading ? <Loading /> :
                <CustomTable
                    headers={columnsData} //column data
                    row={rowData}// row data
                    //Optional Props
                    sortable //Boolean, default false. To sort columns by ascending or descending when clicking the column name. This won't work for cell renderer components inside a column. Only for string and numbers
                    caption="Bookings" //String, This is the header props for the table, default behaviour has no header so headers are visible only when a caption is provided. It displays search, total rows, total filtered rows and filter.
                    pagination // Boolean, Default: Pagination is turned off by default so this prop is required if you want to enable the pagination.
                    defaultRowsPerPage={6}//  Number, By default the rows per page is enabled when pagination is enabled. Default rows per page are 6 if no value is provided
                    defaultPaginationLength={5} //  Number, these set the limit for pagination numbers range for example a value of 5 will limit displaying 1-5 with next and previous buttons to jump to 6-10 and thus by it goes on till the rows end. The default pagination length is 5 if no value is provided.
                    //filterRowsByColumnGroup: Array of Objects, The default behaviour of filters is disabled if filterRowsByColumnGroup is not provided.
                    //filterRowsByColumnGroup Format: [ { label: 'API name or local name', name: 'display name for header', cellRenderer: <react component>, optional, use only if you need to add components in row  }, { label: 'API name or local name', name: 'display name for header'} ]
                    filterRowsByColumnGroup={[{ column: 'status', values: ['failed', 'waiting', 'paid'] }, { column: 'name', values: ['Sai Barath', 'Lokesh'] }, { column: 'purchaseId', values: ['25602'] }]}
                />}
        </div>
    )
}



