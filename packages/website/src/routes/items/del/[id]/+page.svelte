<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, PageData } from './$types';

  export let data: PageData;

  export let form: ActionData;
</script>

<h1>Del Item {data.id}</h1>

<h1>Add Item</h1>
<form method="POST" use:enhance>
  <input name="id" type="hidden" value={data.id} />
  <p>
    Confirm delete {data.id}?
  </p>

  <button>Yes</button>
</form>

{#if form?.data?.delItem}
  <div>Item deleted from server</div>
{/if}
<a href="/items">Back</a>
