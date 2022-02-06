#/usr/bin/env bash
export MIGRATION_NAME=$1 
docker-compose \
    -f docker-compose.yml -f docker-compose.cli.yml build generate_migration && \
docker-compose \
    -f docker-compose.yml -f docker-compose.cli.yml up generate_migration