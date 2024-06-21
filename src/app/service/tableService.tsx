export async function orderDetailsTableRows(signal: AbortSignal) {
    const response = await fetch('https://mocki.io/v1/2ffd29c7-1c33-476b-a191-0b7d049c0a2d', { signal });
    return response.json();
}