<script lang="ts">
  // import Counter from './lib/counter.svelte'
  import ToolbarLeft from './toolbarleft.svelte'
  import ToolbarRight from './toolbarright.svelte'
  import SplitPane from './lib/splitpane.svelte';
  import Codemirror from './codemirror.svelte';
  import {lineNumbers,EditorView, ViewUpdate} from '@codemirror/view'
  import {EditorSelection} from '@codemirror/state'
  // import {cursorActivity} from './cursoractivity.js'
  import {taisho_da_1, jinshan_da_1} from './sutratext.js'
  import {transpagePosition} from './transpage.js'
  import {diffChars} from 'diff'
  import {normalizeChinese} from './normalize.js'
  let folio1=$state(taisho_da_1.split('\n').map(it=>it.split('\t')[0]))
  let folio2=$state(jinshan_da_1.split('\n').map(it=>it.split('\t')[0]))
  let pos=50;
  let value1=$state(taisho_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'))
  let value2=$state(jinshan_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'))
  let D=[];
  $effect ( ()=>{
    D=diffChars(normalizeChinese(value1),normalizeChinese(value2));
  })
  const editorstyle={    height:"95vh" }
  
  let view2;
  const onCursorActivity = EditorView.updateListener.of((update) => {
    if (update.selectionSet) {
      // The selection (and thus the cursor) has changed
      const currentSelection = update.state.selection.main;
      const newhead=transpagePosition(D,currentSelection.head);
      const line=update.state.doc.lineAt(newhead);
      console.log('line',line)
      view2.dispatch({
        selection: EditorSelection.range(newhead,newhead+1),
        effects: EditorView.scrollIntoView(line.from, {y:'center'})
      })
      // You can perform actions based on the new cursor position here
    }
  });

  const FolioLineNumbers1 = lineNumbers({ formatNumber: n => folio1[n-1] })
  const FolioLineNumbers2 = lineNumbers({ formatNumber: n => folio2[n-1] })

</script>

<main>

<SplitPane type="horizontal" bind:pos min={15} max={85}>
  
    <div slot="a">
      <ToolbarLeft/>
        <Codemirror 
          extensions={[FolioLineNumbers1,onCursorActivity]} 
          bind:value={value1} lineWrapping={true} styles={{"&": editorstyle }}/>
    </div>
    <div slot="b">
      <ToolbarRight/>
        <Codemirror on:ready={(e) => view2 = e.detail} 
          extensions={[FolioLineNumbers2]} 
          bind:value={value2} styles={{"&": editorstyle }}/>
    </div>
</SplitPane>
</main>

<style>
  main {width:100vw;height:100vh}
</style>
