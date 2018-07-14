#!/usr/bin/python
#-*- coding: utf-8 -*-
# Author: HaoQJ
# Date: 2018-05-21
################################

from django.shortcuts import render
from django.http import HttpResponse
from py_common import jsonp
from pymongo import MongoClient
from bson.objectid import ObjectId
import json, datetime
import logging
logger = logging.getLogger(__name__)
conn = MongoClient('127.0.0.1', 27017)
# Create your views here.

def user_login(req):
    req_body = json.loads(req.POST.dict().keys()[0])
    username = req_body['username']
    password = req_body['password']
    
    db = conn.ShareView
    my_set = db.UserInformation
    if my_set.find({'username': username}).count() == 0:
        return HttpResponse('0')
    if my_set.find({'username': username, 'password': password}).count() == 0:
        return HttpResponse('404')
    return HttpResponse('200')

def user_all(req):
    db = conn.ShareView
    my_set = db.UserInformation
    res_data = []
    try:
        for it in my_set.find():
            res_data.append({
                'key': str(it['_id']),
                'usertype': '普通用户' if it['usertype'] == '1' else '管理员',
                'username': it['username'],
                'password': it['password'],
                'email': it['email'],
                'createdate': it['createdate']
            })
        return jsonp.generate_http_response(req, json.dumps(res_data))
    except:
        return jsonp.generate_http_response(req, "404")

def user_add(req):
    req_body = json.loads(req.POST.dict().keys()[0])
    username = req_body['username']
    password = req_body['password']
    usertype = req_body['usertype']
    email = req_body['email']
    createdate = str(datetime.date.today())
    insert_dict = {
        'usertype': usertype,
        'username': username,
        'email': email,
        'password': password,
        'createdate': createdate,
    }
    
    db = conn.ShareView
    my_set = db.UserInformation
    
    if my_set.find({"username": username}).count() > 0:
        return HttpResponse("1")
    try:
        my_set.insert(insert_dict)
        return HttpResponse("200")
    except:
        logger.error("insert data error")
        return HttpResponse("404")
def user_delete(req):
    _id = req.GET.get('_id')
    db = conn.ShareView
    my_set = db.UserInformation
    logger.debug(_id)
    try:
        my_set.remove({"_id": ObjectId(_id)})
        return jsonp.generate_http_response(req, "200")
    except:
        logger.error("user delete error!")
        return jsonp.generate_http_response(req, "404")