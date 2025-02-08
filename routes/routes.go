package routes

import (
	"shippment-asignment/controllers"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	api := router.Group("/api/shippment")
	{
		api.POST("/create", controllers.CreateShipment)   // Create a shipment
	}
}
