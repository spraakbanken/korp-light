// Gets Defintion from karp
// Uses fetch API, we don't need axios for this

export async function getDefintion(entry) {
    console.log('Getting Defintion for', entry);

    const url = "https://spraakbanken4.it.gu.se/karp/v7/query/lexin?q=freetext%7C" + entry

    try {
        const resp = await fetch(url);
        const json = await resp.json();
        return json;
    } catch (error) {
        console.log('Error KARP api', error);
        return null;
    }
}