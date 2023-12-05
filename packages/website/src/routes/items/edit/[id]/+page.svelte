<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { graphql } from '$houdini';
  import { redirect } from '@sveltejs/kit';
  import type { ActionData, PageData } from './$types';

  const id = $page?.params['id'];

  export let data: PageData;
  export let form: ActionData;

  const store = graphql(`
    query GetItemView($_id: String!) {
      item(_id: $_id) {
        _id
        name
      }
    }
  `);

  if (id) {
    store.fetch({ event: data.event, variables: { _id: id } });
  }

  if (!id) {
    throw redirect(303, '/items');
  }
</script>

<h1>Edit Item {id}</h1>

<form method="POST" use:enhance>
  <input name="id" type="hidden" value={$store.data?.item._id} />

  <label>
    Name
    <input name="name" type="name" value={$store.data?.item.name} />
  </label>

  <button>Save</button>
</form>

<a href="/items">Back</a>
{#if form?.data?.editItem?.node}
  <div>Item updated on server</div>
{/if}
<pre>
  {JSON.stringify(form)}
</pre>
<pre>
  {JSON.stringify(data)}
</pre>
