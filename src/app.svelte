<script lang="ts">
  // import Counter from './lib/counter.svelte'
  import ToolbarLeft from './toolbarleft.svelte'
  import ToolbarRight from './toolbarright.svelte'
  import SplitPane from './lib/splitpane.svelte';
  import Codemirror from './codemirror.svelte';
  import {lineNumbers} from '@codemirror/view'
  import {taisho_da_1, jinshan_da_1} from './sutratext.js'
  let folio1=$state(taisho_da_1.split('\n').map(it=>it.split('\t')[0]))
  let folio2=$state(jinshan_da_1.split('\n').map(it=>it.split('\t')[0]))
  let pos=45;
  let value1=$state(taisho_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'))
  let value2=$state(jinshan_da_1.split('\n').map(it=>it.split('\t')[1]).join('\n'))
  const editorstyle={
          height:"95vh",

        }
  const FolioLineNumbers1 = lineNumbers({ formatNumber: n => folio1[n] })
  const FolioLineNumbers2 = lineNumbers({ formatNumber: n => folio2[n] })
</script>

<main>

<SplitPane type="horizontal" bind:pos min={15} max={85}>
  
    <div slot="a">
      <ToolbarLeft/>
        <Codemirror extensions={[FolioLineNumbers1]} bind:value={value1} lineWrapping={true} styles={{"&": editorstyle }}/>
    </div>
    <div slot="b">
      <ToolbarRight/>
        <Codemirror extensions={[FolioLineNumbers2]} bind:value={value2} styles={{"&": editorstyle }}/>
    </div>
</SplitPane>
</main>

<style>
  main {width:100vw;height:100vh}
</style>
