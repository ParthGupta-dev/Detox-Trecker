# docs/api/ — API Documentation

## What belongs here

Reference documentation for every API endpoint, written as the endpoints are built.

### Template for each endpoint

```
## METHOD /path

**Auth required:** yes / no  
**Purpose:** One sentence.

### Request

Headers:
- `Content-Type: application/json`
- `Cookie: session=...` (if auth required)

Body (if POST/PATCH):
```json
{ "field": "value" }
```

### Responses

**Success** `200/201/204`
```json
{ "data": "..." }
```

**Errors**
- `400` — validation error: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }`
- `401` — not authenticated
- `404` — not found
```

---

Endpoints will be documented here starting from Phase 3.
