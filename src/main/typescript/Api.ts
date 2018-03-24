
export function getResults(succesCallback: (response: Response) => void) {
    let xhttpRequest = new XMLHttpRequest();
    xhttpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log('xhttpRequest.responseText: ', xhttpRequest.responseText);
            let responseText = JSON.parse(xhttpRequest.responseText);
            succesCallback(responseText);
        }
    };

    xhttpRequest.open('GET', '/results', true);
    xhttpRequest.setRequestHeader('Content-type', 'application/json');
    xhttpRequest.send();
}