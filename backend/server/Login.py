import pymysql
import hashlib
from django.http import HttpResponse


def login(request):
    userName = request.POST.get('name')
    passwd = request.POST.get('password')
    if len(userName)==0:
        return HttpResponse("F"+"用户名不能为空")
    if len(passwd)==0:
        return HttpResponse("F"+"密码不能为空")

    # TODO：为了节省时间，密码密文加密已删除，直接返回明文密码，节省时间做重置密码
    # passwd_sha = hashlib.sha256(passwd.encode('utf-8')).hexdigest()

    conn = pymysql.connect(
        host='124.70.104.165',
        port=3306,
        user='meixuequzhongzhi',
        password='RFJ67yCMGY7Dx37T',
        db='meixuequzhongzhi',
    )
    cursor = conn.cursor()

    sql = 'select passwd from userData where userName=%s'
    cursor.execute(sql,userName)
    data = cursor.fetchall()
    if not data:
        conn.commit()
        cursor.close()
        conn.close()
        return HttpResponse("F" + "没有这个用户")
    else:
        if passwd != data[0][0]:
            conn.commit()
            cursor.close()
            conn.close()
            return HttpResponse("F" + "密码错误")
        else:
            conn.commit()
            cursor.close()
            conn.close()
            return HttpResponse("T")