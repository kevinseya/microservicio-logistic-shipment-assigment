package controllers

import (
	"shippment-asignment/models"
	"net/http"
	"shippment-asignment/database" 
	"github.com/gin-gonic/gin"
)

// New Shippment
func CreateShipment(c *gin.Context) {
	var shippment models.Shipment

	if err := c.ShouldBindJSON(&shippment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := database.DB.Create(&shippment); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Shipment created successfully",
		"shippment-asignment": shippment, 
	})
}
