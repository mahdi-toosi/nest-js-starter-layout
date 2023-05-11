#! /bin/bash

MODULE_NAMES=("root" "another-app")
COMMANDS=("seed" "pull" "studio" "push" "generate" "reset" "deploy" "migrate" "rollback")

COMMAND=$2
THIRD_ARG=$3
MODULE_NAME=$1

ENV_PATH="apps/${MODULE_NAME}/prisma/.env"
SEEDER_PATH="apps/${MODULE_NAME}/prisma/seeds/index.ts"
SCHEMA_PATH="apps/${MODULE_NAME}/prisma/schema.prisma"

# ? check the module name ( first argument )
if [[ ! "${MODULE_NAMES[*]}" =~ "${MODULE_NAME}" ]]; then
    echo "'$MODULE_NAME' module name is not valid"
	exit
fi

# ? check the command ( second argument )
if [[ ! "${COMMANDS[*]}" =~ "${COMMAND}" ]]; then
    echo "'${COMMAND}' command is not valid"
	exit
fi

# ? check the prisma file existence
if [ ! -f "$ENV_PATH" ]; then
    echo "env does not exists in '${ENV_PATH}'"
	exit
fi

if [ ! -f "$SEEDER_PATH" ]; then
    echo "seeder does not exists in '${SEEDER_PATH}'"
	exit
fi

if [ ! -f "$SCHEMA_PATH" ]; then
    echo "schema does not exists in '${SCHEMA_PATH}'"
	exit
fi

# ? check the third arg
if [ $COMMAND == 'migrate' ] && [ ! $THIRD_ARG ] ; then
	echo as third arg you did not set migrate message
	exit
fi

if [ $COMMAND == 'rollback' ] && [ ! $THIRD_ARG ] ; then
	echo as third arg you did not set migrate message
	exit
fi


# ? run commands
if [ $COMMAND == 'seed' ]; then
	npx ts-node $SEEDER_PATH
	exit
fi

if [ $COMMAND == 'pull' ]; then
	npx dotenv -e $ENV_PATH -- prisma db pull --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'studio' ]; then
	npx dotenv -e $ENV_PATH -- prisma studio --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'push' ]; then
	npx dotenv -e $ENV_PATH -- prisma db push --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'generate' ]; then
	npx dotenv -e $ENV_PATH -- prisma generate --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'reset' ]; then
	npx dotenv -e $ENV_PATH -- prisma migrate reset --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'deploy' ]; then
	npx dotenv -e $ENV_PATH -- prisma migrate deploy --schema $SCHEMA_PATH
	exit
fi

if [ $COMMAND == 'migrate' ]; then
	npx dotenv -e $ENV_PATH -- prisma migrate dev --schema $SCHEMA_PATH --name $THIRD_ARG
	exit
fi

if [ $COMMAND == 'rollback' ]; then
	npx dotenv -e $ENV_PATH -- prisma migrate resolve --rolled-back $THIRD_ARG --schema $SCHEMA_PATH
	exit
fi
