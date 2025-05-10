<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
      },
      elevated: {
        control: 'boolean',
      },
    },
  });
</script>

<Story name="Basic">
  <Card>
    <p>This is a basic card with no title or footer.</p>
  </Card>
</Story>

<Story name="With Title">
  <Card title="Card Title">
    <p>This card has a title in the header.</p>
  </Card>
</Story>

<Story name="With Footer">
  <Card title="Card With Footer">
    <p>This card has both a title and footer content.</p>
    <svelte:fragment slot="footer">
      <div class="flex justify-end">
        <Button variant="secondary" size="small">Cancel</Button>
        <Button variant="primary" size="small" class="ml-2">Save</Button>
      </div>
    </svelte:fragment>
  </Card>
</Story>

<Story name="Elevated">
  <Card title="Elevated Card" elevated>
    <p>This card has a shadow to give it an elevated appearance.</p>
  </Card>
</Story>