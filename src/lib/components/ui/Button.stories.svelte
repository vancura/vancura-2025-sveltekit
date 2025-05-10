<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary', 'danger'],
      },
      size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
      },
      disabled: {
        control: 'boolean',
      },
    },
    args: {
      onClick: fn(),
    },
  });
</script>

<Story name="Primary">
  <Button variant="primary">Primary Button</Button>
</Story>

<Story name="Secondary">
  <Button variant="secondary">Secondary Button</Button>
</Story>

<Story name="Disabled">
  <Button disabled>Disabled Button</Button>
</Story>
