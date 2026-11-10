// Package migrations menyimpan file SQL golang-migrate dan mengeksposnya
// sebagai embed.FS agar bisa dijalankan tanpa CLI saat startup.
package migrations

import "embed"

//go:embed *.sql
var FS embed.FS
