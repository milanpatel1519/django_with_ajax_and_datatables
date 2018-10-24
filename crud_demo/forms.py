from django import forms
from .models import UserProfile


class UserProfileForm(forms.ModelForm):
    name = forms.CharField(required=True, max_length=1024,
                           widget=forms.TextInput(
                               attrs={'required': True, 'placeholder': 'Name'}),
                           help_text='Name of user')
    email = forms.EmailField(required=True,
                             widget=forms.EmailInput(
                                 attrs={'required': True, 'placeholder': 'Email'}),
                             help_text="Email address of user")
    mobile = forms.CharField(max_length=10,
                             widget=forms.NumberInput(
                                 attrs={'required': True, 'placeholder': 'Mobile'}),
                             help_text="Mobile number of user")
    address = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'User Address'}),
                              max_length=1024, help_text="User address")
    date_of_birth = forms.DateField(label="Date of birth",
                                    help_text="Date of birth of user",
                                    widget=forms.widgets.DateInput(attrs={'type': 'date', 'required': True, 'placeholder': 'Date of Birth'}))

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female')
    )
    gender = forms.ChoiceField(required=True, widget=forms.RadioSelect(
        attrs={'class': 'Radio', 'placeholder': 'Gender'}), choices=GENDER_CHOICES, help_text="Gender of user")

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
    blood_group = forms.ChoiceField(
        choices=BLOOD_GROUP_CHOICES, help_text="Blood Group of user")

    class Meta:
        model = UserProfile
        fields = ('name', 'email', 'mobile', 'address',
                  'date_of_birth', 'blood_group')


# class UserProfileForm(forms.ModelForm):
#     GENDER_CHOICES = (
#         ('M', 'Male'),
#         ('F', 'Female')
#     )
#     gender = forms.ChoiceField(required=True, widget=forms.RadioSelect(
#         attrs={'class': 'Radio'}), choices=GENDER_CHOICES)
#     # gender = forms.ChoiceField(choices=GENDER_CHOICES,
#     #                            widget=forms.RadioSelect())

#     class Meta:
#         model = UserProfile
#         fields = ('name', 'email', 'mobile', 'address',
#                   'date_of_birth', 'blood_group')
