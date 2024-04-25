// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file rill/runtime/v1/time_grain.proto (package rill.runtime.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum rill.runtime.v1.TimeGrain
 */
export enum TimeGrain {
  /**
   * @generated from enum value: TIME_GRAIN_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TIME_GRAIN_MILLISECOND = 1;
   */
  MILLISECOND = 1,

  /**
   * @generated from enum value: TIME_GRAIN_SECOND = 2;
   */
  SECOND = 2,

  /**
   * @generated from enum value: TIME_GRAIN_MINUTE = 3;
   */
  MINUTE = 3,

  /**
   * @generated from enum value: TIME_GRAIN_HOUR = 4;
   */
  HOUR = 4,

  /**
   * @generated from enum value: TIME_GRAIN_DAY = 5;
   */
  DAY = 5,

  /**
   * @generated from enum value: TIME_GRAIN_WEEK = 6;
   */
  WEEK = 6,

  /**
   * @generated from enum value: TIME_GRAIN_MONTH = 7;
   */
  MONTH = 7,

  /**
   * @generated from enum value: TIME_GRAIN_QUARTER = 8;
   */
  QUARTER = 8,

  /**
   * @generated from enum value: TIME_GRAIN_YEAR = 9;
   */
  YEAR = 9,
}
// Retrieve enum metadata with: proto3.getEnumType(TimeGrain)
proto3.util.setEnumType(TimeGrain, "rill.runtime.v1.TimeGrain", [
  { no: 0, name: "TIME_GRAIN_UNSPECIFIED" },
  { no: 1, name: "TIME_GRAIN_MILLISECOND" },
  { no: 2, name: "TIME_GRAIN_SECOND" },
  { no: 3, name: "TIME_GRAIN_MINUTE" },
  { no: 4, name: "TIME_GRAIN_HOUR" },
  { no: 5, name: "TIME_GRAIN_DAY" },
  { no: 6, name: "TIME_GRAIN_WEEK" },
  { no: 7, name: "TIME_GRAIN_MONTH" },
  { no: 8, name: "TIME_GRAIN_QUARTER" },
  { no: 9, name: "TIME_GRAIN_YEAR" },
]);

