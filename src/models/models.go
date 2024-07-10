package models

import (
	"github.com/kittyofheaven/niuniu-backend/src/helpers"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type AdminAccounts struct {
	gorm.Model
	ID 				uint 		`gorm:"column:id;primaryKey;autoIncrement;not null"`
	Username 	string 	`gorm:"column:username;type:varchar(255);not null"`
	Password 	string 	`gorm:"column:password;type:varchar(255);not null"`
}

type Provinsi struct {
	gorm.Model
	ID        uint           	`gorm:"column:id;primaryKey;autoIncrement;not null"`
	Name      string         	`gorm:"column:name;type:varchar(255);not null"`
	Location  []byte 					`gorm:"column:location;not null;index:idx_location,spatial"`
	CreatedAt datatypes.Date 	`gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt datatypes.Date 	`gorm:"column:updatedAt;autoUpdateTime"`
}

// Set the Location field using a Point struct
func (p *Provinsi) SetLocation(point helpers.Point) {
p.Location = []byte(point.ToWKT())
}

// Get the Location field as a Point struct
func (p *Provinsi) GetLocation() (helpers.Point, error) {
return helpers.WKTToPoint(string(p.Location))
}

type Kota struct {
	gorm.Model
	ID        uint      			`gorm:"column:id;primaryKey;autoIncrement;not null"`
	Name      string    			`gorm:"column:name;type:varchar(255);not null"`
	Location  []byte    			`gorm:"column:location;type:geometry;not null;index:idx_location,spatial"`
	ProvinsiID uint     			`gorm:"column:provinsi_id;not null"`
	Provinsi  Provinsi  			`gorm:"foreignKey:ProvinsiID;references:ID"`
	CreatedAt datatypes.Date 	`gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt datatypes.Date 	`gorm:"column:updatedAt;autoUpdateTime"`
}

// Set the Location field using a Point struct
func (k *Kota) SetLocation(point helpers.Point) {
	k.Location = []byte(point.ToWKT())
}

// Get the Location field as a Point struct
func (k *Kota) GetLocation() (helpers.Point, error){
	return helpers.WKTToPoint(string(k.Location))
}

type AmbulanceProvider struct {
	gorm.Model
	ID                   uint             `gorm:"column:id;primaryKey;autoIncrement;not null"`
	Email                string           `gorm:"column:email;type:varchar(255);not null;unique"`
	PhoneNumber          string           `gorm:"column:phone_number;type:varchar(255);not null"`
	AmbulanceProviderName string         	`gorm:"column:ambulance_provider_name;type:varchar(255);not null"`
	Password             string           `gorm:"column:password;type:varchar(255);not null"`
	Location             []byte           `gorm:"column:location;type:geometry;not null;index:idx_location,spatial"`
	KotaID               uint             `gorm:"column:kota_id;not null"`
	Kota                 Kota             `gorm:"foreignKey:KotaID;references:ID"`
	CreatedAt            datatypes.Date   `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt            datatypes.Date   `gorm:"column:updatedAt;autoUpdateTime"`
}


// Set the Location field using a Point struct
func (a *AmbulanceProvider) SetLocation(point helpers.Point) {
    a.Location = []byte(point.ToWKT())
}

// Get the Location field as a Point struct
func (a *AmbulanceProvider) GetLocation() (helpers.Point, error) {
    return helpers.WKTToPoint(string(a.Location))
}

type Hospital struct {
	gorm.Model
	ID           uint           `gorm:"column:id;primaryKey;autoIncrement;not null"`
	HospitalName string         `gorm:"column:hospital_name;type:varchar(255);not null"`
	PhoneNumber  string         `gorm:"column:phone_number;type:varchar(255);not null"`
	Kelas        string         `gorm:"column:kelas;type:enum('A', 'B', 'C', 'D', 'E');not null"`
	Location     []byte         `gorm:"column:location;type:geometry;not null;index:idx_location,spatial"`
	KotaID       uint           `gorm:"column:kota_id;not null"`
	Kota         Kota           `gorm:"foreignKey:KotaID;references:ID"`
	CreatedAt    datatypes.Date `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt    datatypes.Date `gorm:"column:updatedAt;autoUpdateTime"`
}

// Set the Location field using a Point struct
func (h *Hospital) SetLocation(point helpers.Point) {
	h.Location = []byte(point.ToWKT())
}

// Get the Location field as a Point struct
func (h *Hospital) GetLocation() (helpers.Point, error) {
	return helpers.WKTToPoint(string(h.Location))
}

type DriverAccount struct {
	gorm.Model
	ID                   uint             `gorm:"primaryKey"`
	Email                string           `gorm:"column:email;type:varchar(255);not null;unique"`
	PhoneNumber          string           `gorm:"column:phone_number;type:varchar(255);not null"`
	FirstName            string           `gorm:"column:first_name;type:varchar(255);not null"`
	LastName             string           `gorm:"column:last_name;type:varchar(255);not null"`
	Password             string           `gorm:"column:password;type:varchar(255);not null"`
	AmbulanceProviderID  uint             `gorm:"column:ambulance_provider_id;not null"`
	AmbulanceProvider    AmbulanceProvider `gorm:"foreignKey:AmbulanceProviderID;references:ID"`
	IsOccupied           bool             `gorm:"column:is_occupied;default:false"`
	FcmToken             string           `gorm:"column:fcm_token;type:varchar(255)"`
	CreatedAt            datatypes.Date   `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt            datatypes.Date   `gorm:"column:updatedAt;autoUpdateTime"`
}

type UserAccount struct {
	gorm.Model
	ID         uint           `gorm:"column:id;primaryKey"`
	Email      string         `gorm:"column:email;type:varchar(255);not null;unique"`
	PhoneNumber string        `gorm:"column:phone_number;type:varchar(255);not null"`
	FirstName  string         `gorm:"column:first_name;type:varchar(255);not null"`
	LastName   string         `gorm:"column:last_name;type:varchar(255);not null"`
	Password   string         `gorm:"column:password;type:varchar(255);not null"`
	IsVerified bool           `gorm:"column:is_verified;default:false"`
	FcmToken   string         `gorm:"column:fcm_token;type:varchar(255)"`
	CreatedAt  datatypes.Date `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt  datatypes.Date `gorm:"column:updatedAt;autoUpdateTime"`
}

type EmergencyEvent struct {
	gorm.Model
	ID                   uint           `gorm:"column:id;primaryKey"`
	UserID               uint           `gorm:"column:user_id;not null"`
	User                 UserAccount    `gorm:"foreignKey:UserID;references:ID;"`
	UserLocation         []byte         `gorm:"column:user_location;type:geometry;not null;index:idx_user_location,spatial"`
	DriverID             uint           `gorm:"column:driver_id;default:null"`
	Driver               DriverAccount  `gorm:"foreignKey:DriverID;references:ID"`
	AmbulanceProviderID uint           	`gorm:"column:ambulance_provider_id;default:null"`
	AmbulanceProvider    AmbulanceProvider `gorm:"foreignKey:AmbulanceProviderID;references:ID"`
	HospitalID           uint           `gorm:"column:hospital_id;default:null"`
	Hospital             Hospital       `gorm:"foreignKey:HospitalID;references:ID"`
	EmergencyType        string         `gorm:"column:emergency_type;type:enum('MERAH', 'KUNING', 'HIJAU', 'PUTIH', 'HITAM')"`
	NumberOfPatient      int            `gorm:"column:number_of_patient;default:1"`
	Title                string         `gorm:"column:title;type:varchar(255)"`
	Descriptions         string         `gorm:"column:descriptions;type:varchar(255)"`
	IsDone               bool           `gorm:"column:is_done;default:false"`
	IsCanceled           bool           `gorm:"column:is_canceled;default:false"`
	Rating               string         `gorm:"column:rating;type:enum('1', '2', '3', '4', '5');default:null"`
	CreatedAt            datatypes.Date `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt            datatypes.Date `gorm:"column;updatedAt;autoUpdateTime"`
}

// Set the UserLocation field using a Point struct
func (e *EmergencyEvent) SetUserLocation(point helpers.Point) {
	e.UserLocation = []byte(point.ToWKT())
}

// Get the UserLocation field as a Point struct
func (e *EmergencyEvent) GetUserLocation() (helpers.Point, error) {
	return helpers.WKTToPoint(string(e.UserLocation))
}

type UserOTP struct {
	gorm.Model
	ID         uint           `gorm:"column:id;primaryKey"`
	PhoneNumber string        `gorm:"column:phone_number;type:varchar(255);not null"`
	OTP        string         `gorm:"column:otp;type:varchar(255);not null"`
	CreatedAt  datatypes.Date `gorm:"column:createdAt;autoCreateTime"`
	UpdatedAt  datatypes.Date `gorm:"column:updatedAt;autoUpdateTime"`
}