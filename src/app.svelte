<script lang="ts">
  // import Counter from './lib/counter.svelte'
  import ToolbarLeft from './toolbarleft.svelte'
  import ToolbarRight from './toolbarright.svelte'
  import SplitPane from './lib/splitpane.svelte';
  import Codemirror from './codemirror.svelte';
  let pos=45;
  let value1=$state('abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  let value2=$state('xyz')
  const editorstyle={
          height:"95vh",

        }
</script>

<main>

<SplitPane type="horizontal" bind:pos min={15} max={85}>
  
    <div slot="a">
      <ToolbarLeft/>
        <Codemirror bind:value={value1} lineWrapping={true} styles={{"&": editorstyle }}/>
    </div>
    <div slot="b">
      <ToolbarRight/>
        <Codemirror bind:value={value2} styles={{"&": editorstyle }}/>
    </div>
</SplitPane>
</main>

<style>
  main {width:100vw;height:100vh}
</style>
