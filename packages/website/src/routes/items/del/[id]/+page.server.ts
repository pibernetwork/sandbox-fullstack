import { graphql } from '$houdini';
import { fail } from '@sveltejs/kit';

/* @type { import('./$types').Actions } */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const id = data.get('id')?.toString();

    if (!id) {
      return fail(403, { name: '*' });
    }

    const delMutation = graphql(`
      mutation DelItem($id: String!) {
        delItem(_id: $id)
      }
    `);

    const response = await delMutation.mutate({ id }, { event });

    return response;
  },
};
