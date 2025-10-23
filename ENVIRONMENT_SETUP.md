# Environment Variables Setup

## Development Setup

1. Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

2. Add the following content to `.env.local`:
```
VITE_API_BASE_URL=http://localhost:8000
```

## Production Setup

For production deployment, update the environment variable to point to your production backend:

```
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Backend Requirements

Make sure your backend is running on the correct port and has the following endpoints:

- `POST /api/analyze` - Upload and analyze documents
- `GET /api/analyses` - Get analysis history
- `GET /api/analyses/:id` - Get specific analysis

## CORS Configuration

Ensure your backend has CORS configured to allow requests from your frontend domain.
