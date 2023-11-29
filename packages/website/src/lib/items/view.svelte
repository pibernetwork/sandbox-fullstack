<script lang="ts">
  import { graphql } from '$houdini';
  import type { GetItemVariables } from './$houdini';

  export let id: string;

  export const _GetItemVariables: GetItemVariables = () => {
    return { _id: id };
  };

  $: store = graphql(`
    query GetItem($_id: String!) @load {
      item(_id: $_id) {
        _id
        name
      }
    }
  `);
</script>

<div class="m-2">
  {#if $store?.data?.item}
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
