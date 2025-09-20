#!/bin/bash

HOST=admin@3.94.194.97

echo "Pushing changes..."
rsync --delete --exclude "node_modules/" -a --info=progress2 "." "$HOST:app"

ssh "$HOST" bash <<EOF
cd ~/app
echo "Building container..."
docker compose up --build -d
EOF
