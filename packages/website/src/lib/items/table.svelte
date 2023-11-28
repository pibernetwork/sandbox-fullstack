<script lang="ts">
  import { graphql } from '$houdini';

  $: store = graphql(`
    query GetItems @load {
      items {
        _id
        name
      }
    }
  `);
</script>

<h2>Items - Display items</h2>

<p>Errors</p>
{#if $store?.data?.items}
  <p>
    {#each $store?.data?.items as item}
      {#if item}
        <p>{item.name}</p>
      {/if}
    {/each}
  </p>
{/if}
<p>Details</p>
