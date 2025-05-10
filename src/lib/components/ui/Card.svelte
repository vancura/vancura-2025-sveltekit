<script lang="ts">
  export let title: string = '';
  export let elevated: boolean = false;
  export let variant: 'default' | 'primary' | 'secondary' = 'default';
  export let hasFooter: boolean = true;
  let className = '';
  export { className as class };

  $: variantClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    secondary: 'bg-gray-50 border-gray-200'
  }[variant];

  $: headerClasses = {
    default: 'border-gray-200 bg-gray-50',
    primary: 'border-blue-200 bg-blue-100',
    secondary: 'border-gray-200 bg-gray-100'
  }[variant];

  $: footerClasses = headerClasses;
</script>

<div class="{variantClasses} rounded-lg overflow-hidden border transition-shadow duration-200 {elevated ? 'shadow-lg hover:shadow-xl' : 'hover:shadow-md'} {className}">
  {#if title}
    <div class="px-4 py-3 border-b {headerClasses}">
      <h3 class="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  {/if}
  <div class="p-5">
    <slot />
  </div>
  {#if hasFooter}
    <div class="px-4 py-3 border-t {footerClasses}">
      <slot name="footer">
        FOOTER
        <!-- Default footer content if none is provided -->
      </slot>
    </div>
  {/if}
</div>
