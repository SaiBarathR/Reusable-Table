//mock order rows are served from public/orders.json, relative url so it works under a basePath too
export async function orderDetailsTableRows(signal: AbortSignal) {
    const response = await fetch('orders.json', { signal });
    return response.json();
}