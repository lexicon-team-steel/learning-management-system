migrations-add:
	dotnet ef migrations add $(name) --project LMS.Infrastructure --startup-project LMS.API
migrations-remove:
	dotnet ef migrations remove --project LMS.Infrastructure --startup-project LMS.API
database-update:
	dotnet ef database update --project LMS.Infrastructure --startup-project LMS.API
database-drop:
	dotnet ef database drop --project LMS.Infrastructure --startup-project LMS.API
build:
	dotnet build LMS.sln
run:
	dotnet run --project LMS.API
dev: build run
