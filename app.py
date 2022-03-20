from flask import Flask, render_template, request, redirect, url_for, make_response
import pandas as pd
import requests
import pymysql
import datetime
import uuid
import os

login_time = 0
logout_time = 0

def get_token():
    params = {
        'client_id': "lS7ycpwUQL2TgU7z",
        'client_secret': "f49dd5b0cfc245ddae938d09704ab00e",
        'grant_type': "client_credentials"
    }
    request = requests.get(
        'https://www.arcgis.com/sharing/rest/oauth2/token',
        params=params
    )
    response = request.json()
    token = response["access_token"]
    return token

token = get_token()
db = pymysql.connect(
    host='airqoweb.cugf7jeo6plr.us-west-1.rds.amazonaws.com',
    port=3306,
    user='admin',
    password='airqoweb',
    db='airqoweb',
)
cursor = db.cursor()
firm_info = pd.read_sql('select * from firm_data', con=db)
username_list = list(firm_info['firm_id'])
password_list = list(firm_info['password'])

app = Flask(__name__)

@app.route("/", methods=["POST", "GET"])
def Web():
    if 'username' in request.cookies:
        global log_info
        log_info = list(pd.read_sql('select * from record', con=db)['log_index'])
        if request.cookies.get('log_id') not in log_info:
            sql = "insert into record values('%s','%s','%s','%s')" % (request.cookies.get('log_id'), request.cookies.get('username'), request.cookies.get('login_time'), request.cookies.get('logout_time'))
            cursor.execute(sql)
            db.commit()
        survey_info = pd.read_csv(
            'https://docs.google.com/spreadsheets/d/17TzaniMJpmnpOEouXRLnGkxRrf3RZfrRIRqBxzVE3ic/export?format=csv&gid=722921890')
        survey_list = list(survey_info['Your Firm ID'])
        survey_flag = 0
        if request.cookies.get('username') in survey_list:
            survey_flag = 1
        return render_template(
            'index.html',
            firm_id=request.cookies.get('username'),
            loc_info=firm_info['loc_info'][username_list.index(request.cookies.get('username'))],
            sector=firm_info['cs_sector'][username_list.index(request.cookies.get('username'))],
            lon=firm_info['longitude'][username_list.index(request.cookies.get('username'))],
            lat=firm_info['latitude'][username_list.index(request.cookies.get('username'))],
            pll_qnt=firm_info['Pll_qnt'][username_list.index(request.cookies.get('username'))],
            MA_0=firm_info['MA_qn_0'][username_list.index(request.cookies.get('username'))],
            MA_1=firm_info['MA_qn_1'][username_list.index(request.cookies.get('username'))],
            MA_2=firm_info['MA_qn_2'][username_list.index(request.cookies.get('username'))],
            show_MA_0=firm_info['show_MA_quantile_bysector0'][username_list.index(request.cookies.get('username'))],
            show_MA_1=firm_info['show_MA_quantile_bysector1'][username_list.index(request.cookies.get('username'))],
            show_MA_2=firm_info['show_MA_quantile_bysector2'][username_list.index(request.cookies.get('username'))],
            show_pll=firm_info['show_MA_Poll'][username_list.index(request.cookies.get('username'))],
            token=token,
            survey_flag=survey_flag
        )

    return redirect("login")


@app.route('/login', methods=["POST", "GET"])
def login():
    username = request.form.get('USERNAME')
    if username in username_list:
        id = uuid.uuid1().hex
        login_time = datetime.datetime.now()
        logout_time = login_time + datetime.timedelta(seconds=3600)
        resp = make_response(redirect(url_for("Web")))
        resp.set_cookie('username', username, max_age=3600)
        resp.set_cookie('log_id', id, max_age=3600)
        resp.set_cookie('login_time', str(login_time), max_age=3600)
        resp.set_cookie('logout_time', str(logout_time), max_age=3600)
        return resp
    return render_template('login.html')

@app.route('/logout', methods=["POST", "GET"])
def logout():
    logout_time = datetime.datetime.now()
    sql = "UPDATE record SET logout = '%s' WHERE log_index = '%s'" % (logout_time, request.cookies.get('log_id'))
    cursor.execute(sql)
    db.commit()
    resp = make_response(redirect(url_for("login")))
    resp.delete_cookie('username')
    resp.delete_cookie('log_id')
    resp.delete_cookie('login_time')
    resp.delete_cookie('logout_time')
    return resp

app.secret_key = os.urandom(24)


if __name__ == '__main__':
    app.run(debug=True, processes=True)
    db.close()
