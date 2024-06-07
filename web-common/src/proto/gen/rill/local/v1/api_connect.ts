// @generated by protoc-gen-connect-es v0.13.0 with parameter "target=ts"
// @generated from file rill/local/v1/api.proto (package rill.local.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { DeployRequest, DeployResponse, DeployValidationRequest, DeployValidationResponse, GetMetadataRequest, GetMetadataResponse, GetVersionRequest, GetVersionResponse, PingRequest, PingResponse, PushToGithubRequest, PushToGithubResponse } from "./api_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service rill.local.v1.LocalService
 */
export const LocalService = {
  typeName: "rill.local.v1.LocalService",
  methods: {
    /**
     * Ping returns the current time.
     *
     * @generated from rpc rill.local.v1.LocalService.Ping
     */
    ping: {
      name: "Ping",
      I: PingRequest,
      O: PingResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetMetadata returns information about the local Rill instance.
     *
     * @generated from rpc rill.local.v1.LocalService.GetMetadata
     */
    getMetadata: {
      name: "GetMetadata",
      I: GetMetadataRequest,
      O: GetMetadataResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetVersion returns details about the current and latest available Rill versions.
     *
     * @generated from rpc rill.local.v1.LocalService.GetVersion
     */
    getVersion: {
      name: "GetVersion",
      I: GetVersionRequest,
      O: GetVersionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * DeployValidation validates a deploy request.
     *
     * @generated from rpc rill.local.v1.LocalService.DeployValidation
     */
    deployValidation: {
      name: "DeployValidation",
      I: DeployValidationRequest,
      O: DeployValidationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * PushToGithub create a Git repo from local project and pushed to users git account.
     *
     * @generated from rpc rill.local.v1.LocalService.PushToGithub
     */
    pushToGithub: {
      name: "PushToGithub",
      I: PushToGithubRequest,
      O: PushToGithubResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deploy deploys the local project to the Rill cloud.
     *
     * @generated from rpc rill.local.v1.LocalService.Deploy
     */
    deploy: {
      name: "Deploy",
      I: DeployRequest,
      O: DeployResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

