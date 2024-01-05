// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        (unknown)
// source: rill/runtime/v1/colors.proto

package runtimev1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Color struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Red   float32 `protobuf:"fixed32,1,opt,name=red,proto3" json:"red,omitempty"`
	Green float32 `protobuf:"fixed32,2,opt,name=green,proto3" json:"green,omitempty"`
	Blue  float32 `protobuf:"fixed32,3,opt,name=blue,proto3" json:"blue,omitempty"`
	Alpha float32 `protobuf:"fixed32,4,opt,name=alpha,proto3" json:"alpha,omitempty"`
}

func (x *Color) Reset() {
	*x = Color{}
	if protoimpl.UnsafeEnabled {
		mi := &file_rill_runtime_v1_colors_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Color) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Color) ProtoMessage() {}

func (x *Color) ProtoReflect() protoreflect.Message {
	mi := &file_rill_runtime_v1_colors_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Color.ProtoReflect.Descriptor instead.
func (*Color) Descriptor() ([]byte, []int) {
	return file_rill_runtime_v1_colors_proto_rawDescGZIP(), []int{0}
}

func (x *Color) GetRed() float32 {
	if x != nil {
		return x.Red
	}
	return 0
}

func (x *Color) GetGreen() float32 {
	if x != nil {
		return x.Green
	}
	return 0
}

func (x *Color) GetBlue() float32 {
	if x != nil {
		return x.Blue
	}
	return 0
}

func (x *Color) GetAlpha() float32 {
	if x != nil {
		return x.Alpha
	}
	return 0
}

var File_rill_runtime_v1_colors_proto protoreflect.FileDescriptor

var file_rill_runtime_v1_colors_proto_rawDesc = []byte{
	0x0a, 0x1c, 0x72, 0x69, 0x6c, 0x6c, 0x2f, 0x72, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x2f, 0x76,
	0x31, 0x2f, 0x63, 0x6f, 0x6c, 0x6f, 0x72, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0f,
	0x72, 0x69, 0x6c, 0x6c, 0x2e, 0x72, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x2e, 0x76, 0x31, 0x22,
	0x59, 0x0a, 0x05, 0x43, 0x6f, 0x6c, 0x6f, 0x72, 0x12, 0x10, 0x0a, 0x03, 0x72, 0x65, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x02, 0x52, 0x03, 0x72, 0x65, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x67, 0x72,
	0x65, 0x65, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28, 0x02, 0x52, 0x05, 0x67, 0x72, 0x65, 0x65, 0x6e,
	0x12, 0x12, 0x0a, 0x04, 0x62, 0x6c, 0x75, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x02, 0x52, 0x04,
	0x62, 0x6c, 0x75, 0x65, 0x12, 0x14, 0x0a, 0x05, 0x61, 0x6c, 0x70, 0x68, 0x61, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x02, 0x52, 0x05, 0x61, 0x6c, 0x70, 0x68, 0x61, 0x42, 0xbe, 0x01, 0x0a, 0x13, 0x63,
	0x6f, 0x6d, 0x2e, 0x72, 0x69, 0x6c, 0x6c, 0x2e, 0x72, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x2e,
	0x76, 0x31, 0x42, 0x0b, 0x43, 0x6f, 0x6c, 0x6f, 0x72, 0x73, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50,
	0x01, 0x5a, 0x3c, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x72, 0x69,
	0x6c, 0x6c, 0x64, 0x61, 0x74, 0x61, 0x2f, 0x72, 0x69, 0x6c, 0x6c, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x72, 0x69, 0x6c, 0x6c, 0x2f, 0x72, 0x75, 0x6e, 0x74, 0x69,
	0x6d, 0x65, 0x2f, 0x76, 0x31, 0x3b, 0x72, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x76, 0x31, 0xa2,
	0x02, 0x03, 0x52, 0x52, 0x58, 0xaa, 0x02, 0x0f, 0x52, 0x69, 0x6c, 0x6c, 0x2e, 0x52, 0x75, 0x6e,
	0x74, 0x69, 0x6d, 0x65, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x0f, 0x52, 0x69, 0x6c, 0x6c, 0x5c, 0x52,
	0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x1b, 0x52, 0x69, 0x6c, 0x6c,
	0x5c, 0x52, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d,
	0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x11, 0x52, 0x69, 0x6c, 0x6c, 0x3a, 0x3a,
	0x52, 0x75, 0x6e, 0x74, 0x69, 0x6d, 0x65, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_rill_runtime_v1_colors_proto_rawDescOnce sync.Once
	file_rill_runtime_v1_colors_proto_rawDescData = file_rill_runtime_v1_colors_proto_rawDesc
)

func file_rill_runtime_v1_colors_proto_rawDescGZIP() []byte {
	file_rill_runtime_v1_colors_proto_rawDescOnce.Do(func() {
		file_rill_runtime_v1_colors_proto_rawDescData = protoimpl.X.CompressGZIP(file_rill_runtime_v1_colors_proto_rawDescData)
	})
	return file_rill_runtime_v1_colors_proto_rawDescData
}

var file_rill_runtime_v1_colors_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_rill_runtime_v1_colors_proto_goTypes = []interface{}{
	(*Color)(nil), // 0: rill.runtime.v1.Color
}
var file_rill_runtime_v1_colors_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_rill_runtime_v1_colors_proto_init() }
func file_rill_runtime_v1_colors_proto_init() {
	if File_rill_runtime_v1_colors_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_rill_runtime_v1_colors_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Color); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_rill_runtime_v1_colors_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_rill_runtime_v1_colors_proto_goTypes,
		DependencyIndexes: file_rill_runtime_v1_colors_proto_depIdxs,
		MessageInfos:      file_rill_runtime_v1_colors_proto_msgTypes,
	}.Build()
	File_rill_runtime_v1_colors_proto = out.File
	file_rill_runtime_v1_colors_proto_rawDesc = nil
	file_rill_runtime_v1_colors_proto_goTypes = nil
	file_rill_runtime_v1_colors_proto_depIdxs = nil
}
