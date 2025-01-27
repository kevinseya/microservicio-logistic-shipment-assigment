package config

import (
	"log"

	"gopkg.in/yaml.v3"
	"os"
)

type Config struct {
	Server struct {
		Port string `yaml:"port"`
	} `yaml:"server"`

	Database struct {
		Host     string `yaml:"host"`
		Port     int    `yaml:"port"`
		User     string `yaml:"user"`
		Password string `yaml:"password"`
		Name     string `yaml:"name"`
	} `yaml:"database"`
}

var AppConfig Config

func LoadConfig() {
	file, err := os.Open("config.yaml")
	if err != nil {
		log.Fatalf("Error al abrir el archivo de configuración: %v", err)
	}
	defer file.Close()

	decoder := yaml.NewDecoder(file)
	if err := decoder.Decode(&AppConfig); err != nil {
		log.Fatalf("Error al leer el archivo de configuración: %v", err)
	}
	log.Println("Configuración cargada exitosamente.")
}
