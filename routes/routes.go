package routes

import (
	"shippment-asignment/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	// Rutas de la API
	api := router.Group("/api/shippment")
	{
		api.POST("/create", controllers.CreateShipment)   // Crear un envío
	}
}
