# Generated by Django 4.2.13 on 2024-06-27 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_alter_customuser_image_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='image_profile',
            field=models.ImageField(default='default_profile_image.jpg', upload_to='images/'),
        ),
    ]
