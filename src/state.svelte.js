import {lca_da_1, taisho_da_1, jinshan_da_1} from './sutratext.js'
export const texts_folio=[
    [taisho_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'),
     taisho_da_1.split('\n').map(it=>it.split('\t')[0]) ],
    [jinshan_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'),
     jinshan_da_1.split('\n').map(it=>it.split('\t')[0]) ],
    [lca_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'),
     lca_da_1.split('\n').map(it=>it.split('\t')[0]) ],

]
export let secondtext=$state({n:1});


export const setSecondtext=n=>{
    secondtext.n=n;
}
