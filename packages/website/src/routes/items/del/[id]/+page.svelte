<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Del Item {data.id}</h1>

<a href="/items">Back</a>
