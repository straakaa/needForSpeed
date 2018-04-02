import * as b from 'bobril';
import * as PureUpload from 'pure-upload';
import { tableStore } from './tabulka/TabulkaStore';
import { NFSResult } from './DTO/NFSResult';

export interface IButtonData {
    title: string;
    onClick: (toShow: boolean) => void ;
}

interface IButtonCtx extends b.IBobrilCtx {
    data: IButtonData;
}

export const button = b.createComponent<IButtonData>({
    id: 'buttonUpload',
    init(_ctx: IButtonCtx) {
        console.log('initButton');
        // var xhttpRequest = new XMLHttpRequest();
        // xhttpRequest.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         console.log('xhttpRequest.responseText: ', xhttpRequest.responseText);
        //         var response = JSON.parse(xhttpRequest.responseText);
        //         console.log('response: ', response);
        //     }
        // };
        //
        // xhttpRequest.open("GET", "/results", true);
        // xhttpRequest.setRequestHeader("Content-type","application/json")
        // xhttpRequest.send();
    },
    render(ctx: IButtonCtx, me: b.IBobrilNode) {
        
        me.tag = 'button';
        me.children = ctx.data.title;
        me.className = 'butt';
        me.style = {
            'position': 'relative',
            'border': '1px solid',
            'left': 'calc((100% - 200px) /2)',
            'width': '200px',
            'height': '40px',
            'letter-spacing': '1px',
            'text-transform': 'uppercase',
            'background': '#0099cc',
            'color': '#ffffff', 
            'border-radius': '8px',
            'border-color': '#0086b3'
        }
    },
    onClick(ctx: IButtonCtx): boolean {
        console.log('onlick' ,  ctx.data);
        ctx.data.onClick(true);
        return true;
    },
    postInitDom(_ctx: IButtonCtx, _me, _element: HTMLElement) {
        let uploaderExample1 = PureUpload.getUploader({maxParallelUploads: 2, autoStart: true, autoRemove: false}, {});

        let uploadSettings = {
            url: '/upload',
            method: 'PUT',
            maxFileSize: 1024,
            allowDragDrop: true,
            clickable: true,
            accept: '*.*',
            multiple: true
        };

        console.log(<HTMLElement>document.getElementsByTagName('p')[0]);
        let area = uploaderExample1.registerArea(_element, uploadSettings);
        area.uploader.queue.callbacks.onUploadedCallback = (file: PureUpload.IUploadFile) => {
            console.log('response text: ', file['responseText'].toString());
            if (doesFileContainCorrectResult(file)) { 
                alert('Result has been saved.');
                console.log(file['responseText']);
                let nfsResult: NFSResult = JSON.parse(file['responseText']);
                tableStore.addResult(nfsResult);

            } else {
                alert('Result hasnt been saved. You dont have better result.');
            }

            console.log('onUploaded', file);
        };

    }
});
const doesFileContainCorrectResult = (file: PureUpload.IUploadFile): Boolean => {
    return file['responseText'] !== '200';
}
export default button;