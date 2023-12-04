<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;

  export let form: ActionData;
</script>

<h1>Add item</h1>
<form method="POST" use:enhance>
  <label>
    Name
    <input name="name" type="name" />
  </label>

  <button>Create</button>
</form>

<pre>
  {JSON.stringify(form)}
</pre>
<pre>
  {JSON.stringify(data)}
</pre>

{#if form?.data?.addItem?.node}
  Item added to server
{/if}
<a href="/items">Back</a>
