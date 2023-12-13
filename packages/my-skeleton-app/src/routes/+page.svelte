<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    ListBox,
    ListBoxItem,
    ProgressBar,
  } from '@skeletonlabs/skeleton';
  let valueSingle: string = 'books';
</script>

<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<Accordion autocollapse>
  <AccordionItem>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">
      <ListBox>
        <ListBoxItem bind:group={valueSingle} name="medium" value="books"
          >Books</ListBoxItem
        >
        <ListBoxItem bind:group={valueSingle} name="medium" value="movies"
          >Movies</ListBoxItem
        >
        <ListBoxItem bind:group={valueSingle} name="medium" value="tv"
          >TV</ListBoxItem
        >
      </ListBox>
    </svelte:fragment>
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">
      <ProgressBar value={undefined} />
    </svelte:fragment>
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">(content)</svelte:fragment>
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">(content)</svelte:fragment>
  </AccordionItem>
</Accordion>
