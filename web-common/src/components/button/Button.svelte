<script lang="ts">
  import { builderActions, getAttrs, type Builder } from "bits-ui";
  import { createEventDispatcher } from "svelte";

  type ButtonType =
    | "primary"
    | "secondary"
    | "plain"
    | "subtle"
    | "ghost"
    | "dashed"
    | "link"
    | "text"
    | "add";

  export let type: ButtonType = "plain";
  export let status: "info" | "error" = "info";
  export let disabled = false;
  export let compact = false;
  export let submitForm = false;
  export let form = "";
  export let label: string | undefined | null = null;
  export let square = false;
  export let circle = false;
  export let selected = false;
  export let large = false;
  export let small = false;
  export let noStroke = false;
  export let rounded = false;
  export let href: string | null = null;
  export let builders: Builder[] = [];
  export let loading = false;
  export let target: string | undefined = undefined;

  const dispatch = createEventDispatcher();

  const handleClick = (event: MouseEvent) => {
    if (!disabled) {
      dispatch("click", event);
    }
  };
</script>

<svelte:element
  this={disabled || !href ? "button" : "a"}
  role="button"
  tabindex={disabled ? -1 : 0}
  {href}
  class="{$$props.class} {type}"
  {disabled}
  class:square
  class:circle
  class:selected
  class:loading
  class:large
  class:small
  class:compact
  class:rounded
  class:danger={status === "error"}
  class:no-stroke={noStroke}
  type={submitForm ? "submit" : "button"}
  form={submitForm ? form : undefined}
  aria-label={label}
  {target}
  rel={target === "_blank" ? "noopener noreferrer" : undefined}
  {...getAttrs(builders)}
  use:builderActions={{ builders }}
  on:click={handleClick}
>
  {#if loading}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path
        fill="currentColor"
        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
    {#if !square && !circle && !compact}
      <span>Loading</span>
    {/if}
  {:else}
    <slot />
  {/if}
</svelte:element>

<style lang="postcss">
  button,
  a {
    @apply flex text-center items-center justify-center;
    @apply text-xs leading-snug font-normal;
    @apply select-none  cursor-pointer;
    @apply rounded-[2px];
    @apply px-3 gap-x-2;
    @apply h-7  min-h-[28px] min-w-fit;
    @apply font-medium;
  }

  button:disabled {
    @apply cursor-not-allowed;
  }

  /* PRIMARY STYLES */

  .primary {
    @apply bg-primary-600 text-white;
  }

  .primary:hover {
    @apply bg-primary-700;
  }

  .primary:active,
  .primary.selected {
    @apply bg-primary-800;
  }

  .primary.disabled {
    @apply bg-slate-400;
  }

  /* SECONDARY, GHOST, DASHED STYLES */

  .secondary,
  .ghost,
  .dashed {
    @apply bg-transparent text-primary-600;
  }

  .secondary,
  .dashed {
    @apply border border-primary-300;
  }

  .secondary:hover,
  .ghost:hover,
  .dashed:hover {
    @apply bg-primary-50;
  }

  .secondary:active,
  .secondary.selected,
  .ghost:active,
  .ghost.selected,
  .dashed:active,
  .dashed.selected {
    @apply bg-primary-100;
  }

  .secondary.loading,
  .ghost.loading,
  .dashed.loading {
    @apply bg-slate-50;
    @apply border-slate-300;
    @apply text-slate-600;
  }

  .secondary:disabled,
  .dashed:disabled {
    @apply text-slate-400 bg-slate-50 border-slate-300;
  }

  .ghost:disabled {
    @apply bg-transparent text-slate-400;
  }

  /* PLAIN STYLES */

  .plain {
    @apply bg-transparent text-slate-600;
    @apply border border-slate-300;
  }

  .plain:hover {
    @apply bg-slate-100;
  }

  .plain:active,
  .plain.selected {
    @apply bg-slate-200;
  }

  .plain.disabled {
    @apply text-slate-400;
  }

  /* SUBTLE STYLES */

  .subtle {
    @apply bg-primary-50 text-primary-700;
  }

  .subtle:hover {
    @apply bg-primary-100;
  }

  .subtle:active,
  .subtle.selected {
    @apply bg-primary-200 text-primary-900;
  }

  .subtle.loading {
    @apply bg-slate-50 text-slate-600;
  }

  .subtle:disabled {
    @apply text-slate-400 bg-slate-50;
  }

  /* LINK STYLES */

  .link {
    @apply text-primary-600;
  }

  .link:hover {
    @apply text-primary-700;
  }

  .link:active,
  .link.selected {
    @apply text-primary-800;
  }

  .link.loading {
    @apply text-slate-600;
  }

  .link:disabled {
    @apply text-slate-400;
  }

  /* TEXT STYLES */

  .text {
    @apply text-slate-600;
  }

  .text:hover {
    @apply text-primary-700;
  }

  .text:active,
  .text.selected {
    @apply text-primary-800;
  }

  .text.loading {
    @apply text-slate-600;
  }

  .text:disabled {
    @apply text-slate-400;
  }

  /* DANGER STYLES */

  .danger.primary {
    @apply bg-red-500 text-white;
  }

  .danger.primary:hover {
    @apply bg-red-600;
  }

  .danger.primary:active,
  .danger.selected {
    @apply bg-red-700;
  }

  .danger.primary:disabled {
    @apply bg-slate-400;
  }

  .danger.secondary {
    @apply bg-white;
    @apply text-red-500;
    @apply border-red-500;
  }

  .danger.secondary:hover {
    @apply text-red-600;
    @apply border-red-600;
  }

  .danger.secondary:disabled {
    @apply text-slate-400;
    @apply bg-slate-50;
    @apply border-slate-300;
  }

  /* SHAPE STYLES */

  .square,
  .circle {
    @apply p-0 aspect-square;
    @apply text-ellipsis overflow-hidden whitespace-nowrap flex-grow-0 flex-shrink-0;
  }

  .rounded,
  .circle {
    @apply rounded-full;
  }

  /* TWEAKS */

  .small {
    @apply h-6 text-[11px];
  }

  .large {
    @apply h-9 text-sm;
  }

  .large.square,
  .large.circle {
    @apply h-10;
  }

  .compact {
    @apply px-2;
  }

  .no-stroke {
    @apply border-none;
  }

  .dashed {
    @apply border border-dashed;
  }

  /* ADD BUTTON STYLES */

  .add {
    @apply w-[34px] h-[26px] rounded-2xl;
    @apply flex items-center justify-center;
    @apply border border-dashed border-slate-300;
    @apply bg-white px-0;
  }
</style>
