import pymysql
import hashlib
from django.http import HttpResponse


def signup(request):
    userName = request.POST.get('uName')
    realName = request.POST.get('name')
    schoolName = request.POST.get('sName')
    passwd = request.POST.get('password')

    if len(userName) == 0:
        return HttpResponse("F"+"用户名不能为空")
    if len(realName) == 0:
        return HttpResponse("F"+"学生姓名不能为空")
    if len(schoolName) == 0:
        return HttpResponse("F"+"学校名不能为空")
    if len(passwd) == 0:
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

    # 注册，判断是否已经注册
    sql = 'select * from userData where userName=%s'
    cursor.execute(sql, userName)
    if not cursor.fetchall():
        sql = 'INSERT INTO userData(userName,realName,schoolName,passwd) VALUES (%s,%s,%s,%s)'
        cursor.execute(sql, (userName,realName,schoolName,passwd))
        conn.commit()
        cursor.close()
        conn.close()
        return HttpResponse("T")
    else:
        return ("F" + "该用户名已经注册")
