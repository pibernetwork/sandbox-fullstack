import { graphql } from '$houdini';
import { fail, redirect } from '@sveltejs/kit';

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
          }
          errors {
            key
            message
          }
        }
      }
    `);

    const response = await editMutation.mutate({ name }, { event });

    if (response?.data?.addItem) {
      throw redirect(303, '/items');
    }

    return response;
  },
};
