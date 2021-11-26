import pymysql
import hashlib
from django.http import HttpResponse


def forget(request):
    user_name = request.POST.get('userName')
    passwd = request.POST.get('passwd')
    new_passwd = request.POST.get('newPasswd')
    renew_passwd = request.POST.get('renewPasswd')
    if len(user_name) == 0:
        return HttpResponse("F" + "用户名不能为空")
    if len(passwd) == 0:
        return HttpResponse("F" + "原密码不能为空")
    if len(new_passwd) == 0:
        return HttpResponse("F" + "新密码不能为空")
    if len(renew_passwd) == 0:
        return HttpResponse("F" + "确认密码不能为空")
    if new_passwd != renew_passwd:
        return HttpResponse("F" + "新密码和确认密码不同")

    passwd_sha = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    new_passwd_sha = hashlib.sha256(new_passwd.encode('utf-8')).hexdigest()
    conn = pymysql.connect(
        host='124.70.104.165',
        port=3306,
        user='meixuequzhongzhi',
        password='RFJ67yCMGY7Dx37T',
        db='meixuequzhongzhi',
    )
    cursor = conn.cursor()

    sql = 'select passwd from system_users where user_name=%s'
    cursor.execute(sql, user_name)
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
            return HttpResponse("F" + "原密码错误")
        else:
            sql = 'update system_users set passwd=%s where user_name=%s'
            cursor.execute(sql, (new_passwd_sha,user_name))
            conn.commit()
            cursor.close()
            conn.close()
            return HttpResponse("T")