// @generated by protoc-gen-es v1.9.0 with parameter "target=ts"
// @generated from file rill/admin/v1/internal.proto (package rill.admin.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from message rill.admin.v1.StringPageToken
 */
export class StringPageToken extends Message<StringPageToken> {
  /**
   * @generated from field: string val = 1;
   */
  val = "";

  constructor(data?: PartialMessage<StringPageToken>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.admin.v1.StringPageToken";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "val", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StringPageToken {
    return new StringPageToken().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StringPageToken {
    return new StringPageToken().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StringPageToken {
    return new StringPageToken().fromJsonString(jsonString, options);
  }

  static equals(a: StringPageToken | PlainMessage<StringPageToken> | undefined, b: StringPageToken | PlainMessage<StringPageToken> | undefined): boolean {
    return proto3.util.equals(StringPageToken, a, b);
  }
}

/**
 * @generated from message rill.admin.v1.StringTimestampPageToken
 */
export class StringTimestampPageToken extends Message<StringTimestampPageToken> {
  /**
   * @generated from field: string str = 1;
   */
  str = "";

  /**
   * @generated from field: google.protobuf.Timestamp ts = 2;
   */
  ts?: Timestamp;

  constructor(data?: PartialMessage<StringTimestampPageToken>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "rill.admin.v1.StringTimestampPageToken";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "str", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "ts", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StringTimestampPageToken {
    return new StringTimestampPageToken().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StringTimestampPageToken {
    return new StringTimestampPageToken().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StringTimestampPageToken {
    return new StringTimestampPageToken().fromJsonString(jsonString, options);
  }

  static equals(a: StringTimestampPageToken | PlainMessage<StringTimestampPageToken> | undefined, b: StringTimestampPageToken | PlainMessage<StringTimestampPageToken> | undefined): boolean {
    return proto3.util.equals(StringTimestampPageToken, a, b);
  }
}

