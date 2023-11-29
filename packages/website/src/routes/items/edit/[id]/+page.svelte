<script lang="ts">
  import type { PageData } from './$types';

  import { EditItemStore } from '$houdini';
  export let data: PageData;
  const update = new EditItemStore();

  async function submitForm() {
    await update.mutate({ id: data.id, name: 'Edited!' });
  }
</script>

<h1>Edit Item {data.id}</h1>

<button on:click={submitForm}>Save</button>
<a href="/items">Back</a>
