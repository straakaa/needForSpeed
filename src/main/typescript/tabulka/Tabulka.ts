import * as b from 'bobril';
import { getResults } from '../Api';
import { TabulkaStore } from './TabulkaStore';

export interface ITabulkaData {
    title?: string;
    onClick?: (toShow: boolean) => void ;
    tabulkaStore: TabulkaStore;
}

interface ITabulkaCtx extends b.IBobrilCtx {
    data: ITabulkaData;
}

export const tabulka = b.createComponent<ITabulkaData>({
    id: "tabulka",
    init(ctx: ITabulkaCtx){
        console.log('init Tabulka: ');
        var success = (response) => {
            console.log('tabulka: ', response);
            ctx.data.tabulkaStore.setNewResults(response);

        };
        getResults(success);
    },
    render(ctx: ITabulkaCtx, me: b.IBobrilNode) {

        me.tag = 'button';
        me.children = [
            ctx.data.tabulkaStore.results.map(item => ( {tag: 'p', children: item.userName})),
            ctx.data.title
        ];
        me.className = "butt";
        me.style = {
            "position": "relative",
            "left": "calc(calc(100% - 150px ) /2)",
            "top": "calc(calc(100% - 50px ))",
            "width": "150px",
            "height": "20px",

        }
    }

});
