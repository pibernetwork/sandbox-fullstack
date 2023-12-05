import { graphql } from '$houdini';

/* @type { import('./$types').Actions } */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const name = data.get('name')?.toString() || '';

    const addMutation = graphql(`
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

    const response = await addMutation.mutate({ name }, { event });

    return response;
  },
};
