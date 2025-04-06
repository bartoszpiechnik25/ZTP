package models

import (
	"bytes"
	"encoding/json"
	"io"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func Test_Utils(t *testing.T) {
	t.Parallel()

	type requestData struct {
		Name         *string `json:"name"`
		Surname      *string `json:"surname"`
		Username     string  `json:"username"`
		Email        string  `json:"email"`
		Phone_number string  `json:"phone_number"`
		Role         string  `json:"role"`
	}

	t.Run("should map request body to AddUserModel", func(t *testing.T) {
		t.Parallel()

		// given
		data := requestData{
			Name:         nil,
			Surname:      nil,
			Username:     "john_doe",
			Email:        "john.doe@gmail.com",
			Phone_number: "some number",
			Role:         "user",
		}
		b, err := json.Marshal(data)
		require.NoError(t, err)
		request_body := io.NopCloser(bytes.NewReader(b))

		// when
		model, err := MapRequestBodyToAddUserModel(request_body)

		// then
		require.NoError(t, err)
		require.NotNil(t, model)
		assert.ObjectsAreEqual(data, model)
	})

	t.Run("should fail when required field not present", func(t *testing.T) {
		t.Parallel()

		// given
		data := requestData{
			Name:         nil,
			Surname:      nil,
			Username:     "john_doe",
			Email:        "",
			Phone_number: "some number",
			Role:         "user",
		}
		b, err := json.Marshal(data)
		require.NoError(t, err)
		request_body := io.NopCloser(bytes.NewReader(b))

		// when
		model, err := MapRequestBodyToAddUserModel(request_body)

		// then
		require.Error(t, err)
		require.Nil(t, model)
	})

	t.Run("should fail when role field is invalid", func(t *testing.T) {
		t.Parallel()

		// given
		data := requestData{
			Name:         nil,
			Surname:      nil,
			Username:     "john_doe",
			Email:        "john_doe@gmail.com",
			Phone_number: "some number",
			Role:         "new_role",
		}
		b, err := json.Marshal(data)
		require.NoError(t, err)
		request_body := io.NopCloser(bytes.NewReader(b))

		// when
		model, err := MapRequestBodyToAddUserModel(request_body)

		// then
		require.Error(t, err)
		require.Nil(t, model)
	})
}
