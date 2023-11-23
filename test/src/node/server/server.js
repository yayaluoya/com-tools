const express = require('express');
const { ResData } = require("yayaluoya-tool/http/ResData");
const { CredentialsT } = require('yayaluoya-tool/node/AliYun/CredentialsT');

const app = express()
const port = 1423

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
});

app.get('/test', (req, res) => {
    setTimeout(() => {
        res.send(new ResData(req.query, undefined, 'get请求成功，返回query'));
    }, 500);
})
app.post('/test', (req, res) => {
    setTimeout(() => {
        res.send(new ResData(req.body, undefined, 'post请求成功，返回body'));
    }, 500);
});
app.get('/sts', (req, res) => {
    let c = new CredentialsT({
        accessKeyId: 'LTAI5tJmDzkUiD911YUVDjMa',     // AccessKeyId of your account
        accessKeySecret: 'MtdSYoxiHEaioWff2M9v4KafU5XBj4', // AccessKeySecret of your account
    });
    c.getSts('acs:ram::1330807560356268:role/yayaluoya-test').then((data) => {
        res.send(new ResData(data));
    }).catch((e) => {
        console.log('获取sts出错了', e);
        res.send(new ResData().fail('获取失败'));
    });
})

app.listen(port, () => {
    console.log('http服务', `http://localhost:${port}`)
})