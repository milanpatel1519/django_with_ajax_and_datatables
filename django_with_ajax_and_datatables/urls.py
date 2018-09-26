from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('crud_demo/', include('crud_demo.urls')),
    path('admin/', admin.site.urls),
]
