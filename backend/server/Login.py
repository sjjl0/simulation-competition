import pymysql
import hashlib
from django.http import HttpResponse


def login(request):
    user_name = request.POST.get('userName')
    passwd = request.POST.get('passwd')
    if len(user_name)==0:
        return HttpResponse("F"+"用户名不能为空")
    if len(passwd)==0:
        return HttpResponse("F"+"密码不能为空")
    passwd_sha = hashlib.sha256(passwd.encode('utf-8')).hexdigest()

    conn = pymysql.connect(
        host='124.70.104.165',
        port=3306,
        user='meixuequzhongzhi',
        password='RFJ67yCMGY7Dx37T',
        db='meixuequzhongzhi',
    )
    cursor = conn.cursor()

    sql = 'select passwd from system_users where user_name=%s'
    cursor.execute(sql,user_name)
    data = cursor.fetchall()
    if not data:
        conn.commit()
        cursor.close()
        conn.close()
        return HttpResponse("F" + "没有这个用户")
    else:
        if passwd_sha != data[0][0]:
            conn.commit()
            cursor.close()
            conn.close()
            return HttpResponse("F" + "密码错误")
        else:
            conn.commit()
            cursor.close()
            conn.close()
            return HttpResponse("T")