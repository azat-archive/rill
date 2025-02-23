<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "@rilldata/web-common/components/button";
  import InformationalField from "@rilldata/web-common/components/forms/InformationalField.svelte";
  import Input from "@rilldata/web-common/components/forms/Input.svelte";
  import SubmissionError from "@rilldata/web-common/components/forms/SubmissionError.svelte";
  import {
    ConnectorDriverPropertyType,
    RpcStatus,
    V1ConnectorDriver,
  } from "@rilldata/web-common/runtime-client";
  import { useQueryClient } from "@tanstack/svelte-query";
  import { createEventDispatcher } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import { overlay } from "../../../layout/overlay-store";
  import { inferSourceName } from "../sourceUtils";
  import { humanReadableErrorMessage } from "./errors";
  import { submitRemoteSourceForm } from "./submitRemoteSourceForm";
  import { getYupSchema, toYupFriendlyKey } from "./yupSchemas";

  export let connector: V1ConnectorDriver;

  const queryClient = useQueryClient();
  const dispatch = createEventDispatcher();

  let rpcError: RpcStatus | null = null;

  const { form, touched, errors, handleChange, handleSubmit, isSubmitting } =
    createForm({
      initialValues: !connector.implementsOlap ? { sourceName: "" } : {},
      validationSchema: getYupSchema(connector),
      onSubmit: async (values) => {
        // Sources
        if (!connector.implementsOlap) {
          overlay.set({ title: `Importing ${values.sourceName}` });
          try {
            await submitRemoteSourceForm(queryClient, connector, values);
            await goto(`/files/sources/${values.sourceName}.yaml`);
            dispatch("close");
          } catch (e) {
            rpcError = e?.response?.data;
          }
          overlay.set(null);
          return;
        }

        // Connectors
        try {
          await submitRemoteSourceForm(queryClient, connector, values);
          await goto(`/files/connectors/${connector.name}.yaml`);
          dispatch("close");
        } catch (e) {
          rpcError = e?.response?.data;
        }
      },
    });

  let connectorProperties = connector.sourceProperties ?? [];

  // Place the "Source name" field directly under the "Path" field, which is the first property for each connector (s3, gcs, https).
  // Temporary: for OLAP connectors, we enforce that connectorName=driver.
  if (!connector.implementsOlap) {
    connectorProperties = [
      ...(connector.sourceProperties?.slice(0, 1) ?? []),
      {
        key: "sourceName",
        displayName: "Source name",
        description: "The name of the source",
        placeholder: "my_new_source",
        type: ConnectorDriverPropertyType.TYPE_STRING,
        required: true,
      },
      ...(connector.sourceProperties?.slice(1) ?? []),
    ];
  }

  function onStringInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    if (name === "path") {
      if ($touched.sourceName) return;
      const sourceName = inferSourceName(connector, value);
      $form.sourceName = sourceName ? sourceName : $form.sourceName;
    }
  }
</script>

<div class="h-full w-full flex flex-col">
  <form
    class="pb-5 flex-grow overflow-y-auto"
    id="remote-source-{connector.name}-form"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="pb-2 text-slate-500">
      Need help? Refer to our
      <a
        href="https://docs.rilldata.com/build/connect"
        rel="noreferrer noopener"
        target="_blank">docs</a
      > for more information.
    </div>
    {#if rpcError}
      <SubmissionError
        message={humanReadableErrorMessage(
          connector.name,
          rpcError.code,
          rpcError.message,
        )}
      />
    {/if}

    {#each connectorProperties as property (property.key)}
      {#if property.key !== undefined}
        {@const label =
          property.displayName + (property.required ? "" : " (optional)")}
        <div class="py-1.5">
          {#if property.type === ConnectorDriverPropertyType.TYPE_STRING || property.type === ConnectorDriverPropertyType.TYPE_NUMBER}
            <Input
              id={toYupFriendlyKey(property.key)}
              label={property.displayName}
              placeholder={property.placeholder}
              optional={!property.required}
              secret={property.secret}
              hint={property.hint}
              error={$errors[toYupFriendlyKey(property.key)]}
              bind:value={$form[toYupFriendlyKey(property.key)]}
              onInput={onStringInputChange}
              onChange={handleChange}
            />
          {:else if property.type === ConnectorDriverPropertyType.TYPE_BOOLEAN}
            <label for={property.key} class="flex items-center">
              <input
                id={property.key}
                type="checkbox"
                bind:checked={$form[property.key]}
                class="h-5 w-5"
              />
              <span class="ml-2 text-sm">{label}</span>
            </label>
          {:else if property.type === ConnectorDriverPropertyType.TYPE_INFORMATIONAL}
            <InformationalField
              description={property.description}
              hint={property.hint}
              href={property.docsUrl}
            />
          {/if}
        </div>
      {/if}
    {/each}
  </form>
  <div class="flex items-center space-x-2">
    <div class="grow" />
    <Button on:click={() => dispatch("back")} type="secondary">Back</Button>
    <Button
      disabled={$isSubmitting}
      form="remote-source-{connector.name}-form"
      submitForm
      type="primary"
    >
      Add data
    </Button>
  </div>
</div>
