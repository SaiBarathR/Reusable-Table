import { useEffect, useState } from 'react'
import useAlerts from './useAlerts';
import { orderDetailsTableRows } from '../service/tableService';
import { rowsObject } from '../constants';

export default function useOrderDetails() {

    //used for notification when api is fetched
    const { errorToast, successToast } = useAlerts();
    const [loading, setLoading] = useState(true);
    //row data for the table
    const [rowData, setRowData] = useState<any>([]);
    const [error, setErrors] = useState<boolean | string>(false);

    const setDummyData = () => {
        setLoading(false);
        setErrors("unable to fetch order details rows")        
        const rows = rowsObject;
        setRowData(rows);
        errorToast("Using dummy data since api got timeouted")
    }

    //function to get row data from api
    async function getOrderRowData(signal: AbortSignal) {
        try {
            setLoading(true);
            const resp = await orderDetailsTableRows(signal);
            if (resp === 'AbortError') {
                console.log('AbortError: Fetch request aborted');
                setLoading(true);
                return
            }
            if (Object.keys(resp).includes('orderDetailRows')) {
                setRowData(resp.orderDetailRows)
                successToast("Order Details Fetched")
                setLoading(false);
                setErrors(false)
            }
            else {
                console.log("unable to fetch order details rows")
                setDummyData();                
            }
        }
        catch (err) {
            console.log(err + 'unable to fetch orderdetails api');  
            setDummyData();            
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        getOrderRowData(controller.signal)
        return () => controller.abort();
    }, [])

    return { loading, error, rowData }
}
