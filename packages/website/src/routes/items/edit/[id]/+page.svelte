<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { EditItemStore, graphql } from '$houdini';
  import { redirect } from '@sveltejs/kit';
  import type { PageData } from './$types';

  const id = $page?.params['id'];

  export let data: PageData;

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

  const update = new EditItemStore();

  async function submitForm() {
    if (!id) {
      return;
    }
    await update.mutate({ id: id, name: 'Edited!' });
  }
</script>

<h1>Edit Item {id}</h1>

<h1>Add Item</h1>
<form method="POST" use:enhance>
  <input name="id" type="hidden" value={$store.data?.item._id} />

  <label>
    Name
    <input name="name" type="name" value={$store.data?.item.name} />
  </label>

  <button>Edit</button>
</form>

{JSON.stringify($store)}
<button on:click={submitForm}>Save</button>
<a href="/items">Back</a>
