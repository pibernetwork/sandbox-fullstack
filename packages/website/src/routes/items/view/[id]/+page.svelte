<script lang="ts">
  import { page } from '$app/stores';
  import { graphql } from '$houdini';
  import type { PageData } from '../$types';

  export let data: PageData;

  const id = $page?.params['id'];

  const store = graphql(`
    query GetItemTwo($_id: String!) {
      item(_id: $_id) {
        _id
        name
      }
    }
  `);

  if (id) {
    store.fetch({ event: data['event'], variables: { _id: id } });
  }
</script>

<h1>View item {id}</h1>
{JSON.stringify($store)}
<div class="m-2">
  {#if $store?.data?.item}
    <h2>Item loaded</h2>
    <div>{$store?.data?.item._id}</div>
    <div>{$store?.data?.item.name}</div>
    <div>
      <a class="m-2" href={`/items/edit/${$store?.data?.item._id}`}>Edit</a>
    </div>
    <div>
      <a class="m-2" href={`/items/del/${$store?.data?.item._id}`}>Del</a>
    </div>
  {/if}
</div>

<a href="/items">Back</a>
