package cmd

import (
	"context"
	"os"

	"github.com/rilldata/rill/cli/cmd/admin"
	"github.com/rilldata/rill/cli/cmd/auth"
	"github.com/rilldata/rill/cli/cmd/build"
	"github.com/rilldata/rill/cli/cmd/docs"
	"github.com/rilldata/rill/cli/cmd/initialize"
	"github.com/rilldata/rill/cli/cmd/org"
	"github.com/rilldata/rill/cli/cmd/project"
	"github.com/rilldata/rill/cli/cmd/runtime"
	"github.com/rilldata/rill/cli/cmd/source"
	"github.com/rilldata/rill/cli/cmd/start"
	versioncmd "github.com/rilldata/rill/cli/cmd/version"
	"github.com/rilldata/rill/cli/pkg/config"
	"github.com/spf13/cobra"
)

func init() {
	cobra.EnableCommandSorting = false
}

// rootCmd represents the base command when called without any subcommands.
var rootCmd = &cobra.Command{
	Use:   "rill <command>",
	Short: "Rill CLI",
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute(ctx context.Context, ver config.Version) {
	err := runCmd(ctx, ver)
	if err != nil {
		os.Exit(1)
	}
}

func runCmd(ctx context.Context, ver config.Version) error {
	// Cobra config
	rootCmd.Version = ver.String()
	rootCmd.PersistentFlags().BoolP("help", "h", false, "Print usage") // Overrides message for help
	rootCmd.Flags().BoolP("version", "v", false, "Show rill version")  // Adds option to get version by passing --version or -v

	// Build CLI config
	cfg := &config.Config{
		Version: ver,
	}

	// Add sub-commands
	rootCmd.AddCommand(initialize.InitCmd(cfg))
	rootCmd.AddCommand(start.StartCmd(cfg))
	rootCmd.AddCommand(build.BuildCmd(cfg))
	rootCmd.AddCommand(source.SourceCmd(cfg))
	rootCmd.AddCommand(admin.AdminCmd(cfg))
	rootCmd.AddCommand(runtime.RuntimeCmd(cfg))
	rootCmd.AddCommand(docs.DocsCmd())
	rootCmd.AddCommand(completionCmd)
	rootCmd.AddCommand(versioncmd.VersionCmd())

	// Add sub-commands for admin
	// (This allows us to add persistent flags that apply only to the admin-related commands.)
	adminCmds := []*cobra.Command{
		auth.AuthCmd(cfg),
		org.OrgCmd(cfg),
		project.ProjectCmd(cfg),
	}
	for _, cmd := range adminCmds {
		cmd.PersistentFlags().StringVar(&cfg.AdminURL, "api-url", "https://admin.rilldata.com", "Base URL for the admin API")
		cmd.PersistentFlags().StringVar(&cfg.AdminToken, "api-token", "", "Token for authenticating with the admin API")
		rootCmd.AddCommand(cmd)
	}

	return rootCmd.ExecuteContext(ctx)
}
