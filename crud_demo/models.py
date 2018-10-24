from django.db import models
import datetime


class UserProfile(models.Model):
    name = models.CharField(max_length=20, unique=False)
    email = models.EmailField(max_length=200)
    mobile = models.CharField(max_length=15)
    address = models.TextField(max_length=200)
    date_of_birth = models.DateField("Date of Birth", default=datetime.date.today)

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = models.CharField(choices=GENDER_CHOICES, max_length=128, default='M')

    BLOOD_GROUP_CHOICES = (
        ('Aplus', 'A+'),
        ('Aminus', 'A-'),
        ('Bplus', 'B+'),
        ('Bminus', 'B-'),
        ('Oplus', 'O+'),
        ('Ominus', 'O-'),
        ('ABplus', 'AB+'),
        ('ABminus', 'AB-'),
    )
    blood_group = models.CharField(
        choices=BLOOD_GROUP_CHOICES, max_length=128, default='Aplus')

    def __str__(self):
        return self.name
