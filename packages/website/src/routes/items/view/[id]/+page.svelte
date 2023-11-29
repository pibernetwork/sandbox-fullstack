<script lang="ts">
  import View from '$lib/items/view.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>View {data.id}</h1>

<View id={data.id}></View>

<a href="/items">Back</a>
