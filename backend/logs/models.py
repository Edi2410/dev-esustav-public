from django.db import models

from estudenti.models import User


class ErrorLogs(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    error = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.time} - {self.error}"
