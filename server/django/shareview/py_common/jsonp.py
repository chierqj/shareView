#!/usr/bin/env python
# -*- coding=utf-8 -*-
from django.http import HttpResponse
def generate_http_response(request, response_str):
  jsonp_callback = request.GET.get("callback")
  if jsonp_callback:
    response = HttpResponse("%s(%s);" % (jsonp_callback, response_str))
    response["Content-type"] = "text/javascript; charset=utf-8"
  else:
    response = HttpResponse(response_str)
    response["Content-type"] = "application/json; charset=utf-8"
  return response
