PROJECT_NAME=boba-watch
ZONE=us-west2-b
INSTANCE_NAME=instance-1

SQL_SERVER_IP=35.236.79.15
SQL_INSTANCE_CONNECTION_NAME=boba-watch:us-west2:instance0
SQL_USER=root

dev:
	nodemon index.js
prod:
	sudo kill -9 $(shell sudo netstat -nlp | grep 443 | sed s/.*LISTEN// | tr -dc 0-9)
	npm start
ssh:
	gcloud compute ssh --project $(PROJECT_NAME) --zone $(ZONE) $(INSTANCE_NAME)
sql:
	mysql --host=$(SQL_SERVER_IP) --user=$(SQL_USER) --password
sqlproxy:
	# To setup cloud_sql_proxy follow instructions here: https://cloud.google.com/sql/docs/mysql/quickstart-proxy-test
	# Then add ./cloud_sql_proxy to /user/local/bin
	cloud_sql_proxy -instances=$(SQL_INSTANCE_CONNECTION_NAME)=tcp:3306
sqldev:
	# Run `make sqlproxy` in a separate terminal window before running this
	mysql --user=$(SQL_USER) --password --host 127.0.0.1 --port 3306
