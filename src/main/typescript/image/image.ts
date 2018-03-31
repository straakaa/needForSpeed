import * as b from 'bobril';

interface IData {
    asset: string;
    width: number;
    height: number;
    style?: b.IBobrilStyle;
    children?: b.IBobrilNode[];
}

interface IContext extends b.IBobrilCtx {
    data: IData;
}

export const create = b.createComponent<IData>({
    render(ctx: IContext, me: b.IBobrilNode) {
        console.log('renderButton');

        const d = ctx.data;
        me.children = ctx.data.children;
        me.tag = 'div';
        b.style(
            me,
            {
                'height': '100%',
                'background-image':`url(${ctx.data.asset})`,
                'background-repeat':'no-repeat',
                'background-size':'cover',
                'background-position':'center',
                //
                // backgroundImage: ctx.data.asset,
                // width: '100%',
                // 'min-width': '50%',
                // height: ctx.data.height,
                // margin: 'auto',
                // backgroundRepeat: 'no-repeat',
                // opacity: 0.5
            },
            d.style && d.style
        );
    }
});

// 'background-image':`url(${ctx.data.asset})`,
//     'background-repeat':'no-repeat',
//     'background-size':'contain',
//     'background-position':'center',
//
// backgroundImage: ctx.data.asset,
// width: '100%',
// 'min-width': '50%',
// height: ctx.data.height,
// margin: 'auto',
// backgroundRepeat: 'no-repeat',
// opacity: 0.5