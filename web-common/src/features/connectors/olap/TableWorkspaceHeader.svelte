<script lang="ts">
  import {
    Button,
    IconSpaceFixer,
  } from "@rilldata/web-common/components/button";
  import PanelCTA from "@rilldata/web-common/components/panel/PanelCTA.svelte";
  import ResponsiveButtonText from "@rilldata/web-common/components/panel/ResponsiveButtonText.svelte";
  import Add from "../../../components/icons/Add.svelte";
  import { WorkspaceHeader } from "../../../layout/workspace";
  import { BehaviourEventMedium } from "../../../metrics/service/BehaviourEventTypes";
  import { MetricsEventSpace } from "../../../metrics/service/MetricsTypes";
  import { runtime } from "../../../runtime-client/runtime-store";
  import { featureFlags } from "../../feature-flags";
  import { useCreateDashboardFromTableUIAction } from "../../metrics-views/ai-generation/generateMetricsView";

  export let connector: string;
  export let database: string = "";
  export let databaseSchema: string;
  export let table: string;

  const { ai } = featureFlags;

  $: createDashboardFromTable = useCreateDashboardFromTableUIAction(
    $runtime.instanceId,
    connector,
    database,
    databaseSchema,
    table,
    "dashboards",
    BehaviourEventMedium.Button,
    MetricsEventSpace.RightPanel,
  );

  function isHeaderWidthSmall(width: number) {
    return width < 800;
  }
</script>

<div class="grid items-center" style:grid-template-columns="auto max-content">
  <WorkspaceHeader
    editable={false}
    showInspectorToggle={false}
    titleInput={table}
  >
    <svelte:fragment let:width={headerWidth} slot="cta">
      {@const collapse = isHeaderWidthSmall(headerWidth)}
      <PanelCTA side="right">
        <Button on:click={createDashboardFromTable} type="primary">
          <IconSpaceFixer pullLeft pullRight={collapse}>
            <Add />
          </IconSpaceFixer>
          <ResponsiveButtonText {collapse}>
            Generate dashboard {#if $ai}
              with AI
            {/if}
          </ResponsiveButtonText>
        </Button>
      </PanelCTA>
    </svelte:fragment>
  </WorkspaceHeader>
</div>
