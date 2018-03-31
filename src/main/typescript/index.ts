import * as b from 'bobril';
import * as bs from 'bobrilstrap'; 
import { button } from './button';
//import { tabulka } from './tabulka/Tabulka';
import * as Image from './image/image';

import { observable } from 'bobx';
//import { tableStore } from './tabulka/TabulkaStore';
import { ITableData, TableContext } from 'bobrilstrap';
export const nfsLogo = b.asset('./static/images/nfsbg.jpg');

class NfsStore {
    @observable tryToUpload: boolean = false;

    getTryToUpload = () => {
        return this.tryToUpload;
    }
    setTryToUpload = (toShow: boolean) => {
        console.log('set tryToUpload to ' , toShow);
        this.tryToUpload = toShow;
    }
}
let tableData: ITableData = {
    head: {
        row: {  
            headers: [
                {style: { 'text-align': 'center'}, children: 'Rank'}, 
                {style: { 'text-align': 'center'}, children: 'Name'}, 
                {style: { 'text-align': 'center'}, children: 'Number of cameras'}],
        }
    },
    body: {
        rows: [
            {context: TableContext.Success, columns: ['1', 'vojta', 'honza']},
            {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},

        ]
    }

};
export const nfs = new NfsStore();
//onClick: nfs.setTryToUpload - muzu to pouzit kdyz to ulozim jako do promenny
//(toShow:boolean) => nfs.setTryToUpload(toShow)



b.init(() => {

   // let tabulkaStore = tableStore;
   // tabulkaStore.setNewResults([{userName:'ja',numberOfCameras: 5}]);
    let imageData = {
        asset: nfsLogo,
        width: 1920,
        height: 1080,
        children: [
            b.styledDiv(bs.Panel({context: bs.PanelContext.Info}, [
                bs.PanelHeading({style: {'text-align': 'center', 'font-size': 'initial'}}, 'TOP SCORE BOARD'),
                bs.Table(tableData)
            ]), 
            {margin: '0px auto', width: '350px'}),
           // tabulka({tabulkaStore: tabulkaStore}),
            button({title: 'Upload result', onClick: nfs.setTryToUpload})

        ]
    };
    setDefaultParametersToHtml();
    console.log('init');
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

    return [

        // {tag: 'img', attrs: {src: nfsLogo}},
        // Image.create(imageData),
        nfs.tryToUpload && {tag: 'img'},
        {tag: 'div', style: {'height': '100%'}, children: [
                Image.create(imageData)
                //button({title: 'Upload result'})
        ]

        }
    ];
});

let setDefaultParametersToHtml = () => {
    let htmlElement = document.getElementsByTagName('html')[0];
    htmlElement.style.height = '100%';
    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.style.height = '100%';
    bodyElement.style.margin = '0';
};

//nastavit body a html 100% height a margin 0