import { graphql } from '$houdini';

/* @type { import('./$types').Actions } */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    const name = data.get('name')?.toString() || '';
    const id = data.get('id')?.toString() || '';

    const editMutation = graphql(`
      mutation EditItem($id: String!, $name: String!) {
        editItem(_id: $id, name: $name) {
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

    const response = await editMutation.mutate({ id, name }, { event });

    return response;
  },
};
