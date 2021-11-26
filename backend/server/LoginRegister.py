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
        host='182.61.55.253',
        port=3306,
        user='test',
        password='Abc%123456',
        db='oyys'
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


def register(request):
    user_name = request.POST.get('userName')
    passwd = request.POST.get('passwd')
    re_passwd = request.POST.get('rePasswd')
    if len(user_name)==0:
        return HttpResponse("F"+"用户名不能为空")
    if len(passwd)==0:
        return HttpResponse("F"+"密码不能为空")
    if len(re_passwd)==0:
        return HttpResponse("F"+"确认密码不能为空")
    if passwd!=re_passwd:
        return HttpResponse("F"+"密码和确认密码不同")
    passwd_sha = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    conn = pymysql.connect(
        host='182.61.55.253',
        port=3306,
        user='test',
        password='Abc%123456',
        db='oyys'
    )
    cursor = conn.cursor()

    sql = 'CREATE TABLE IF NOT EXISTS system_users(' \
          'ID int primary key NOT NULL AUTO_INCREMENT,' \
          'user_name varchar(128) NOT NULL,' \
          'passwd varchar(128) NOT NULL' \
          ')'
    cursor.execute(sql)

    # 注册，判断是否已经注册
    sql = 'select * from system_users where user_name=%s'
    cursor.execute(sql, (user_name))
    if not cursor.fetchall():
        sql = 'INSERT INTO system_users(user_name,passwd) VALUES (%s,%s)'
        cursor.execute(sql, (user_name,passwd_sha))
        conn.commit()
        cursor.close()
        conn.close()
        return HttpResponse("T")
    else:
        sql = 'UPDATE department_leader SET passwd=%s WHERE user_name=%s'
        cursor.execute(sql, (passwd_sha,user_name))
        conn.commit()
        cursor.close()
        conn.close()
        return ("F"+"该用户名已经注册")


def change(request):
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
        host='182.61.55.253',
        port=3306,
        user='test',
        password='Abc%123456',
        db='oyys'
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
