import * as b from 'bobril';
import * as bs from 'bobrilstrap'; 

import { getResults } from '../Api';
import { TabulkaStore } from './TabulkaStore';
import { ITableData, TableContext } from 'bobrilstrap';

export interface ITabulkaData {
    title?: string;
    onClick?: (toShow: boolean) => void ;
    tabulkaStore: TabulkaStore;
}

interface ITabulkaCtx extends b.IBobrilCtx {
    data: ITabulkaData;
}

let _tableData: ITableData = {style: {display: 'block'},
    head: {
        row: {  
            headers: [
                {style: { 'text-align': 'center', width: '50px'}, children: 'Rank'}, 
                {style: { 'text-align': 'center', width: '250px'}, children: 'Name'}, 
                {style: { 'text-align': 'center', width: '100px'}, children: 'Number of cameras'}],
        }
    },
    body: { style: {display: 'block', overflow: 'auto', height: '200px' },
        rows: [
            {context: TableContext.Success, columns: ['1' , 'vojta', 'honza']},

            {columns: [{style: {color: 'blue', width: '50px'}, children: '2'}, 
            {style: {color: 'blue', width: '250px'}, children: 'Children' }, 
            {style: { 'text-align': 'center', width: '100px'}, children: '84684'}]},

             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]},
             {columns: ['2', {style: {color: 'blue'}, children: 'Children' }, {style: { 'text-align': 'center'}, children: '84684'}]}

        ]
    }

};
export const tabulka = b.createComponent<ITabulkaData>({
    id: 'tabulka',
    init(ctx: ITabulkaCtx) {
        console.log('init Tabulka: ', _tableData);
        const success = (response) => {
            console.log('tabulka: ', response);
            
            ctx.data.tabulkaStore.setNewResults(response);

        };
        getResults(success);
    },
    render(ctx: ITabulkaCtx, me: b.IBobrilNode) {
        
        // me.tag = 'button';
        me.children = [
            b.styledDiv(bs.Panel({context: bs.PanelContext.Info}, [
                bs.PanelHeading({style: {'text-align': 'center', 'font-size': 'initial'}}, 'TOP SCORE BOARD'),
                bs.Table(ctx.data.tabulkaStore.tableData)
               // bs.Table(_tableData)
            ]), 
            {margin: '0px auto', width: '400px'}),

    
          //  ctx.data.tabulkaStore.results.map(item => ( {tag: 'p', children: item.userName})),
           // ctx.data.title
        ];
        me.className = 'buttww';
       
    }

});
