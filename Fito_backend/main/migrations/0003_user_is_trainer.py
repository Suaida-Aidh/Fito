# Generated by Django 4.2.5 on 2024-10-28 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_subscription'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_trainer',
            field=models.BooleanField(default=False),
        ),
    ]
