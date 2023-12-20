import type { Meta, StoryObj } from "@storybook/react";

import BoardWrapper from "./BoardWrapper";

const meta: Meta<typeof BoardWrapper> = {
  component: BoardWrapper,
};

export default meta;

type Story = StoryObj<typeof BoardWrapper>;

export const Primary: Story = {
  render: () => (
    <BoardWrapper>
      <>My Wrapper</>
    </BoardWrapper>
  ),
};
