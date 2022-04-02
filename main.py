import json
import os
import sys
import time
import requests


def log(info):
    log_file = os.environ.get('AUTO_NET_RECONNECT_LOG_FILE', "connect.log")
    print(info.strip())
    with open(log_file, "a") as f:
        f.write(info.strip() + "\n")


def login():
    url = 'http://192.168.50.3:8080/eportal/InterFace.do?method=login'
    config_file = os.environ.get('AUTO_NET_RECONNECT_CONFIG_FILE', "content")
    with open(config_file, "r") as f:
        data = f.read().strip('"').strip("'")
    header = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }

    try:
        response = requests.post(url, data, headers=header, timeout=10)
        content = json.loads(response.text)
        encoding = response.encoding
        if content['result'] == 'fail':
            msg = content['message'].encode(encoding).decode('utf-8')
            log(msg)
            if msg == "认证设备响应超时,请稍后再试!":
                time.sleep(120)
            if msg == '正常上网时段为:日常06:00-23:59，请在以上时段内进行认证上网!':
                time.sleep(1200)
        else:
            log("login at --> " + time.asctime(time.localtime(time.time())))
        return
    except Exception as info:
        log("login 连接异常:" + str(info))


def ping(host, n):
    cmd = "ping {} {} {} > ping.log".format(
        "-n" if sys.platform.lower() == "win32" else "-c",
        n,
        host,
    )
    return 0 == os.system(cmd)


def pong():
    return ping("202.114.0.242", 4) or ping("8.8.8.8", 4)


if __name__ == '__main__':
    while True:
        if pong():
            time.sleep(5)
        else:
            login()
            time.sleep(10)
