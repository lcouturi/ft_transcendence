# Generated by Django 4.2.13 on 2024-06-27 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_customuser_image_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image_profile',
            field=models.ImageField(blank=True, default='default_profile_image.jpg', null=True, upload_to='profile_images/'),
        ),
    ]
