ssh:
	gcloud compute --project "boba-watch" ssh --zone "us-west2-b" "instance-1"
sql:
	mysql --host=35.236.79.15 --user=root
reset-database:
	mysql --host=35.236.79.15 --user=root < ./scripts/db-setup.sql