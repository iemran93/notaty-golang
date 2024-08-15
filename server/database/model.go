package database

type Note struct {
	Id          int    `json:"id"`
	Title       string `json:"title"`
	Content     string `json:"content"`
	CreatedDate string `json:"createdDate"`
	UpdatedDate string `json:"updatedDate"`
}
