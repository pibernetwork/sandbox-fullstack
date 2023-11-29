<script lang="ts">
  import { page } from '$app/stores';
  import View from '$lib/items/view.svelte';
  import { redirect } from '@sveltejs/kit';

  const id = $page?.params['id'];

  if (!id) {
    throw redirect(303, '/items');
  }
</script>

<h1>View {id}</h1>

<View {id}></View>

<a href="/items">Back</a>
