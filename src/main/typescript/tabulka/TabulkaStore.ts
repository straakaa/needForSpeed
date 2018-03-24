
import {observable} from "bobx";
import {NFSResult} from "../DTO/NFSResult";
export class TabulkaStore {

    @observable results: NFSResult[] = [];

    setNewResults = (results: NFSResult[]) => {
        for(var i = 0; i < this.results.length; i++) {
            this.results.pop();
        }
        this.results.push(...results);

    }
    addResult = (result: NFSResult) => {
        this.results.push(result);

    }
}

export const tableStore = new TabulkaStore();
