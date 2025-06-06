# Generated by Django 4.1 on 2023-10-26 18:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Candidate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("cv", models.TextField(blank=True, null=True)),
                ("plan_rada", models.TextField(blank=True, null=True)),
                ("aktivnosti", models.TextField(blank=True, null=True)),
                ("predstavljanje", models.TextField(blank=True, null=True)),
                ("deleted", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="NumberOfVotesPerTeam",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("number_of_votes", models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name="Votes",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_voted", models.BooleanField(default=False)),
                (
                    "kandidatura",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="eizbori.candidate",
                    ),
                ),
            ],
        ),
    ]
