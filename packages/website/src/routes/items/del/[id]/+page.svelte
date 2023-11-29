<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Del Item {data.id}</h1>

<a href="/items">Back</a>

<h1>Add Item</h1>
<form method="POST" use:enhance>
  <input name="id" type="hidden" value={data.id} />
  <p>
    Confirm delete {data.id}?
  </p>

  <button>Yes</button>
  <a href="/items">Back</a>
</form>
