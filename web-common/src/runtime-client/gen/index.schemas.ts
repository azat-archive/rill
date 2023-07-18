/**
 * Generated by orval v6.13.1 🍺
 * Do not edit manually.
 * rill/runtime/v1/schema.proto
 * OpenAPI spec version: version not set
 */
export type ConnectorServiceS3ListBucketsParams = {
  pageSize?: number;
  pageToken?: string;
};

export type ConnectorServiceS3ListObjectsParams = {
  pageSize?: number;
  pageToken?: string;
  region?: string;
  prefix?: string;
  startAfter?: string;
  delimiter?: string;
};

export type RuntimeServiceReconcileBody = {
  /** Changed paths provides a way to "hint" what files have changed in the repo, enabling
reconciliation to execute faster by not scanning all code artifacts for changes. */
  changedPaths?: string[];
  /** Forced paths is used to force run reconcile on certain files.
This is mainly used by UI to reconcile paths missing in catalog and get errors if any. */
  forcedPaths?: string[];
  dry?: boolean;
  strict?: boolean;
};

export type QueryServiceQueryBatch200 = {
  result?: V1QueryBatchResponse;
  error?: RpcStatus;
};

export type QueryServiceQueryBatchBody = {
  queries?: V1QueryBatchEntry[];
};

export type QueryServiceQueryBody = {
  sql?: string;
  args?: unknown[];
  priority?: number;
  dryRun?: boolean;
  limit?: number;
};

/**
 * Request for QueryService.ColumnTopK. Returns the top K values for a given column using agg function for table table_name.
 */
export type QueryServiceColumnTopKBody = {
  columnName?: string;
  agg?: string;
  k?: number;
  priority?: number;
};

export type QueryServiceColumnTimeSeriesBody = {
  measures?: ColumnTimeSeriesRequestBasicMeasure[];
  timestampColumnName?: string;
  timeRange?: V1TimeSeriesTimeRange;
  pixels?: number;
  sampleSize?: number;
  priority?: number;
  timeZone?: string;
};

export type QueryServiceColumnTimeRangeParams = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceTableCardinalityParams = {
  priority?: number;
};

export type QueryServiceColumnTimeGrainParams = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceColumnRugHistogramParams = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceTableRowsParams = {
  limit?: number;
  priority?: number;
};

export type QueryServiceColumnRollupIntervalBody = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceColumnNumericHistogramHistogramMethod =
  (typeof QueryServiceColumnNumericHistogramHistogramMethod)[keyof typeof QueryServiceColumnNumericHistogramHistogramMethod];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QueryServiceColumnNumericHistogramHistogramMethod = {
  HISTOGRAM_METHOD_UNSPECIFIED: "HISTOGRAM_METHOD_UNSPECIFIED",
  HISTOGRAM_METHOD_FD: "HISTOGRAM_METHOD_FD",
  HISTOGRAM_METHOD_DIAGNOSTIC: "HISTOGRAM_METHOD_DIAGNOSTIC",
} as const;

export type QueryServiceColumnNumericHistogramParams = {
  columnName?: string;
  histogramMethod?: QueryServiceColumnNumericHistogramHistogramMethod;
  priority?: number;
};

export type QueryServiceColumnNullCountParams = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceMetricsViewTotalsBody = {
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  filter?: V1MetricsViewFilter;
  priority?: number;
};

export type QueryServiceMetricsViewToplistBody = {
  dimensionName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  limit?: string;
  offset?: string;
  sort?: V1MetricsViewSort[];
  filter?: V1MetricsViewFilter;
  priority?: number;
};

export type QueryServiceMetricsViewTimeSeriesBody = {
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  timeGranularity?: V1TimeGrain;
  filter?: V1MetricsViewFilter;
  timeZone?: string;
  priority?: number;
};

export type QueryServiceMetricsViewRowsBody = {
  timeStart?: string;
  timeEnd?: string;
  timeGranularity?: V1TimeGrain;
  filter?: V1MetricsViewFilter;
  sort?: V1MetricsViewSort[];
  limit?: number;
  offset?: string;
  priority?: number;
  timeZone?: string;
};

export type QueryServiceMetricsViewComparisonToplistBody = {
  dimensionName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  baseTimeRange?: V1TimeRange;
  comparisonTimeRange?: V1TimeRange;
  sort?: V1MetricsViewComparisonSort[];
  filter?: V1MetricsViewFilter;
  limit?: string;
  offset?: string;
  priority?: number;
};

export type QueryServiceExportBody = {
  limit?: string;
  format?: V1ExportFormat;
  metricsViewToplistRequest?: V1MetricsViewToplistRequest;
  metricsViewRowsRequest?: V1MetricsViewRowsRequest;
};

export type QueryServiceColumnDescriptiveStatisticsParams = {
  columnName?: string;
  priority?: number;
};

export type QueryServiceTableColumnsParams = {
  priority?: number;
};

