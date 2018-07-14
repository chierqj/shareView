"""shareview URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns, include, url
from django.contrib import admin
from ContentData.views import *
from UserManage.views import *
from DataManage.views import *

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    url(r'^contentdata/get_all_code.*$', get_all_code, name="get_all_code"),
    url(r'^contentdata/get_exchange_history.*$', get_exchange_history, name="get_exchange_history"),
    url(r'^usermanage/user_all.*$', user_all, name='user_all'),
    url(r'^usermanage/user_add.*$', user_add, name='user_add'),
    url(r'^usermanage/user_login.*$', user_login, name='user_login'),
    url(r'^usermanage/user_delete.*$', user_delete, name='user_delete'),
    url(r'^datamanage/data_add.*$', data_add, name='data_add'),
    url(r'^datamanage/data_info_all.*$', data_info_all, name='data_info_all'),
    url(r'^datamanage/data_delete.*$', data_delete, name='data_delete'),
    url(r'^datamanage/data_show.*$', data_show, name='data_show'),
)
