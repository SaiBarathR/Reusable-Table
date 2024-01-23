import { useEffect, useState } from 'react'
import useAlerts from './useAlerts';
import { orderDetailsTableRows } from '../service/tableService';

export default function useOrderDetails() {

    //used for notification when api is fetched
    const { errorToast, successToast } = useAlerts();
    const [loading, setLoading] = useState(true);
    //row data for the table
    const [rowData, setRowData] = useState([]);
    const [error, setErrors] = useState<boolean | string>(false);

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
                setLoading(false);
                setErrors("unable to fetch order details rows")
                errorToast("unable to fetch order details rows")
            }
        }
        catch (err) {
            console.log(err + 'unable to fetch orderdetails api');
            setLoading(false);
            setErrors("unable to fetch order details api")
            errorToast("unable to fetch order details api")
        }
    }

    useEffect(() => {
        const controller = new AbortController()
        getOrderRowData(controller.signal)
        return () => controller.abort();
    }, [])

    return { loading, error, rowData }
}
