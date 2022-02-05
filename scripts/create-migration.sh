# You have to specify MIGRATION_NAME= env
docker-compose -f docker-compose.yml -f docker-compose.cli.yml build create_migration && \
    docker-compose -f docker-compose.yml -f docker-compose.cli.yml up create_migration