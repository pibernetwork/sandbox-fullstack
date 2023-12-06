<script lang="ts">
  import { graphql } from '$houdini';

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

  $: store.fetch({ variables: { sortBy, sortOrder } });

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
<div class="p-2">
  {#if $store?.data?.itemsConnection.nodes}
    <div class="grid grid-cols-1 gap-2" role="list">
      {#each $store?.data?.itemsConnection.nodes as item}
        {#if item}
          <div class="flex" role="listitem">
            <div class="mx-2">{item.name}</div>
            <div class="mx-2">{item.quantity}</div>
            <div>
              <a class="m-2" href={`/items/edit/${item._id}`}>Edit</a>
              <a class="m-2" href={`/items/del/${item._id}`}>Del</a>
              <a class="m-2" href={`/items/view/${item._id}`}>View</a>
            </div>
          </div>
        {/if}
      {/each}
    </div>
    <div>
      Page {$store?.data?.itemsConnection.pageInfo?.totalNodes}
    </div>
  {/if}
</div>
