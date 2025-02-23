<script lang="ts">
  import { page } from "$app/stores";
  import { createAdminServiceGetProject } from "../../client";
  import ProjectDeploymentStatusChip from "./status/ProjectDeploymentStatusChip.svelte";

  $: ({
    url: { pathname },
    params: { organization, project },
  } = $page);

  // Get the list of tabs to display, depending on the user's permissions
  $: tabsQuery = createAdminServiceGetProject(
    organization,
    project,
    undefined,
    {
      query: {
        select: (data) => {
          let commonTabs = [
            {
              route: `/${organization}/${project}`,
              label: "Dashboards",
            },
            {
              route: `/${organization}/${project}/-/reports`,
              label: "Reports",
            },
          ];

          commonTabs.push({
            route: `/${organization}/${project}/-/alerts`,
            label: "Alerts",
          });

          const adminTabs = [
            {
              route: `/${organization}/${project}/-/status`,
              label: "Status",
            },
          ];

          if (data.projectPermissions?.manageProject) {
            return [...commonTabs, ...adminTabs];
          } else {
            return commonTabs;
          }
        },
      },
    },
  );

  $: tabs = $tabsQuery.data;
</script>

{#if tabs}
  <nav>
    {#each tabs as tab (tab.route)}
      <a href={tab.route} class:selected={pathname === tab.route}>
        {tab.label}
        {#if tab.label === "Status"}
          <ProjectDeploymentStatusChip
            {organization}
            {project}
            iconOnly={true}
          />
        {/if}
      </a>
    {/each}
  </nav>
{/if}

<style lang="postcss">
  a {
    @apply p-2 flex gap-x-1 items-center;
    @apply rounded-sm text-gray-500;
    @apply text-xs font-medium justify-center;
  }

  .selected {
    @apply text-gray-900;
  }

  a:hover {
    @apply bg-slate-100 text-gray-700;
  }

  nav {
    @apply flex gap-x-6 px-[17px] border-b pt-1 pb-[3px];
  }
</style>
