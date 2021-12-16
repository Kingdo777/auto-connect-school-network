import json
import os
import sys
import time

import requests


def login():
    url = 'http://192.168.50.3:8080/eportal/InterFace.do?method=login'
    with open("content", "r") as f:
        data = f.read()
    header = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
    response = requests.post(url, data, headers=header)
    content = json.loads(response.text)
    encoding = response.encoding
    if content['result'] == 'fail':
        print(content['message'].encode(encoding).decode('utf-8'))
    else:
        print("login at --> " + time.asctime(time.localtime(time.time())))
    return


def pong():
    if sys.platform.lower() == "win32":
        response = os.system("ping -n 1 8.8.8.8 > ping.log")
    else:
        response = os.system("ping -c 1 8.8.8.8 > ping.log")
    return response == 0


if __name__ == '__main__':
    while True:
        if pong():
            time.sleep(5)
        else:
            login()
            time.sleep(10)
