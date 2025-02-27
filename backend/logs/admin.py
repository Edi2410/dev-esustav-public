from django.contrib import admin

from logs.models import ErrorLogs


# Create your models here.
class ErrorLogsAdmin(admin.ModelAdmin):
    list_display = ("user", "time", "error")


# Register your models here.
admin.site.register(ErrorLogs, ErrorLogsAdmin)
