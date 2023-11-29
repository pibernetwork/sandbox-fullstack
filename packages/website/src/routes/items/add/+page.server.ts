import { graphql } from '$houdini';
import { fail } from '@sveltejs/kit';

/* @type { import('./$types').Actions } */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const name = data.get('name')?.toString();

    if (!name) {
      return fail(403, { name: '*' });
    }

    const editMutation = graphql(`
      mutation AddItem($name: String!) {
        addItem(name: $name) {
          node {
            _id
            name
            ...All_Items_insert
          }
          errors {
            key
            message
          }
        }
      }
    `);

    return await editMutation.mutate({ name }, { event });
  },
};
