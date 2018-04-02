import { ITdDataOrString, ITableData } from 'bobrilstrap';
import { observable } from 'bobx';

import { NFSResult } from '../DTO/NFSResult';
export class TabulkaStore {

    @observable tableData: ITableData = emptyTableData;
    unsortedTableData: NFSResult[] = [];

    setNewResults = (results: NFSResult[]) => {
        this.unsortedTableData = results;
        this.sortData(results);

        console.log('setNew Results ', results);
        if (this.tableData.body && this.tableData.body.rows) {
            const length = this.tableData.body.rows.length;
            for (let i = 0; i < length; i++) {
                this.tableData.body.rows.pop();
            }
        }

        results.forEach((result, index) => {
            this.addRow(createRow(index + 1, result.userName, result.numberOfCameras));
        });
    }

    addResult = (result: NFSResult) => {
        this.unsortedTableData.push(result);
        this.setNewResults(this.unsortedTableData);
    }

    private addRow = (row: ITdDataOrString[]) => {
        this.tableData.body && this.tableData.body.rows && this.tableData.body.rows.push({columns: row});
    }

    private sortData = (results: NFSResult[]): NFSResult[] => {
        return results.sort(function(a, b) {
            if (a.numberOfCameras >= b.numberOfCameras) {
                return 1;
            }
            return -1;
        });
        
    }
}

let createRow = (index: number, userName: string, numberOfCameras: number): ITdDataOrString[] =>  {
    return [
        {style: {'text-align': 'center', width: '50px'}, children: index },
        {style: {'text-align': 'center', width: '250px'}, children: userName },
        {style: {'text-align': 'center', width: '200px'}, children: numberOfCameras}];
};

let emptyTableData: ITableData = {
    style: {display: 'block'},
    head: {
        row: {  
            headers: [
                {style: { 'text-align': 'center', width: '50px'}, children: 'Rank'}, 
                {style: { 'text-align': 'center', width: '250px'}, children: 'Name'}, 
                {style: { 'text-align': 'center', width: '200px'}, children: 'Number of cameras'}],
        }
    },
    body: { style: {display: 'block', overflow: 'auto', height: '400px' },
        rows: []
    }
};

export const tableStore = new TabulkaStore();
