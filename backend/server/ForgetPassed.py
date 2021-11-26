import pymysql
import hashlib
from django.http import HttpResponse


def forget(request):
    userName = request.POST.get('uName')
    realName = request.POST.get('name')
    schoolName = request.POST.get('sName')

    if len(userName) == 0:
        return HttpResponse("F" + "用户名不能为空")
    if len(realName) == 0:
        return HttpResponse("F" + "学生姓名不能为空")
    if len(schoolName) == 0:
        return HttpResponse("F" + "学校名不能为空")

    conn = pymysql.connect(
        host='124.70.104.165',
        port=3306,
        user='meixuequzhongzhi',
        password='RFJ67yCMGY7Dx37T',
        db='meixuequzhongzhi',
    )
    cursor = conn.cursor()

    sql = 'select passwd from userData where userName=%s and realName=%s and schoolName=%s'
    cursor.execute(sql, (userName,realName,schoolName))
    data = cursor.fetchall()
    if not data:
        conn.commit()
        cursor.close()
        conn.close()
        return HttpResponse("F" + "该用户没有注册或者信息输入错误")
    else:
        return HttpResponse("T" + data[0][0])