<script lang="ts">
  import { graphql } from '$houdini';

  $: store = graphql(`
    query GetItems @load {
      itemsConnection(page: 1, limit: 20, sortBy: "name", sortOrder: "desc") {
        nodes @list(name: "All_Items") {
          _id
          name
        }
        pageInfo {
          totalPages
          totalNodes
        }
      }
    }
  `);
</script>

<p>List</p>
<div class="p-2">
  {#if $store?.data?.itemsConnection.nodes}
    <div class="grid grid-cols-1 gap-2">
      {#each $store?.data?.itemsConnection.nodes as item}
        {#if item}
          <div class="flex">
            <div>{item.name}</div>
            <div><a class="m-2" href={`/items/edit/${item._id}`}>Edit</a></div>
            <div><a class="m-2" href={`/items/del/${item._id}`}>Del</a></div>
            <div><a class="m-2" href={`/items/view/${item._id}`}>View</a></div>
          </div>
        {/if}
      {/each}
    </div>
    <div>
      Page {$store?.data?.itemsConnection.pageInfo?.totalNodes}
    </div>
  {/if}
</div>
