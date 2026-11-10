package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"kdo/backend/internal/auth"
	"kdo/backend/internal/handler"
	"kdo/backend/internal/middleware"
)

// New menyusun seluruh route aplikasi.
func New(
	pool *pgxpool.Pool,
	authHandler *handler.AuthHandler,
	pdHandler *handler.PerangkatDaerahHandler,
	jwtManager *auth.Manager,
) *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"name":    "KDO API",
			"version": "1.0.0",
			"docs":    "/swagger/index.html",
			"health":  "/health",
		})
	})

	r.GET("/health", handler.Health(pool))
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api/v1")
	api.POST("/auth/login", authHandler.Login)

	terlindungi := api.Group("")
	terlindungi.Use(middleware.Auth(jwtManager))
	terlindungi.GET("/auth/me", authHandler.Me)

	pd := terlindungi.Group("/perangkat-daerah")
	pd.GET("", pdHandler.List)
	pd.GET("/:id", pdHandler.Get)

	pdTulis := middleware.RequireRole("admin", "operator")
	pd.POST("", pdTulis, pdHandler.Create)
	pd.PUT("/:id", pdTulis, pdHandler.Update)
	pd.DELETE("/:id", pdTulis, pdHandler.Delete)

	return r
}
