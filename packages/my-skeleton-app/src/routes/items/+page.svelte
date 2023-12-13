<script lang="ts">
  import { graphql } from '$houdini';
  import { ProgressRadial } from '@skeletonlabs/skeleton';

  import type { PageData } from './$types';
  export let data: PageData;
  let sortBy = 'name';
  let sortOrder = 'asc';

  const store = graphql(`
    query GetItems($sortBy: String!, $sortOrder: String!)
    @cache(policy: NetworkOnly) {
      itemsConnection(
        page: 1
        limit: 200
        sortBy: $sortBy
        sortOrder: $sortOrder
      ) {
        nodes @list(name: "All_Items") {
          _id
          name
          quantity
        }
        pageInfo {
          totalPages
          totalNodes
        }
      }
    }
  `);

  $: store.fetch({ variables: { sortBy, sortOrder }, event: data.event });

  function changeOrder(sortByArgument: string, sortOrderArgument: string) {
    sortBy = sortByArgument;
    sortOrder = sortOrderArgument;
  }
</script>

<h1>Items</h1>
<a
  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
  href="/items/add">Add</a
>
<p class="m-2">List</p>

<div>
  <button on:click={() => changeOrder('name', 'asc')}>Name ASC</button>
  <button on:click={() => changeOrder('name', 'desc')}>Name DESC</button>
  <button on:click={() => changeOrder('quantity', 'asc')}>Quantity ASC</button>
  <button on:click={() => changeOrder('quantity', 'desc')}>Quantity DESC</button
  >
</div>
{JSON.stringify($store.fetching)}

{#if $store.fetching}
  <ProgressRadial value={undefined} />
{/if}
{#if $store?.data?.itemsConnection.nodes}
  <div class="table-container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantiy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $store?.data?.itemsConnection.nodes as item}
          {#if item}
            <tr>
              <td class="mx-2">{item.name}</td>
              <td class="mx-2">{item.quantity}</td>
              <td>
                <a class="m-2" href={`/items/edit/${item._id}`}>Edit</a>
                <a class="m-2" href={`/items/del/${item._id}`}>Del</a>
                <a class="m-2" href={`/items/view/${item._id}`}>View</a>
              </td>
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
{/if}
