# Vouche API Documentation

## Authentication

All endpoints require authentication using a Supabase JWT token.

## Endpoints

### Users

#### Get Campaign

Retrieves the user's campaign. If no campaign exists, a default one is created.

**Endpoint:** `GET /api/campaigns`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Success Response:**

```json
{
  "status": "success",
  "message": "Campaign retrieved successfully",
  "data": {
    "id": "123",
    "name": "API Docs",
    "description": "Quick description for API Docs",
    "referrer_reward_type": "gift card" | "custom" | "message",
    "referrer_reward_value": "30% off",
    "referred_reward_type": "gift card" | "custom" | "message",
    "referred_reward_value": "Thank you for your business",
    "user_id": "abc-xyz",
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "message": "Error message here",
  "data": null
}
```

#### Update Campaign

Updates the user's campaign.

**Endpoint:** `POST /api/users/campaign`

**Headers:**

```
Authorization: Bearer <supabase_jwt_token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Updated Campaign Name",
  "status": "active"
}
```

**Success Response:**

```json
{
  "status": "success",
  "message": "Campaign updated successfully",
  "data": {
    "id": "123",
    "name": "API Docs",
    "description": "Quick description for API Docs",
    "referrer_reward_type": "gift card" | "custom" | "message",
    "referrer_reward_value": "30% off",
    "referred_reward_type": "gift card" | "custom" | "message",
    "referred_reward_value": "Thank you for your business",
    "user_id": "abc-xyz",
  }
}
```

**Error Response:**

```json
{
  "status": "error",
  "message": "Error message here",
  "data": null
}
```

## Error Codes

| Status Code | Description           |
| ----------- | --------------------- |
| 400         | Invalid input data    |
| 401         | Invalid auth token    |
| 404         | Resource not found    |
| 500         | Internal Server Error |