export type QueryServiceColumnCardinalityParams = {
  columnName?: string;
  priority?: number;
};

export type RuntimeServiceUnpackExampleBody = {
  name?: string;
  force?: boolean;
};

export type RuntimeServiceUnpackEmptyBody = {
  title?: string;
  force?: boolean;
};

export type RuntimeServiceRenameFileBody = {
  fromPath?: string;
  toPath?: string;
};

export type RuntimeServicePutFileBody = {
  blob?: string;
  create?: boolean;
  /** Will cause the operation to fail if the file already exists.
It should only be set when create = true. */
  createOnly?: boolean;
};

export type RuntimeServiceListFilesParams = {
  glob?: string;
};

export type RuntimeServiceListCatalogEntriesType =
  (typeof RuntimeServiceListCatalogEntriesType)[keyof typeof RuntimeServiceListCatalogEntriesType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RuntimeServiceListCatalogEntriesType = {
  OBJECT_TYPE_UNSPECIFIED: "OBJECT_TYPE_UNSPECIFIED",
  OBJECT_TYPE_TABLE: "OBJECT_TYPE_TABLE",
  OBJECT_TYPE_SOURCE: "OBJECT_TYPE_SOURCE",
  OBJECT_TYPE_MODEL: "OBJECT_TYPE_MODEL",
  OBJECT_TYPE_METRICS_VIEW: "OBJECT_TYPE_METRICS_VIEW",
} as const;

export type RuntimeServiceListCatalogEntriesParams = {
  type?: RuntimeServiceListCatalogEntriesType;
};

/**
 * Request message for RuntimeService.EditInstance.
See message Instance for field descriptions.
 */
export type RuntimeServiceEditInstanceBody = {
  olapDriver?: string;
  olapDsn?: string;
  repoDriver?: string;
  repoDsn?: string;
  embedCatalog?: boolean;
  ingestionLimitBytes?: string;
};

export type RuntimeServiceEditInstanceVariablesBodyVariables = {
  [key: string]: string;
};

/**
 * Request message for RuntimeService.EditInstanceVariables.
 */
export type RuntimeServiceEditInstanceVariablesBody = {
  variables?: RuntimeServiceEditInstanceVariablesBodyVariables;
};

export type RuntimeServiceDeleteInstanceBody = {
  dropDb?: boolean;
};

export type RuntimeServiceListInstancesParams = {
  pageSize?: number;
  pageToken?: string;
};

export type ConnectorServiceGCSListBucketsParams = {
  pageSize?: number;
  pageToken?: string;
};

export type ConnectorServiceGCSListObjectsParams = {
  pageSize?: number;
  pageToken?: string;
  prefix?: string;
  startOffset?: string;
  endOffset?: string;
  delimiter?: string;
};

export interface V1UnpackExampleResponse {
  [key: string]: any;
}

export interface V1UnpackEmptyResponse {
  [key: string]: any;
}

export type V1TypeCode = (typeof V1TypeCode)[keyof typeof V1TypeCode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1TypeCode = {
  CODE_UNSPECIFIED: "CODE_UNSPECIFIED",
  CODE_BOOL: "CODE_BOOL",
  CODE_INT8: "CODE_INT8",
  CODE_INT16: "CODE_INT16",
  CODE_INT32: "CODE_INT32",
  CODE_INT64: "CODE_INT64",
  CODE_INT128: "CODE_INT128",
  CODE_UINT8: "CODE_UINT8",
  CODE_UINT16: "CODE_UINT16",
  CODE_UINT32: "CODE_UINT32",
  CODE_UINT64: "CODE_UINT64",
  CODE_UINT128: "CODE_UINT128",
  CODE_FLOAT32: "CODE_FLOAT32",
  CODE_FLOAT64: "CODE_FLOAT64",
  CODE_TIMESTAMP: "CODE_TIMESTAMP",
  CODE_DATE: "CODE_DATE",
  CODE_TIME: "CODE_TIME",
  CODE_STRING: "CODE_STRING",
  CODE_BYTES: "CODE_BYTES",
  CODE_ARRAY: "CODE_ARRAY",
  CODE_STRUCT: "CODE_STRUCT",
  CODE_MAP: "CODE_MAP",
  CODE_DECIMAL: "CODE_DECIMAL",
  CODE_JSON: "CODE_JSON",
  CODE_UUID: "CODE_UUID",
} as const;

export interface V1TriggerSyncResponse {
  objectsCount?: number;
  objectsAddedCount?: number;
  objectsUpdatedCount?: number;
  objectsRemovedCount?: number;
}

export interface V1TriggerRefreshResponse {
  [key: string]: any;
}

export interface V1TopK {
  entries?: TopKEntry[];
}

export type V1TimeSeriesValueRecords = { [key: string]: any };

export interface V1TimeSeriesValue {
  ts?: string;
  bin?: number;
  records?: V1TimeSeriesValueRecords;
}

export interface V1TimeSeriesTimeRange {
  start?: string;
  end?: string;
  interval?: V1TimeGrain;
}

export interface V1TimeSeriesResponse {
  results?: V1TimeSeriesValue[];
  spark?: V1TimeSeriesValue[];
  sampleSize?: number;
}

export interface V1TimeRangeSummary {
  min?: string;
  max?: string;
  interval?: TimeRangeSummaryInterval;
}

export interface V1TimeRange {
  start?: string;
  end?: string;
}

export type V1TimeGrain = (typeof V1TimeGrain)[keyof typeof V1TimeGrain];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1TimeGrain = {
  TIME_GRAIN_UNSPECIFIED: "TIME_GRAIN_UNSPECIFIED",
  TIME_GRAIN_MILLISECOND: "TIME_GRAIN_MILLISECOND",
  TIME_GRAIN_SECOND: "TIME_GRAIN_SECOND",
  TIME_GRAIN_MINUTE: "TIME_GRAIN_MINUTE",
  TIME_GRAIN_HOUR: "TIME_GRAIN_HOUR",
  TIME_GRAIN_DAY: "TIME_GRAIN_DAY",
  TIME_GRAIN_WEEK: "TIME_GRAIN_WEEK",
  TIME_GRAIN_MONTH: "TIME_GRAIN_MONTH",
  TIME_GRAIN_QUARTER: "TIME_GRAIN_QUARTER",
  TIME_GRAIN_YEAR: "TIME_GRAIN_YEAR",
} as const;

export type V1TableRowsResponseDataItem = { [key: string]: any };

export interface V1TableRowsResponse {
  data?: V1TableRowsResponseDataItem[];
}

export interface V1TableRowsRequest {
  instanceId?: string;
  tableName?: string;
  limit?: number;
  priority?: number;
}

export interface V1TableInfo {
  database?: string;
  name?: string;
}

export interface V1TableColumnsResponse {
  profileColumns?: V1ProfileColumn[];
}

export interface V1TableColumnsRequest {
  instanceId?: string;
  tableName?: string;
  priority?: number;
}

export interface V1TableCardinalityResponse {
  cardinality?: string;
}

export interface V1TableCardinalityRequest {
  instanceId?: string;
  tableName?: string;
  priority?: number;
}

export interface V1StructType {
  fields?: StructTypeField[];
}

/**
 * Table represents a table in the OLAP database. These include pre-existing tables discovered by periodically
scanning the database's information schema when the instance is created with exposed=true. Pre-existing tables
have managed = false.
 */
export interface V1Table {
  name?: string;
  schema?: V1StructType;
  /** Managed is true if the table was created through a runtime migration, false if it was discovered in by
scanning the database's information schema. */
  managed?: boolean;
}

export type V1SourceProperties = { [key: string]: any };

export interface V1Source {
  name?: string;
  connector?: string;
  properties?: V1SourceProperties;
  schema?: V1StructType;
  policy?: SourceExtractPolicy;
  timeoutSeconds?: number;
}

export interface V1S3Object {
  name?: string;
  modifiedOn?: string;
  size?: string;
  isDir?: boolean;
}

export interface V1S3ListObjectsResponse {
  nextPageToken?: string;
  objects?: V1S3Object[];
}

export interface V1S3ListBucketsResponse {
  nextPageToken?: string;
  buckets?: string[];
}

export interface V1S3GetCredentialsInfoResponse {
  exist?: boolean;
  provider?: string;
}

export interface V1S3GetBucketMetadataResponse {
  region?: string;
}

export interface V1RenameFileResponse {
  [key: string]: any;
}

export interface V1RenameFileAndReconcileRequest {
  instanceId?: string;
  fromPath?: string;
  toPath?: string;
  /** If true, will save the file and validate it and related file artifacts, but not actually execute any migrations. */
  dry?: boolean;
  strict?: boolean;
}

export interface V1RefreshAndReconcileResponse {
  /** Errors encountered during reconciliation. If strict = false, any path in
affected_paths without an error can be assumed to have been reconciled succesfully. */
  errors?: V1ReconcileError[];
  /** affected_paths lists all the file artifact paths that were considered while
executing the reconciliation. If changed_paths was empty, this will include all
code artifacts in the repo. */
  affectedPaths?: string[];
}

export interface V1RefreshAndReconcileRequest {
  instanceId?: string;
  path?: string;
  /** If true, will save the file and validate it and related file artifacts, but not actually execute any migrations. */
  dry?: boolean;
  strict?: boolean;
}

/**
 * - CODE_UNSPECIFIED: Unspecified error
 - CODE_SYNTAX: Code artifact failed to parse
 - CODE_VALIDATION: Code artifact has internal validation errors
 - CODE_DEPENDENCY: Code artifact is valid, but has invalid dependencies
 - CODE_OLAP: Error returned from the OLAP database
 - CODE_SOURCE: Error encountered during source inspection or ingestion
 - CODE_SOURCE_PERMISSION_DENIED: Error returned when unauthorised to access remote sources
 */
export type V1ReconcileErrorCode =
  (typeof V1ReconcileErrorCode)[keyof typeof V1ReconcileErrorCode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1ReconcileErrorCode = {
  CODE_UNSPECIFIED: "CODE_UNSPECIFIED",
  CODE_SYNTAX: "CODE_SYNTAX",
  CODE_VALIDATION: "CODE_VALIDATION",
  CODE_DEPENDENCY: "CODE_DEPENDENCY",
  CODE_OLAP: "CODE_OLAP",
  CODE_SOURCE: "CODE_SOURCE",
  CODE_SOURCE_PERMISSION_DENIED: "CODE_SOURCE_PERMISSION_DENIED",
} as const;

export interface V1ReconcileErrorCharLocation {
  line?: number;
  column?: number;
}

/**
 * ReconcileError represents an error encountered while running Reconcile.
 */
export interface V1ReconcileError {
  code?: V1ReconcileErrorCode;
  message?: string;
  filePath?: string;
  /** Property path of the error in the code artifact (if any).
It's represented as a JS-style property path, e.g. "key0.key1[index2].key3".
It only applies to structured code artifacts (i.e. YAML).
Only applicable if file_path is set. */
  propertyPath?: string[];
  startLocation?: V1ReconcileErrorCharLocation;
  endLocation?: V1ReconcileErrorCharLocation;
}

export interface V1RenameFileAndReconcileResponse {
  /** Errors encountered during reconciliation. If strict = false, any path in
affected_paths without an error can be assumed to have been reconciled succesfully. */
  errors?: V1ReconcileError[];
  /** affected_paths lists all the file artifact paths that were considered while
executing the reconciliation. If changed_paths was empty, this will include all
code artifacts in the repo. */
  affectedPaths?: string[];
}

export interface V1ReconcileResponse {
  /** Errors encountered during reconciliation. If strict = false, any path in
affected_paths without an error can be assumed to have been reconciled succesfully. */
  errors?: V1ReconcileError[];
  /** affected_paths lists all the file artifact paths that were considered while
executing the reconciliation. If changed_paths was empty, this will include all
code artifacts in the repo. */
  affectedPaths?: string[];
}

export type V1QueryResponseDataItem = { [key: string]: any };

export interface V1QueryResponse {
  meta?: V1StructType;
  data?: V1QueryResponseDataItem[];
}

export interface V1QueryBatchResponse {
  key?: number;
  error?: string;
  metricsViewToplistResponse?: V1MetricsViewToplistResponse;
  metricsViewComparisonToplistResponse?: V1MetricsViewComparisonToplistResponse;
  metricsViewTimeSeriesResponse?: V1MetricsViewTimeSeriesResponse;
  metricsViewTotalsResponse?: V1MetricsViewTotalsResponse;
  metricsViewRowsResponse?: V1MetricsViewRowsResponse;
  columnRollupIntervalResponse?: V1ColumnRollupIntervalResponse;
  columnTopKResponse?: V1ColumnTopKResponse;
  columnNullCountResponse?: V1ColumnNullCountResponse;
  columnDescriptiveStatisticsResponse?: V1ColumnDescriptiveStatisticsResponse;
  columnTimeGrainResponse?: V1ColumnTimeGrainResponse;
  columnNumericHistogramResponse?: V1ColumnNumericHistogramResponse;
  columnRugHistogramResponse?: V1ColumnRugHistogramResponse;
  columnTimeRangeResponse?: V1ColumnTimeRangeResponse;
  columnCardinalityResponse?: V1ColumnCardinalityResponse;
  columnTimeSeriesResponse?: V1ColumnTimeSeriesResponse;
  tableCardinalityResponse?: V1TableCardinalityResponse;
  tableColumnsResponse?: V1TableColumnsResponse;
  tableRowsResponse?: V1TableRowsResponse;
}

export interface V1QueryBatchEntry {
  /** Since response could out of order `key` is used to co-relate a specific response to request. */
  key?: number;
  metricsViewToplistRequest?: V1MetricsViewToplistRequest;
  metricsViewComparisonToplistRequest?: V1MetricsViewComparisonToplistRequest;
  metricsViewTimeSeriesRequest?: V1MetricsViewTimeSeriesRequest;
  metricsViewTotalsRequest?: V1MetricsViewTotalsRequest;
  metricsViewRowsRequest?: V1MetricsViewRowsRequest;
  columnRollupIntervalRequest?: V1ColumnRollupIntervalRequest;
  columnTopKRequest?: V1ColumnTopKRequest;
  columnNullCountRequest?: V1ColumnNullCountRequest;
  columnDescriptiveStatisticsRequest?: V1ColumnDescriptiveStatisticsRequest;
  columnTimeGrainRequest?: V1ColumnTimeGrainRequest;
  columnNumericHistogramRequest?: V1ColumnNumericHistogramRequest;
  columnRugHistogramRequest?: V1ColumnRugHistogramRequest;
  columnTimeRangeRequest?: V1ColumnTimeRangeRequest;
  columnCardinalityRequest?: V1ColumnCardinalityRequest;
  columnTimeSeriesRequest?: V1ColumnTimeSeriesRequest;
  tableCardinalityRequest?: V1TableCardinalityRequest;
  tableColumnsRequest?: V1TableColumnsRequest;
  tableRowsRequest?: V1TableRowsRequest;
}

export interface V1PutFileResponse {
  filePath?: string;
}

export interface V1PutFileAndReconcileResponse {
  /** Errors encountered during reconciliation. If strict = false, any path in
affected_paths without an error can be assumed to have been reconciled succesfully. */
  errors?: V1ReconcileError[];
  /** affected_paths lists all the file artifact paths that were considered while
executing the reconciliation. If changed_paths was empty, this will include all
code artifacts in the repo. */
  affectedPaths?: string[];
}

export interface V1PutFileAndReconcileRequest {
  instanceId?: string;
  path?: string;
  blob?: string;
  create?: boolean;
  /** create_only will cause the operation to fail if a file already exists at path.
It should only be set when create = true. */
  createOnly?: boolean;
  /** If true, will save the file and validate it and related file artifacts, but not actually execute any migrations. */
  dry?: boolean;
  strict?: boolean;
}

export interface V1ProfileColumn {
  name?: string;
  type?: string;
  largestStringLength?: number;
}

export interface V1PingResponse {
  version?: string;
  time?: string;
}

export type V1ObjectType = (typeof V1ObjectType)[keyof typeof V1ObjectType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1ObjectType = {
  OBJECT_TYPE_UNSPECIFIED: "OBJECT_TYPE_UNSPECIFIED",
  OBJECT_TYPE_TABLE: "OBJECT_TYPE_TABLE",
  OBJECT_TYPE_SOURCE: "OBJECT_TYPE_SOURCE",
  OBJECT_TYPE_MODEL: "OBJECT_TYPE_MODEL",
  OBJECT_TYPE_METRICS_VIEW: "OBJECT_TYPE_METRICS_VIEW",
} as const;

export interface V1NumericStatistics {
  min?: number;
  max?: number;
  mean?: number;
  q25?: number;
  q50?: number;
  q75?: number;
  sd?: number;
}

export interface V1NumericOutliers {
  outliers?: NumericOutliersOutlier[];
}

export interface V1NumericHistogramBins {
  bins?: NumericHistogramBinsBin[];
}

/**
 * Response for QueryService.ColumnNumericHistogram, QueryService.ColumnDescriptiveStatistics and QueryService.ColumnCardinality.
Message will have either numericHistogramBins, numericStatistics or numericOutliers set.
 */
export interface V1NumericSummary {
  numericHistogramBins?: V1NumericHistogramBins;
  numericStatistics?: V1NumericStatistics;
  numericOutliers?: V1NumericOutliers;
}

export interface V1MotherduckListTablesResponse {
  tables?: V1TableInfo[];
}

export interface V1Model {
  name?: string;
  sql?: string;
  dialect?: ModelDialect;
  schema?: V1StructType;
  materialize?: boolean;
}

export type V1MetricsViewTotalsResponseData = { [key: string]: any };

export interface V1MetricsViewTotalsResponse {
  meta?: V1MetricsViewColumn[];
  data?: V1MetricsViewTotalsResponseData;
}

export interface V1MetricsViewTotalsRequest {
  instanceId?: string;
  metricsViewName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  filter?: V1MetricsViewFilter;
  priority?: number;
}

export type V1MetricsViewToplistResponseDataItem = { [key: string]: any };

export interface V1MetricsViewToplistResponse {
  meta?: V1MetricsViewColumn[];
  data?: V1MetricsViewToplistResponseDataItem[];
}

export interface V1MetricsViewTimeSeriesResponse {
  meta?: V1MetricsViewColumn[];
  data?: V1TimeSeriesValue[];
}

export interface V1MetricsViewSort {
  name?: string;
  ascending?: boolean;
}

export interface V1MetricsViewToplistRequest {
  instanceId?: string;
  metricsViewName?: string;
  dimensionName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  limit?: string;
  offset?: string;
  sort?: V1MetricsViewSort[];
  filter?: V1MetricsViewFilter;
  priority?: number;
}

export type V1MetricsViewRowsResponseDataItem = { [key: string]: any };

export interface V1MetricsViewFilter {
  include?: MetricsViewFilterCond[];
  exclude?: MetricsViewFilterCond[];
}

export interface V1MetricsViewTimeSeriesRequest {
  instanceId?: string;
  metricsViewName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  timeStart?: string;
  timeEnd?: string;
  timeGranularity?: V1TimeGrain;
  filter?: V1MetricsViewFilter;
  timeZone?: string;
  priority?: number;
}

export interface V1MetricsViewRowsRequest {
  instanceId?: string;
  metricsViewName?: string;
  timeStart?: string;
  timeEnd?: string;
  timeGranularity?: V1TimeGrain;
  filter?: V1MetricsViewFilter;
  sort?: V1MetricsViewSort[];
  limit?: number;
  offset?: string;
  priority?: number;
  timeZone?: string;
}

export interface V1MetricsViewComparisonValue {
  measureName?: string;
  baseValue?: unknown;
  comparisonValue?: unknown;
  deltaAbs?: unknown;
  deltaRel?: unknown;
}

export interface V1MetricsViewComparisonToplistResponse {
  rows?: V1MetricsViewComparisonRow[];
}

export type V1MetricsViewComparisonSortType =
  (typeof V1MetricsViewComparisonSortType)[keyof typeof V1MetricsViewComparisonSortType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1MetricsViewComparisonSortType = {
  METRICS_VIEW_COMPARISON_SORT_TYPE_UNSPECIFIED:
    "METRICS_VIEW_COMPARISON_SORT_TYPE_UNSPECIFIED",
  METRICS_VIEW_COMPARISON_SORT_TYPE_BASE_VALUE:
    "METRICS_VIEW_COMPARISON_SORT_TYPE_BASE_VALUE",
  METRICS_VIEW_COMPARISON_SORT_TYPE_COMPARISON_VALUE:
    "METRICS_VIEW_COMPARISON_SORT_TYPE_COMPARISON_VALUE",
  METRICS_VIEW_COMPARISON_SORT_TYPE_ABS_DELTA:
    "METRICS_VIEW_COMPARISON_SORT_TYPE_ABS_DELTA",
  METRICS_VIEW_COMPARISON_SORT_TYPE_REL_DELTA:
    "METRICS_VIEW_COMPARISON_SORT_TYPE_REL_DELTA",
} as const;

export interface V1MetricsViewComparisonSort {
  measureName?: string;
  ascending?: boolean;
  type?: V1MetricsViewComparisonSortType;
}

export interface V1MetricsViewComparisonRow {
  dimensionValue?: unknown;
  measureValues?: V1MetricsViewComparisonValue[];
}

export interface V1MetricsViewColumn {
  name?: string;
  type?: string;
  nullable?: boolean;
}

export interface V1MetricsViewRowsResponse {
  meta?: V1MetricsViewColumn[];
  data?: V1MetricsViewRowsResponseDataItem[];
}

export interface V1MetricsView {
  name?: string;
  model?: string;
  timeDimension?: string;
  dimensions?: MetricsViewDimension[];
  measures?: MetricsViewMeasure[];
  label?: string;
  description?: string;
  smallestTimeGrain?: V1TimeGrain;
  /** Default time range for the dashboard. It should be a valid ISO 8601 duration string. */
  defaultTimeRange?: string;
  /** Available time zones list preferred time zones using IANA location identifiers. */
  availableTimeZones?: string[];
}

export interface V1MapType {
  keyType?: Runtimev1Type;
  valueType?: Runtimev1Type;
}

export interface V1ListInstancesResponse {
  instances?: V1Instance[];
  nextPageToken?: string;
}

export interface V1ListFilesResponse {
  paths?: string[];
}

export interface V1ListExamplesResponse {
  examples?: V1Example[];
}

export interface V1ListConnectorsResponse {
  connectors?: V1Connector[];
}

export interface V1ListCatalogEntriesResponse {
  entries?: V1CatalogEntry[];
}

export type V1InstanceProjectVariables = { [key: string]: string };

export type V1InstanceVariables = { [key: string]: string };

/**
 * Instance represents a single data project, meaning one set of code artifacts,
one connection to an OLAP datastore (DuckDB, Druid), and one catalog of related
metadata (such as reconciliation state). Instances are the unit of isolation within
the runtime. They enable one runtime deployment to serve not only multiple data
projects, but also multiple tenants. On local, the runtime will usually have
just a single instance.
 */
export interface V1Instance {
  instanceId?: string;
  olapDriver?: string;
  olapDsn?: string;
  /** Driver for reading/editing code artifacts (options: file, metastore, github).
This enables virtualizing a file system in a cloud setting. */
  repoDriver?: string;
  repoDsn?: string;
  /** If true, the runtime will store the instance's catalog in its OLAP store instead
of in the runtime's metadata store. Currently only supported for the duckdb driver. */
  embedCatalog?: boolean;
  variables?: V1InstanceVariables;
  projectVariables?: V1InstanceProjectVariables;
  ingestionLimitBytes?: string;
}

export interface V1InlineMeasure {
  name?: string;
  expression?: string;
}

export interface V1MetricsViewComparisonToplistRequest {
  instanceId?: string;
  metricsViewName?: string;
  dimensionName?: string;
  measureNames?: string[];
  inlineMeasures?: V1InlineMeasure[];
  baseTimeRange?: V1TimeRange;
  comparisonTimeRange?: V1TimeRange;
  sort?: V1MetricsViewComparisonSort[];
  filter?: V1MetricsViewFilter;
  limit?: string;
  offset?: string;
  priority?: number;
}

export type V1HistogramMethod =
  (typeof V1HistogramMethod)[keyof typeof V1HistogramMethod];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1HistogramMethod = {
  HISTOGRAM_METHOD_UNSPECIFIED: "HISTOGRAM_METHOD_UNSPECIFIED",
  HISTOGRAM_METHOD_FD: "HISTOGRAM_METHOD_FD",
  HISTOGRAM_METHOD_DIAGNOSTIC: "HISTOGRAM_METHOD_DIAGNOSTIC",
} as const;

export interface V1GetInstanceResponse {
  instance?: V1Instance;
}

export interface V1GetFileResponse {
  blob?: string;
  updatedOn?: string;
}

export interface V1GetCatalogEntryResponse {
  entry?: V1CatalogEntry;
}

export interface V1GCSObject {
  name?: string;
  modifiedOn?: string;
  size?: string;
  isDir?: boolean;
}

export interface V1GCSListObjectsResponse {
  nextPageToken?: string;
  objects?: V1GCSObject[];
}

export interface V1GCSListBucketsResponse {
  nextPageToken?: string;
  buckets?: string[];
}

export interface V1GCSGetCredentialsInfoResponse {
  exist?: boolean;
  projectId?: string;
}

export interface V1ExportResponse {
  downloadUrlPath?: string;
}

export type V1ExportFormat =
  (typeof V1ExportFormat)[keyof typeof V1ExportFormat];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const V1ExportFormat = {
  EXPORT_FORMAT_UNSPECIFIED: "EXPORT_FORMAT_UNSPECIFIED",
  EXPORT_FORMAT_CSV: "EXPORT_FORMAT_CSV",
  EXPORT_FORMAT_XLSX: "EXPORT_FORMAT_XLSX",
} as const;

/**
 * Example contains metadata about an example project that is available for unpacking.
 */
export interface V1Example {
  name?: string;
  title?: string;
  description?: string;
}

export interface V1EditInstanceVariablesResponse {
  instance?: V1Instance;
}

export interface V1EditInstanceResponse {
  instance?: V1Instance;
}

export interface V1DeleteInstanceResponse {
  [key: string]: any;
}

export interface V1DeleteFileResponse {
  [key: string]: any;
}

export interface V1DeleteFileAndReconcileResponse {
  /** Errors encountered during reconciliation. If strict = false, any path in
affected_paths without an error can be assumed to have been reconciled succesfully. */
  errors?: V1ReconcileError[];
  /** affected_paths lists all the file artifact paths that were considered while
executing the reconciliation. If changed_paths was empty, this will include all
code artifacts in the repo. */
  affectedPaths?: string[];
}

export interface V1DeleteFileAndReconcileRequest {
  instanceId?: string;
  path?: string;
  /** If true, will save the file and validate it and related file artifacts, but not actually execute any migrations. */
  dry?: boolean;
  strict?: boolean;
}

export interface V1CreateInstanceResponse {
  instance?: V1Instance;
}

export type V1CreateInstanceRequestVariables = { [key: string]: string };

/**
 * Request message for RuntimeService.CreateInstance.
See message Instance for field descriptions.
 */
export interface V1CreateInstanceRequest {
  instanceId?: string;
  olapDriver?: string;
  olapDsn?: string;
  repoDriver?: string;
  repoDsn?: string;
  embedCatalog?: boolean;
  variables?: V1CreateInstanceRequestVariables;
  ingestionLimitBytes?: string;
}

/**
 * Connector represents a connector available in the runtime.
It should not be confused with a source.
 */
export interface V1Connector {
  name?: string;
  displayName?: string;
  description?: string;
  properties?: ConnectorProperty[];
}

export interface V1ColumnTopKResponse {
  categoricalSummary?: V1CategoricalSummary;
}

/**
 * Request for QueryService.ColumnTopK. Returns the top K values for a given column using agg function for table table_name.
 */
export interface V1ColumnTopKRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  agg?: string;
  k?: number;
  priority?: number;
}

export interface V1ColumnTimeSeriesResponse {
  rollup?: V1TimeSeriesResponse;
}

export interface V1ColumnTimeSeriesRequest {
  instanceId?: string;
  tableName?: string;
  measures?: ColumnTimeSeriesRequestBasicMeasure[];
  timestampColumnName?: string;
  timeRange?: V1TimeSeriesTimeRange;
  pixels?: number;
  sampleSize?: number;
  priority?: number;
  timeZone?: string;
}

export interface V1ColumnTimeRangeResponse {
  timeRangeSummary?: V1TimeRangeSummary;
}

export interface V1ColumnTimeRangeRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnTimeGrainResponse {
  timeGrain?: V1TimeGrain;
}

export interface V1ColumnTimeGrainRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnRugHistogramResponse {
  numericSummary?: V1NumericSummary;
}

export interface V1ColumnRugHistogramRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnRollupIntervalResponse {
  start?: string;
  end?: string;
  interval?: V1TimeGrain;
}

export interface V1ColumnRollupIntervalRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnNumericHistogramResponse {
  numericSummary?: V1NumericSummary;
}

export interface V1ColumnNumericHistogramRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  histogramMethod?: V1HistogramMethod;
  priority?: number;
}

export interface V1ColumnNullCountResponse {
  count?: number;
}

export interface V1ColumnNullCountRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnDescriptiveStatisticsResponse {
  numericSummary?: V1NumericSummary;
}

export interface V1ColumnDescriptiveStatisticsRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

export interface V1ColumnCardinalityResponse {
  categoricalSummary?: V1CategoricalSummary;
}

export interface V1ColumnCardinalityRequest {
  instanceId?: string;
  tableName?: string;
  columnName?: string;
  priority?: number;
}

/**
 * Response for QueryService.ColumnTopK and QueryService.ColumnCardinality. Message will have either topK or cardinality set.
 */
export interface V1CategoricalSummary {
  topK?: V1TopK;
  cardinality?: number;
}

export interface V1CatalogEntry {
  name?: string;
  table?: V1Table;
  source?: V1Source;
  model?: V1Model;
  metricsView?: V1MetricsView;
  path?: string;
  /** Marks whether this entry is embedded or not. If yes then this will not have a corresponding artifact. */
  embedded?: boolean;
  parents?: string[];
  children?: string[];
  createdOn?: string;
  updatedOn?: string;
  refreshedOn?: string;
}

export interface Runtimev1Type {
  code?: V1TypeCode;
  nullable?: boolean;
  arrayElementType?: Runtimev1Type;
  structType?: V1StructType;
  mapType?: V1MapType;
}

export interface RpcStatus {
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
`Value` type union.

 The JSON representation for `NullValue` is JSON `null`.

 - NULL_VALUE: Null value.
 */
export type ProtobufNullValue =
  (typeof ProtobufNullValue)[keyof typeof ProtobufNullValue];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProtobufNullValue = {
  NULL_VALUE: "NULL_VALUE",
} as const;

export interface ProtobufAny {
  "@type"?: string;
  [key: string]: unknown;
}

export interface TopKEntry {
  value?: unknown;
  count?: number;
}

export interface TimeRangeSummaryInterval {
  months?: number;
  days?: number;
  micros?: string;
}

export interface StructTypeField {
  name?: string;
  type?: Runtimev1Type;
}

export type SourceExtractPolicyStrategy =
  (typeof SourceExtractPolicyStrategy)[keyof typeof SourceExtractPolicyStrategy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SourceExtractPolicyStrategy = {
  STRATEGY_UNSPECIFIED: "STRATEGY_UNSPECIFIED",
  STRATEGY_HEAD: "STRATEGY_HEAD",
  STRATEGY_TAIL: "STRATEGY_TAIL",
} as const;

export interface SourceExtractPolicy {
  rowsStrategy?: SourceExtractPolicyStrategy;
  rowsLimitBytes?: string;
  filesStrategy?: SourceExtractPolicyStrategy;
  filesLimit?: string;
}

export interface NumericOutliersOutlier {
  bucket?: number;
  low?: number;
  high?: number;
  present?: boolean;
  count?: number;
}

export interface NumericHistogramBinsBin {
  bucket?: number;
  low?: number;
  midpoint?: number;
  high?: number;
  count?: number;
}

export type ModelDialect = (typeof ModelDialect)[keyof typeof ModelDialect];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ModelDialect = {
  DIALECT_UNSPECIFIED: "DIALECT_UNSPECIFIED",
  DIALECT_DUCKDB: "DIALECT_DUCKDB",
} as const;

export interface MetricsViewMeasure {
  name?: string;
  label?: string;
  expression?: string;
  description?: string;
  format?: string;
  validPercentOfTotal?: boolean;
}

export interface MetricsViewFilterCond {
  name?: string;
  in?: unknown[];
  like?: string[];
}

export interface MetricsViewDimension {
  name?: string;
  label?: string;
  description?: string;
  column?: string;
}

export type ConnectorPropertyType =
  (typeof ConnectorPropertyType)[keyof typeof ConnectorPropertyType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ConnectorPropertyType = {
  TYPE_UNSPECIFIED: "TYPE_UNSPECIFIED",
  TYPE_STRING: "TYPE_STRING",
  TYPE_NUMBER: "TYPE_NUMBER",
  TYPE_BOOLEAN: "TYPE_BOOLEAN",
  TYPE_INFORMATIONAL: "TYPE_INFORMATIONAL",
} as const;

export interface ConnectorProperty {
  key?: string;
  displayName?: string;
  description?: string;
  placeholder?: string;
  type?: ConnectorPropertyType;
  nullable?: boolean;
  hint?: string;
  href?: string;
}

export interface ColumnTimeSeriesRequestBasicMeasure {
  id?: string;
  expression?: string;
  sqlName?: string;
}
