# Phase 1 — HTTP and REST Notes

> Fill this in as you learn. The goal: be able to explain a request/response without notes.

## What is HTTP?

_Write your explanation here._

## A URL has parts

```
https://api.example.com/api/logs?from=2024-01-01&to=2024-01-31
 └─┬─┘  └──────┬───────┘└──┬──┘ └────────────┬───────────────┘
scheme        host         path           query string
```

- **Scheme:** `http` (unencrypted) or `https` (encrypted)
- **Host:** the server's domain name
- **Path:** what resource you want
- **Query string:** filters and options, key=value pairs separated by `&`

## HTTP Methods

| Method | Use for | Example |
|---|---|---|
| GET | Read data (never changes anything) | Get list of logs |
| POST | Create new data | Create a log entry |
| PATCH | Partially update existing data | Change minutes on a log |
| DELETE | Remove data | Delete a log |

## Status Codes

| Code | Meaning | When to use |
|---|---|---|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST |
| 204 | No content | Successful DELETE |
| 400 | Bad request | Validation error (wrong format, missing fields) |
| 401 | Unauthorised | Not logged in |
| 403 | Forbidden | Logged in but not allowed (e.g. other user's data) |
| 404 | Not found | Resource doesn't exist |
| 409 | Conflict | Duplicate (e.g. email already registered) |
| 500 | Server error | Unexpected crash |

## Headers

_Notes:_

## Request Body

_Notes:_

## Network error vs HTTP error

_Notes:_

---

## Exercise (Phase 1)

Describe `POST /api/logs` fully:
- URL:
- Method:
- Required headers:
- Body (example):
- Success response (status + body):
- Error responses:

_Write your answer here._
