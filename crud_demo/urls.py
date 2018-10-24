from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    path('', views.UserProfileView.as_view(), name='crud_demo'),
    url(r'^submit/user/details$', views.UserProfileView.as_view(),
        name='submit_user_details'),
    url(r'^edit/details$', views.UserProfileView.as_view(), name='edit_use_details'),
    url(r'^delete/details$', views.UserProfileView.as_view(),
        name='delete_user_details'),
]
