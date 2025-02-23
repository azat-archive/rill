package database

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// Drivers is a registry of drivers
var Drivers = make(map[string]Driver)

// Register registers a new driver.
func Register(name string, driver Driver) {
	if Drivers[name] != nil {
		panic(fmt.Errorf("already registered database driver with name '%s'", name))
	}
	Drivers[name] = driver
}

// Open opens a new database connection.
func Open(driver, dsn string) (DB, error) {
	d, ok := Drivers[driver]
	if !ok {
		return nil, fmt.Errorf("unknown database driver: %s", driver)
	}

	db, err := d.Open(dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

// Driver is the interface for DB drivers.
type Driver interface {
	Open(dsn string) (DB, error)
}

// DB is the interface for a database connection.
type DB interface {
	Close() error
	NewTx(ctx context.Context) (context.Context, Tx, error)

	Migrate(ctx context.Context) error
	FindMigrationVersion(ctx context.Context) (int, error)

	FindOrganizations(ctx context.Context, afterName string, limit int) ([]*Organization, error)
	FindOrganizationsForUser(ctx context.Context, userID string, afterName string, limit int) ([]*Organization, error)
	FindOrganization(ctx context.Context, id string) (*Organization, error)
	FindOrganizationByName(ctx context.Context, name string) (*Organization, error)
	CheckOrganizationHasOutsideUser(ctx context.Context, orgID, userID string) (bool, error)
	CheckOrganizationHasPublicProjects(ctx context.Context, orgID string) (bool, error)
	InsertOrganization(ctx context.Context, opts *InsertOrganizationOptions) (*Organization, error)
	DeleteOrganization(ctx context.Context, name string) error
	UpdateOrganization(ctx context.Context, id string, opts *UpdateOrganizationOptions) (*Organization, error)
	UpdateOrganizationAllUsergroup(ctx context.Context, orgID, groupID string) (*Organization, error)

	FindOrganizationWhitelistedDomain(ctx context.Context, orgID string, domain string) (*OrganizationWhitelistedDomain, error)
	FindOrganizationWhitelistedDomainForOrganizationWithJoinedRoleNames(ctx context.Context, orgID string) ([]*OrganizationWhitelistedDomainWithJoinedRoleNames, error)
	FindOrganizationWhitelistedDomainsForDomain(ctx context.Context, domain string) ([]*OrganizationWhitelistedDomain, error)
	InsertOrganizationWhitelistedDomain(ctx context.Context, opts *InsertOrganizationWhitelistedDomainOptions) (*OrganizationWhitelistedDomain, error)
	DeleteOrganizationWhitelistedDomain(ctx context.Context, id string) error

	FindProjects(ctx context.Context, afterName string, limit int) ([]*Project, error)
	FindProjectsByVersion(ctx context.Context, version, afterName string, limit int) ([]*Project, error)
	FindProjectPathsByPattern(ctx context.Context, namePattern, afterName string, limit int) ([]string, error)
	FindProjectPathsByPatternAndAnnotations(ctx context.Context, namePattern, afterName string, annotationKeys []string, annotationPairs map[string]string, limit int) ([]string, error)
	FindProjectsForUser(ctx context.Context, userID string) ([]*Project, error)
	FindProjectsForOrganization(ctx context.Context, orgID, afterProjectName string, limit int) ([]*Project, error)
	// FindProjectsForOrgAndUser lists the public projects in the org and the projects where user is added as an external user
	FindProjectsForOrgAndUser(ctx context.Context, orgID, userID, afterProjectName string, limit int) ([]*Project, error)
	FindPublicProjectsInOrganization(ctx context.Context, orgID, afterProjectName string, limit int) ([]*Project, error)
	FindProjectsByGithubURL(ctx context.Context, githubURL string) ([]*Project, error)
	FindProjectsByGithubInstallationID(ctx context.Context, id int64) ([]*Project, error)
	FindProject(ctx context.Context, id string) (*Project, error)
	FindProjectByName(ctx context.Context, orgName string, name string) (*Project, error)
	InsertProject(ctx context.Context, opts *InsertProjectOptions) (*Project, error)
	DeleteProject(ctx context.Context, id string) error
	UpdateProject(ctx context.Context, id string, opts *UpdateProjectOptions) (*Project, error)
	CountProjectsForOrganization(ctx context.Context, orgID string) (int, error)
	FindProjectWhitelistedDomain(ctx context.Context, projectID, domain string) (*ProjectWhitelistedDomain, error)
	FindProjectWhitelistedDomainForProjectWithJoinedRoleNames(ctx context.Context, projectID string) ([]*ProjectWhitelistedDomainWithJoinedRoleNames, error)
	FindProjectWhitelistedDomainsForDomain(ctx context.Context, domain string) ([]*ProjectWhitelistedDomain, error)
	InsertProjectWhitelistedDomain(ctx context.Context, opts *InsertProjectWhitelistedDomainOptions) (*ProjectWhitelistedDomain, error)
	DeleteProjectWhitelistedDomain(ctx context.Context, id string) error

	FindExpiredDeployments(ctx context.Context) ([]*Deployment, error)
	FindDeploymentsForProject(ctx context.Context, projectID string) ([]*Deployment, error)
	FindDeployment(ctx context.Context, id string) (*Deployment, error)
	FindDeploymentByInstanceID(ctx context.Context, instanceID string) (*Deployment, error)
	InsertDeployment(ctx context.Context, opts *InsertDeploymentOptions) (*Deployment, error)
	DeleteDeployment(ctx context.Context, id string) error
	UpdateDeploymentStatus(ctx context.Context, id string, status DeploymentStatus, msg string) (*Deployment, error)
	UpdateDeploymentRuntimeVersion(ctx context.Context, id, version string) (*Deployment, error)
	UpdateDeploymentBranch(ctx context.Context, id, branch string) (*Deployment, error)
	UpdateDeploymentUsedOn(ctx context.Context, ids []string) error
	CountDeploymentsForOrganization(ctx context.Context, orgID string) (*DeploymentsCount, error)

	ResolveRuntimeSlotsUsed(ctx context.Context) ([]*RuntimeSlotsUsed, error)

	FindUsers(ctx context.Context) ([]*User, error)
	FindUsersByEmailPattern(ctx context.Context, emailPattern, afterEmail string, limit int) ([]*User, error)
	FindUser(ctx context.Context, id string) (*User, error)
	FindUserByEmail(ctx context.Context, email string) (*User, error)
	InsertUser(ctx context.Context, opts *InsertUserOptions) (*User, error)
	DeleteUser(ctx context.Context, id string) error
	UpdateUser(ctx context.Context, id string, opts *UpdateUserOptions) (*User, error)
	UpdateUserActiveOn(ctx context.Context, ids []string) error
	CheckUsersEmpty(ctx context.Context) (bool, error)
	FindSuperusers(ctx context.Context) ([]*User, error)
	UpdateSuperuser(ctx context.Context, userID string, superuser bool) error
	CheckUserIsAnOrganizationMember(ctx context.Context, userID, orgID string) (bool, error)
	CheckUserIsAProjectMember(ctx context.Context, userID, projectID string) (bool, error)

	InsertUsergroup(ctx context.Context, opts *InsertUsergroupOptions) (*Usergroup, error)
	FindUsergroupsForUser(ctx context.Context, userID, orgID string) ([]*Usergroup, error)
	InsertUsergroupMember(ctx context.Context, groupID, userID string) error
	DeleteUsergroupMember(ctx context.Context, groupID, userID string) error

	FindUserAuthTokens(ctx context.Context, userID string) ([]*UserAuthToken, error)
	FindUserAuthToken(ctx context.Context, id string) (*UserAuthToken, error)
	InsertUserAuthToken(ctx context.Context, opts *InsertUserAuthTokenOptions) (*UserAuthToken, error)
	UpdateUserAuthTokenUsedOn(ctx context.Context, ids []string) error
	DeleteUserAuthToken(ctx context.Context, id string) error
	DeleteExpiredUserAuthTokens(ctx context.Context, retention time.Duration) error

	FindServicesByOrgID(ctx context.Context, orgID string) ([]*Service, error)
	FindService(ctx context.Context, id string) (*Service, error)
	FindServiceByName(ctx context.Context, orgID, name string) (*Service, error)
	InsertService(ctx context.Context, opts *InsertServiceOptions) (*Service, error)
	DeleteService(ctx context.Context, id string) error
	UpdateService(ctx context.Context, id string, opts *UpdateServiceOptions) (*Service, error)
	UpdateServiceActiveOn(ctx context.Context, ids []string) error

	FindServiceAuthTokens(ctx context.Context, serviceID string) ([]*ServiceAuthToken, error)
	FindServiceAuthToken(ctx context.Context, id string) (*ServiceAuthToken, error)
	InsertServiceAuthToken(ctx context.Context, opts *InsertServiceAuthTokenOptions) (*ServiceAuthToken, error)
	UpdateServiceAuthTokenUsedOn(ctx context.Context, ids []string) error
	DeleteServiceAuthToken(ctx context.Context, id string) error
	DeleteExpiredServiceAuthTokens(ctx context.Context, retention time.Duration) error

	FindDeploymentAuthToken(ctx context.Context, id string) (*DeploymentAuthToken, error)
	InsertDeploymentAuthToken(ctx context.Context, opts *InsertDeploymentAuthTokenOptions) (*DeploymentAuthToken, error)
	UpdateDeploymentAuthTokenUsedOn(ctx context.Context, ids []string) error
	DeleteExpiredDeploymentAuthTokens(ctx context.Context, retention time.Duration) error

	FindDeviceAuthCodeByDeviceCode(ctx context.Context, deviceCode string) (*DeviceAuthCode, error)
	FindPendingDeviceAuthCodeByUserCode(ctx context.Context, userCode string) (*DeviceAuthCode, error)
	InsertDeviceAuthCode(ctx context.Context, deviceCode, userCode, clientID string, expiresOn time.Time) (*DeviceAuthCode, error)
	DeleteDeviceAuthCode(ctx context.Context, deviceCode string) error
	UpdateDeviceAuthCode(ctx context.Context, id, userID string, state DeviceAuthCodeState) error
	DeleteExpiredDeviceAuthCodes(ctx context.Context, retention time.Duration) error

	FindAuthorizationCode(ctx context.Context, code string) (*AuthorizationCode, error)
	InsertAuthorizationCode(ctx context.Context, code, userID, clientID, redirectURI, codeChallenge, codeChallengeMethod string, expiration time.Time) (*AuthorizationCode, error)
	DeleteAuthorizationCode(ctx context.Context, code string) error
	DeleteExpiredAuthorizationCodes(ctx context.Context, retention time.Duration) error

	FindOrganizationRole(ctx context.Context, name string) (*OrganizationRole, error)
	FindProjectRole(ctx context.Context, name string) (*ProjectRole, error)
	ResolveOrganizationRolesForUser(ctx context.Context, userID, orgID string) ([]*OrganizationRole, error)
	ResolveProjectRolesForUser(ctx context.Context, userID, projectID string) ([]*ProjectRole, error)

	FindOrganizationMemberUsers(ctx context.Context, orgID, afterEmail string, limit int) ([]*Member, error)
	FindOrganizationMemberUsersByRole(ctx context.Context, orgID, roleID string) ([]*User, error)
	InsertOrganizationMemberUser(ctx context.Context, orgID, userID, roleID string) error
	DeleteOrganizationMemberUser(ctx context.Context, orgID, userID string) error
	UpdateOrganizationMemberUserRole(ctx context.Context, orgID, userID, roleID string) error
	CountSingleuserOrganizationsForMemberUser(ctx context.Context, userID string) (int, error)

	FindProjectMemberUsers(ctx context.Context, projectID, afterEmail string, limit int) ([]*Member, error)
	InsertProjectMemberUser(ctx context.Context, projectID, userID, roleID string) error
	InsertProjectMemberUsergroup(ctx context.Context, groupID, projectID, roleID string) error
	DeleteProjectMemberUser(ctx context.Context, projectID, userID string) error
	DeleteAllProjectMemberUserForOrganization(ctx context.Context, orgID, userID string) error
	UpdateProjectMemberUserRole(ctx context.Context, projectID, userID, roleID string) error

	FindOrganizationInvites(ctx context.Context, orgID, afterEmail string, limit int) ([]*Invite, error)
	FindOrganizationInvitesByEmail(ctx context.Context, userEmail string) ([]*OrganizationInvite, error)
	FindOrganizationInvite(ctx context.Context, orgID, userEmail string) (*OrganizationInvite, error)
	InsertOrganizationInvite(ctx context.Context, opts *InsertOrganizationInviteOptions) error
	DeleteOrganizationInvite(ctx context.Context, id string) error
	CountInvitesForOrganization(ctx context.Context, orgID string) (int, error)
	UpdateOrganizationInviteRole(ctx context.Context, id, roleID string) error

	FindProjectInvites(ctx context.Context, projectID, afterEmail string, limit int) ([]*Invite, error)
	FindProjectInvitesByEmail(ctx context.Context, userEmail string) ([]*ProjectInvite, error)
	FindProjectInvite(ctx context.Context, projectID, userEmail string) (*ProjectInvite, error)
	InsertProjectInvite(ctx context.Context, opts *InsertProjectInviteOptions) error
	DeleteProjectInvite(ctx context.Context, id string) error
	UpdateProjectInviteRole(ctx context.Context, id, roleID string) error

	FindBookmarks(ctx context.Context, projectID, resourceKind, resourceName, userID string) ([]*Bookmark, error)
	FindBookmark(ctx context.Context, bookmarkID string) (*Bookmark, error)
	FindDefaultBookmark(ctx context.Context, projectID, resourceKind, resourceName string) (*Bookmark, error)
	InsertBookmark(ctx context.Context, opts *InsertBookmarkOptions) (*Bookmark, error)
	UpdateBookmark(ctx context.Context, opts *UpdateBookmarkOptions) error
	DeleteBookmark(ctx context.Context, bookmarkID string) error

	SearchProjectUsers(ctx context.Context, projectID, emailQuery string, afterEmail string, limit int) ([]*User, error)

	FindVirtualFiles(ctx context.Context, projectID, branch string, afterUpdatedOn time.Time, afterPath string, limit int) ([]*VirtualFile, error)
	FindVirtualFile(ctx context.Context, projectID, branch, path string) (*VirtualFile, error)
	UpsertVirtualFile(ctx context.Context, opts *InsertVirtualFileOptions) error
	UpdateVirtualFileDeleted(ctx context.Context, projectID, branch, path string) error
	DeleteExpiredVirtualFiles(ctx context.Context, retention time.Duration) error
}

// Tx represents a database transaction. It can only be used to commit and rollback transactions.
// Actual database calls should be made by passing the ctx returned from DB.NewTx to functions on the DB.
type Tx interface {
	// Commit commits the transaction
	Commit() error
	// Rollback discards the transaction *unless* it has already been committed.
	// It does nothing if Commit has already been called.
	// This means that a call to Rollback should almost always be defer'ed right after a call to NewTx.
	Rollback() error
}

// ErrNotFound is returned for single row queries that return no values.
var ErrNotFound = errors.New("database: not found")

// ErrNotUnique is returned when a unique constraint is violated
var ErrNotUnique = errors.New("database: violates unique constraint")

// Organization represents a tenant.
type Organization struct {
	ID                      string
	Name                    string
	Description             string
	AllUsergroupID          *string   `db:"all_usergroup_id"`
	CreatedOn               time.Time `db:"created_on"`
	UpdatedOn               time.Time `db:"updated_on"`
	QuotaProjects           int       `db:"quota_projects"`
	QuotaDeployments        int       `db:"quota_deployments"`
	QuotaSlotsTotal         int       `db:"quota_slots_total"`
	QuotaSlotsPerDeployment int       `db:"quota_slots_per_deployment"`
	QuotaOutstandingInvites int       `db:"quota_outstanding_invites"`
}

// InsertOrganizationOptions defines options for inserting a new org
type InsertOrganizationOptions struct {
	Name                    string `validate:"slug"`
	Description             string
	QuotaProjects           int
	QuotaDeployments        int
	QuotaSlotsTotal         int
	QuotaSlotsPerDeployment int
	QuotaOutstandingInvites int
}

// UpdateOrganizationOptions defines options for updating an existing org
type UpdateOrganizationOptions struct {
	Name                    string `validate:"slug"`
	Description             string
	QuotaProjects           int
	QuotaDeployments        int
	QuotaSlotsTotal         int
	QuotaSlotsPerDeployment int
	QuotaOutstandingInvites int
}

// Project represents one Git connection.
// Projects belong to an organization.
type Project struct {
	ID                   string
	OrganizationID       string `db:"org_id"`
	Name                 string
	Description          string
	Public               bool
	CreatedByUserID      *string `db:"created_by_user_id"`
	Provisioner          string
	GithubURL            *string           `db:"github_url"`
	GithubInstallationID *int64            `db:"github_installation_id"`
	Subpath              string            `db:"subpath"`
	ProdVersion          string            `db:"prod_version"`
	ProdBranch           string            `db:"prod_branch"`
	ProdVariables        map[string]string `db:"prod_variables"`
	ProdOLAPDriver       string            `db:"prod_olap_driver"`
	ProdOLAPDSN          string            `db:"prod_olap_dsn"`
	ProdSlots            int               `db:"prod_slots"`
	ProdTTLSeconds       *int64            `db:"prod_ttl_seconds"`
	ProdDeploymentID     *string           `db:"prod_deployment_id"`
	Annotations          map[string]string `db:"annotations"`
	CreatedOn            time.Time         `db:"created_on"`
	UpdatedOn            time.Time         `db:"updated_on"`
}

// InsertProjectOptions defines options for inserting a new Project.
type InsertProjectOptions struct {
	OrganizationID       string `validate:"required"`
	Name                 string `validate:"slug"`
	Description          string
	Public               bool
	CreatedByUserID      *string
	Provisioner          string
	GithubURL            *string `validate:"omitempty,http_url"`
	GithubInstallationID *int64  `validate:"omitempty,ne=0"`
	Subpath              string
	ProdVersion          string
	ProdBranch           string
	ProdVariables        map[string]string
	ProdOLAPDriver       string
	ProdOLAPDSN          string
	ProdSlots            int
	ProdTTLSeconds       *int64
}

// UpdateProjectOptions defines options for updating a Project.
type UpdateProjectOptions struct {
	Name                 string `validate:"slug"`
	Description          string
	Public               bool
	Provisioner          string
	GithubURL            *string `validate:"omitempty,http_url"`
	GithubInstallationID *int64  `validate:"omitempty,ne=0"`
	ProdVersion          string
	ProdBranch           string
	ProdVariables        map[string]string
	ProdDeploymentID     *string
	ProdSlots            int
	ProdTTLSeconds       *int64
	Annotations          map[string]string
}

// DeploymentStatus is an enum representing the state of a deployment
type DeploymentStatus int

const (
	DeploymentStatusUnspecified DeploymentStatus = 0
	DeploymentStatusPending     DeploymentStatus = 1
	DeploymentStatusOK          DeploymentStatus = 2
	DeploymentStatusError       DeploymentStatus = 4
)

// Deployment is a single deployment of a git branch.
// Deployments belong to a project.
type Deployment struct {
	ID                string           `db:"id"`
	ProjectID         string           `db:"project_id"`
	Provisioner       string           `db:"provisioner"`
	ProvisionID       string           `db:"provision_id"`
	RuntimeVersion    string           `db:"runtime_version"`
	Slots             int              `db:"slots"`
	Branch            string           `db:"branch"`
	RuntimeHost       string           `db:"runtime_host"`
	RuntimeInstanceID string           `db:"runtime_instance_id"`
	RuntimeAudience   string           `db:"runtime_audience"`
	Status            DeploymentStatus `db:"status"`
	StatusMessage     string           `db:"status_message"`
	CreatedOn         time.Time        `db:"created_on"`
	UpdatedOn         time.Time        `db:"updated_on"`
	UsedOn            time.Time        `db:"used_on"`
}

// InsertDeploymentOptions defines options for inserting a new Deployment.
type InsertDeploymentOptions struct {
	ProjectID         string
	Provisioner       string `validate:"required"`
	ProvisionID       string
	RuntimeVersion    string
	Slots             int
	Branch            string `validate:"required"`
	RuntimeHost       string `validate:"required"`
	RuntimeInstanceID string `validate:"required"`
	RuntimeAudience   string
	Status            DeploymentStatus
	StatusMessage     string
}

// RuntimeSlotsUsed is the result of a ResolveRuntimeSlotsUsed query.
type RuntimeSlotsUsed struct {
	RuntimeHost string `db:"runtime_host"`
	SlotsUsed   int    `db:"slots_used"`
}

// User is a person registered in Rill.
// Users may belong to multiple organizations and projects.
type User struct {
	ID                  string
	Email               string
	DisplayName         string    `db:"display_name"`
	PhotoURL            string    `db:"photo_url"`
	GithubUsername      string    `db:"github_username"`
	GithubRefreshToken  string    `db:"github_refresh_token"`
	CreatedOn           time.Time `db:"created_on"`
	UpdatedOn           time.Time `db:"updated_on"`
	ActiveOn            time.Time `db:"active_on"`
	QuotaSingleuserOrgs int       `db:"quota_singleuser_orgs"`
	PreferenceTimeZone  string    `db:"preference_time_zone"`
	Superuser           bool      `db:"superuser"`
}

// InsertUserOptions defines options for inserting a new user
type InsertUserOptions struct {
	Email               string `validate:"email"`
	DisplayName         string
	PhotoURL            string
	QuotaSingleuserOrgs int
	Superuser           bool
}

// UpdateUserOptions defines options for updating an existing user
type UpdateUserOptions struct {
	DisplayName         string
	PhotoURL            string
	GithubUsername      string
	GithubRefreshToken  string
	QuotaSingleuserOrgs int
	PreferenceTimeZone  string
}

// Service represents a service account.
// Service accounts may belong to single organization
type Service struct {
	ID        string
	OrgID     string    `db:"org_id"`
	Name      string    `validate:"slug"`
	CreatedOn time.Time `db:"created_on"`
	UpdatedOn time.Time `db:"updated_on"`
	ActiveOn  time.Time `db:"active_on"`
}

// InsertServiceOptions defines options for inserting a new service
type InsertServiceOptions struct {
	OrgID string
	Name  string `validate:"slug"`
}

// UpdateServiceOptions defines options for updating an existing service
type UpdateServiceOptions struct {
	Name string `validate:"slug"`
}

// Usergroup represents a group of org members
type Usergroup struct {
	ID    string `db:"id"`
	OrgID string `db:"org_id"`
	Name  string `db:"name" validate:"slug"`
}

// InsertUsergroupOptions defines options for inserting a new usergroup
type InsertUsergroupOptions struct {
	OrgID string
	Name  string `validate:"slug"`
}

// UserAuthToken is a persistent API token for a user.
type UserAuthToken struct {
	ID                 string
	SecretHash         []byte     `db:"secret_hash"`
	UserID             string     `db:"user_id"`
	DisplayName        string     `db:"display_name"`
	AuthClientID       *string    `db:"auth_client_id"`
	RepresentingUserID *string    `db:"representing_user_id"`
	CreatedOn          time.Time  `db:"created_on"`
	ExpiresOn          *time.Time `db:"expires_on"`
	UsedOn             time.Time  `db:"used_on"`
}

// InsertUserAuthTokenOptions defines options for creating a UserAuthToken.
type InsertUserAuthTokenOptions struct {
	ID                 string
	SecretHash         []byte
	UserID             string
	DisplayName        string
	AuthClientID       *string
	RepresentingUserID *string
	ExpiresOn          *time.Time
}

// ServiceAuthToken is a persistent API token for an external (tenant managed) service.
type ServiceAuthToken struct {
	ID         string
	SecretHash []byte     `db:"secret_hash"`
	ServiceID  string     `db:"service_id"`
	CreatedOn  time.Time  `db:"created_on"`
	ExpiresOn  *time.Time `db:"expires_on"`
	UsedOn     time.Time  `db:"used_on"`
}

// InsertServiceAuthTokenOptions defines options for creating a ServiceAuthToken.
type InsertServiceAuthTokenOptions struct {
	ID         string
	SecretHash []byte
	ServiceID  string
	ExpiresOn  *time.Time
}

// DeploymentAuthToken is a persistent API token for a deployment.
type DeploymentAuthToken struct {
	ID           string
	SecretHash   []byte     `db:"secret_hash"`
	DeploymentID string     `db:"deployment_id"`
	CreatedOn    time.Time  `db:"created_on"`
	ExpiresOn    *time.Time `db:"expires_on"`
	UsedOn       time.Time  `db:"used_on"`
}

// InsertDeploymentAuthTokenOptions defines options for creating a DeploymentAuthToken.
type InsertDeploymentAuthTokenOptions struct {
	ID           string
	SecretHash   []byte
	DeploymentID string
	ExpiresOn    *time.Time
}

// AuthClient is a client that requests and consumes auth tokens.
type AuthClient struct {
	ID          string
	DisplayName string
	CreatedOn   time.Time `db:"created_on"`
	UpdatedOn   time.Time `db:"updated_on"`
}

// Hard-coded auth client IDs (created in the migrations).
const (
	AuthClientIDRillWeb      = "12345678-0000-0000-0000-000000000001"
	AuthClientIDRillCLI      = "12345678-0000-0000-0000-000000000002"
	AuthClientIDRillSupport  = "12345678-0000-0000-0000-000000000003"
	AuthClientIDRillWebLocal = "12345678-0000-0000-0000-000000000004"
)

// DeviceAuthCodeState is an enum representing the approval state of a DeviceAuthCode
type DeviceAuthCodeState int

const (
	DeviceAuthCodeStatePending  DeviceAuthCodeState = 0
	DeviceAuthCodeStateApproved DeviceAuthCodeState = 1
	DeviceAuthCodeStateRejected DeviceAuthCodeState = 2
)

// DeviceAuthCode represents a user authentication code as part of the OAuth2 Device Authorization flow.
// They're currently used for authenticating users in the CLI.
type DeviceAuthCode struct {
	ID            string              `db:"id"`
	DeviceCode    string              `db:"device_code"`
	UserCode      string              `db:"user_code"`
	Expiry        time.Time           `db:"expires_on"`
	ApprovalState DeviceAuthCodeState `db:"approval_state"`
	ClientID      string              `db:"client_id"`
	UserID        *string             `db:"user_id"`
	CreatedOn     time.Time           `db:"created_on"`
	UpdatedOn     time.Time           `db:"updated_on"`
}

// AuthorizationCode represents an authorization code used for OAuth2 PKCE auth flow.
type AuthorizationCode struct {
	ID                  string    `db:"id"`
	Code                string    `db:"code"`
	UserID              string    `db:"user_id"`
	ClientID            string    `db:"client_id"`
	RedirectURI         string    `db:"redirect_uri"`
	CodeChallenge       string    `db:"code_challenge"`
	CodeChallengeMethod string    `db:"code_challenge_method"`
	Expiration          time.Time `db:"expires_on"`
	CreatedOn           time.Time `db:"created_on"`
	UpdatedOn           time.Time `db:"updated_on"`
}

// Constants for known role names (created in migrations).
const (
	OrganizationRoleNameAdmin        = "admin"
	OrganizationRoleNameCollaborator = "collaborator"
	OrganizationRoleNameViewer       = "viewer"
	ProjectRoleNameAdmin             = "admin"
	ProjectRoleNameCollaborator      = "collaborator"
	ProjectRoleNameViewer            = "viewer"
)

// OrganizationRole represents roles for orgs.
type OrganizationRole struct {
	ID               string
	Name             string
	ReadOrg          bool `db:"read_org"`
	ManageOrg        bool `db:"manage_org"`
	ReadProjects     bool `db:"read_projects"`
	CreateProjects   bool `db:"create_projects"`
	ManageProjects   bool `db:"manage_projects"`
	ReadOrgMembers   bool `db:"read_org_members"`
	ManageOrgMembers bool `db:"manage_org_members"`
}

// ProjectRole represents roles for projects.
type ProjectRole struct {
	ID                   string
	Name                 string
	ReadProject          bool `db:"read_project"`
	ManageProject        bool `db:"manage_project"`
	ReadProd             bool `db:"read_prod"`
	ReadProdStatus       bool `db:"read_prod_status"`
	ManageProd           bool `db:"manage_prod"`
	ReadDev              bool `db:"read_dev"`
	ReadDevStatus        bool `db:"read_dev_status"`
	ManageDev            bool `db:"manage_dev"`
	ReadProjectMembers   bool `db:"read_project_members"`
	ManageProjectMembers bool `db:"manage_project_members"`
	CreateReports        bool `db:"create_reports"`
	ManageReports        bool `db:"manage_reports"`
	CreateAlerts         bool `db:"create_alerts"`
	ManageAlerts         bool `db:"manage_alerts"`
}

// Member is a convenience type used for display-friendly representation of an org or project member.
type Member struct {
	ID          string
	Email       string
	DisplayName string    `db:"display_name"`
	RoleName    string    `db:"name"`
	CreatedOn   time.Time `db:"created_on"`
	UpdatedOn   time.Time `db:"updated_on"`
}

// OrganizationInvite represents an outstanding invitation to join an org.
type OrganizationInvite struct {
	ID              string
	Email           string
	OrgID           string    `db:"org_id"`
	OrgRoleID       string    `db:"org_role_id"`
	InvitedByUserID string    `db:"invited_by_user_id"`
	CreatedOn       time.Time `db:"created_on"`
}

// ProjectInvite represents an outstanding invitation to join a project.
type ProjectInvite struct {
	ID              string
	Email           string
	ProjectID       string    `db:"project_id"`
	ProjectRoleID   string    `db:"project_role_id"`
	InvitedByUserID string    `db:"invited_by_user_id"`
	CreatedOn       time.Time `db:"created_on"`
}

// Invite is a convenience type used for display-friendly representation of an OrganizationInvite or ProjectInvite.
type Invite struct {
	Email     string
	Role      string
	InvitedBy string `db:"invited_by"`
}

type DeploymentsCount struct {
	Deployments int
	Slots       int
}

type OrganizationWhitelistedDomain struct {
	ID        string
	OrgID     string `db:"org_id"`
	OrgRoleID string `db:"org_role_id"`
	Domain    string
	CreatedOn time.Time `db:"created_on"`
	UpdatedOn time.Time `db:"updated_on"`
}

type InsertOrganizationWhitelistedDomainOptions struct {
	OrgID     string `validate:"required"`
	OrgRoleID string `validate:"required"`
	Domain    string `validate:"domain"`
}

// OrganizationWhitelistedDomainWithJoinedRoleNames convenience type used for display-friendly representation of an OrganizationWhitelistedDomain.
type OrganizationWhitelistedDomainWithJoinedRoleNames struct {
	Domain   string
	RoleName string `db:"name"`
}

type ProjectWhitelistedDomain struct {
	ID            string
	ProjectID     string `db:"project_id"`
	ProjectRoleID string `db:"project_role_id"`
	Domain        string
	CreatedOn     time.Time `db:"created_on"`
	UpdatedOn     time.Time `db:"updated_on"`
}

type InsertProjectWhitelistedDomainOptions struct {
	ProjectID     string `validate:"required"`
	ProjectRoleID string `validate:"required"`
	Domain        string `validate:"domain"`
}

type ProjectWhitelistedDomainWithJoinedRoleNames struct {
	Domain   string
	RoleName string `db:"name"`
}

const (
	DefaultQuotaProjects           = 5
	DefaultQuotaDeployments        = 10
	DefaultQuotaSlotsTotal         = 20
	DefaultQuotaSlotsPerDeployment = 5
	DefaultQuotaOutstandingInvites = 200
	DefaultQuotaSingleuserOrgs     = 3
)

type InsertOrganizationInviteOptions struct {
	Email     string `validate:"email"`
	InviterID string
	OrgID     string `validate:"required"`
	RoleID    string `validate:"required"`
}

type InsertProjectInviteOptions struct {
	Email     string `validate:"email"`
	InviterID string
	ProjectID string `validate:"required"`
	RoleID    string `validate:"required"`
}

type Bookmark struct {
	ID           string
	DisplayName  string    `db:"display_name"`
	Description  string    `db:"description"`
	Data         []byte    `db:"data"`
	ResourceKind string    `db:"resource_kind"`
	ResourceName string    `db:"resource_name"`
	ProjectID    string    `db:"project_id"`
	UserID       string    `db:"user_id"`
	Default      bool      `db:"default"`
	Shared       bool      `db:"shared"`
	CreatedOn    time.Time `db:"created_on"`
	UpdatedOn    time.Time `db:"updated_on"`
}

// InsertBookmarkOptions defines options for inserting a new bookmark
type InsertBookmarkOptions struct {
	DisplayName  string `json:"display_name"`
	Data         []byte `json:"data"`
	ResourceKind string `json:"resource_kind"`
	ResourceName string `json:"resource_name"`
	Description  string `json:"description"`
	ProjectID    string `json:"project_id"`
	UserID       string `json:"user_id"`
	Default      bool   `json:"default"`
	Shared       bool   `json:"shared"`
}

// UpdateBookmarkOptions defines options for updating an existing bookmark
type UpdateBookmarkOptions struct {
	BookmarkID  string `json:"bookmark_id"`
	DisplayName string `json:"display_name"`
	Description string `json:"description"`
	Data        []byte `json:"data"`
	Shared      bool   `json:"shared"`
}

// VirtualFile represents an ad-hoc file for a project (not managed in Git)
type VirtualFile struct {
	Path      string    `db:"path"`
	Data      []byte    `db:"data"`
	Deleted   bool      `db:"deleted"`
	UpdatedOn time.Time `db:"updated_on"`
}

// InsertVirtualFileOptions defines options for inserting a VirtualFile
type InsertVirtualFileOptions struct {
	ProjectID string
	Branch    string
	Path      string `validate:"required"`
	Data      []byte `validate:"max=8192"` // 8kb
}
