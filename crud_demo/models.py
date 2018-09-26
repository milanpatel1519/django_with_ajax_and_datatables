from django.db import models
from django.core.validators import RegexValidator


class UserProfile(models.Model):
    name = models.CharField(max_length=20, unique=False)
    email = models.EmailField(max_length=20, unique=True)

    mobile_validation_regex = RegexValidator(
        regex=r'^(+\d{1,3})?,?\s?\d{8,13}', message="Mobile number must be entered in the format: '+999999999', 10 digits allowed.")
    mobile = models.CharField(
        validators=[mobile_validation_regex], max_length=15, unique=True)

    address = models.TextField(max_length=200)
    date_of_birth = models.DateField("Date of birth")

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = models.CharField(choices=GENDER_CHOICES,
                              max_length=6, default='M')

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
