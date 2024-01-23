export async function orderDetailsTableRows(signal: AbortSignal) {
    const response = await fetch('https://dev-9372591m7y156c7.api.raw-labs.com/mock', { signal });
    return response.json();
}