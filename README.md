# Django Application with Ajax and Datatables
=============================================

One page application which allows you to create, edit and delete the record via Ajax without refresh the page & displaying rows with datatables.

Getting Started
---------------

1. Clone the project on your system:

       $ git clone -b master https://github.com/milanpatel1519/django_with_ajax_and_datatables.git

Installing
----------

1. First go to your directory

       $ cd django_with_ajax_and_datatables

2. Now install libraries from requirements.txt file

       $ pip install -r requirements.txt

3. Now migrate the database

       $ python manage.py migrate

4. Make super user for Admin panel

       $ python manage.py createsuperuser
       
       $ python manage.py runserver
       Visit below URL for Admin panel
       Open URL: http://localhost:8000/admin

5. You are done. Visit below url to see it in action

       http://localhost:8000/crud_demo
