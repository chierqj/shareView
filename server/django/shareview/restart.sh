#!/bin/bash
export LANG=zh_CN.UTF-8
killall -s INT uwsgi
sleep 2
uwsgi uwsgi.ini
