// Package seeddata menyimpan file SQL seed dan mengeksposnya sebagai embed.FS.
// File dijalankan berurutan sesuai nama oleh package internal/seed.
package seeddata

import "embed"

//go:embed *.sql
var FS embed.FS
