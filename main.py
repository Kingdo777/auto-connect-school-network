import time
import json

from scapy.layers.inet import IP, ICMP
from scapy.packet import Raw
from scapy.sendrecv import sr1

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
    ping_pkt = IP(dst="8.8.8.8") / ICMP() / b'welcome!'
    ping_result = sr1(ping_pkt, timeout=2, verbose=False)
    try:
        if ping_result.getlayer(ICMP).fields['type'] == 0 \
                and ping_result.getlayer(Raw).fields['load'] == b'welcome!':
            return True
        else:
            return False
    except Exception:
        return False


if __name__ == '__main__':
    while True:
        if pong():
            time.sleep(5)
        else:
            login()
            time.sleep(10)
