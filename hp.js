//全局---------------------------------------
var score=0;
var clock=0;
var clockTimer=setInterval(tiktok,1000);
function tiktok()
{
    clock++;
    //num3.innerHTML=clock;
}
var movelist=[];
var bulletlist=[];
var sisterlist=[];
var splist=[];
var bulletNum=300;
var theWidth=document.body.clientWidth;
var theHeight=window.screen.height;
var title=document.getElementById("title");
var wajieTime=0;
var wajiePic;
var wajieing=0;
var wajieNum=0;
var wajieNumshow=document.createElement('h6');
document.getElementById('main').appendChild(wajieNumshow);
wajieNumshow.innerHTML=wajieNum;
wajieNumshow.style.display="inline-block";
wajieNumshow.style.position="absolute";
wajieNumshow.style.bottom="90px";
wajieNumshow.style.left="65px";
var wajieCDshow=document.createElement('h6');
document.getElementById('main').appendChild(wajieCDshow);
wajieCDshow.innerHTML=15;
wajieCDshow.style.display="inline-block";
wajieCDshow.style.position="absolute";
wajieCDshow.style.bottom="140px";
wajieCDshow.style.left="65px";
var tiao,sigezi,tiaolen;
document.onkeydown=keyDown;
function keyDown(event)
{
    var event=event||window.event;
    switch(event.keyCode)
    {
        case 37:case 65:FE.vx=-15;break;
        case 39:case 68: FE.vx=15;break;
        case 32:FE.vx=0;break;
        case 97:cf1();break;
        case 98:cf2();break;
        case 99:cf3();break;
        case 100:cf4();break;
        case 101:
            {
                if(wajieNum>0)
                {
                    cf5();
                }
                break;
            }
    }
    return false;
}

document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);

//测试---------------------------------------

var num=document.createElement("h1");
document.getElementById("main").appendChild(num);
num.style.position="absolute";
num.style.top="25%";
num.style.left="20%";
num.style.visibility="hidden";
// var num2=document.createElement("h1");
// document.getElementById("main").appendChild(num2);
// var num3=document.createElement("h1");
// document.getElementById("main").appendChild(num3);
// num2.innerHTML= document.body.clientWidth;
// num3.innerHTML=theHeight;
//类及其生成-------------------------------

class Bumper
{
    constructor(entity,vx,vy,hp,type)
    {
        this.entity=entity;
        this.vx=vx;
        this.vy=vy;
        this.hp=hp;
        this.type=type;
    }
}

var FE=new Bumper(creFe(),0,0,100,'fe');//示例要在类之后
var thex;
document.addEventListener('touchmove', touchStartFunc, false);
function touchStartFunc(evt) {
    try {
        //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        var touch = evt.touches[0]; //获取第一个触点
        thex = Number(touch.pageX); //页面触点X坐标
        //记录触点初始位置
    } catch (e) {
        alert('touchSatrtFunc：' + e.message);
    }
}

var feMoveIntervel=setInterval(femove,10);
function femove()
{
    if(thex<theWidth-60)
        {
            FE.entity.style.left=thex+"px";
        }
}





function creEnt(x,y,src)
{
    var newEnt=document.createElement("div");
    var img=document.createElement("img");
    newEnt.appendChild(img);
    img.src=src;
    newEnt.style.position="absolute";
    newEnt.style.left=x+"px";
    newEnt.style.top=y+"px";

    document.getElementById("main").appendChild(newEnt);//很重要
    return newEnt;
}

function creFe()//只负责制造FE entity
{
    var fe=document.createElement("div");
    var img=document.createElement("img");
    fe.appendChild(img);

    img.src='pic/fe.jpg';
    fe.style.position="absolute";
    fe.style.left="200px";
    fe.style.bottom="0px";
    img.style.width=img.style.height="60px";
    document.getElementById("main").appendChild(fe);//很重要
    return fe;
}

function creBum(x,y,src,vx,vy,hp,type)
{
    var theBumper=new Bumper(creEnt(x,y,src),vx,vy,hp,type);
    return theBumper;
}

//CreXueMei--------------------------------------------------------------------------太好玩了！
function xuemeiCre(total,frequency,speed,way)
{
    if(way=="random")
    {
        var xmCreTimer=setInterval(randomxmCre,frequency);
        var now=0;
        function randomxmCre()
        {
            if(now>=total)
            {
                clearInterval(xmCreTimer);
            }
            else
            {
                var randx=Math.floor((theWidth-60)*Math.random());
                var newxm=creBum(randx,0,"pic/g44.png",0,speed,10,"xm");
                sisterlist.push(newxm);
                now+=1;
            }
        }
    }
    else if(way=="queue")
    {
        var xmCreTimer=setInterval(queuexmCre,frequency);
        var randx=Math.floor((theWidth-60)*Math.random());
        var now=0;
        function queuexmCre()
        {
            if(now>=total)
            {
                clearInterval(xmCreTimer);
            }
            else
            {
                var newxm=creBum(randx,0,"pic/g44.png",0,speed,10,"xm");
                sisterlist.push(newxm);
                now+=1;
            }
        }
    }
    else if(way=="raid")
    {
        var randx=Math.floor((theWidth-60)*Math.random());
        var warnjpg=creBum(randx,0,"pic/warning.png",0,0,0,"jpg");
        var time=0;
        var warnTimer=setInterval(fwarn,200);
        var time=0;
        function fwarn()
        {
            if(time>=3000)
            {
                clearInterval(warnTimer);
                warnjpg.entity.remove();
                //xuemeiCre(total,frequency,speed,"queue");
                var xmCreTimer=setInterval(queuexmCre,frequency);
                var now=0;
                function queuexmCre()
                {
                    if(now>=total)
                    {
                        clearInterval(xmCreTimer);
                    }
                    else
                    {
                        var newxm=creBum(randx,0,"pic/g44.png",0,speed,10,"xm");
                        sisterlist.push(newxm);
                        now+=1;
                    }
                }
                
            }
            else
            {
                time+=200;
                if(time%400==0)
                {
                    warnjpg.entity.style.display="none";
                }
                else
                {
                    warnjpg.entity.style.display="inline";
                }
            }
        }
    }
    else if(way=="shepi")
    {
        var xmCreTimer=setInterval(randomxmCre,frequency);
        var now=0;
        function randomxmCre()
        {
            if(now>=total)
            {
                clearInterval(xmCreTimer);
            }
            else
            {
                var randx=Math.floor((theWidth-60)*Math.random());
                var randvx=Math.floor(400*Math.random()-200);
                var newxm=creBum(randx,0,"pic/g44.png",randvx,speed,10,"spxm");
                sisterlist.push(newxm);
                now+=1;
            }
        }
    }
}



//正式的生成学妹————————————————————————————————————————————————————————————————————————
var startTimer=setInterval(start,1000);
xuemeiCre(30,20,40,"raid");
xuemeiCre(25,400,5,"random");
function start()
{
    var bulletkiller;
    switch(clock)
    {
        case 5:
            {
                xuemeiCre(60,250,20,"shepi");
                var stage1=setInterval(s1,3000);
                function s1()
                {
                    if(clock>=20)
                    {
                        clearInterval(stage1);
                    }
                    else
                    {
                        xuemeiCre(30,20,40,"raid");
                    }
                }
                break;
            }
        case 24://24-28s
            {
                xuemeiCre(160,25,10,"random");
                break;
            }
        case 28://28-50s
            {
                num.style.visibility="visible";
                num.innerHTML="警告：子弹价格上涨 请节约使用";
                bulletkiller=setInterval(function(){
                    if(clock>=50)
                    {
                        clearInterval(bulletkiller);
                    }
                    else
                    {
                        bulletNum-=5;
                    }
                },100);
                xuemeiCre(88,250,10,"random");
                break;
            }
        case 36:
            {
                num.style.visibility="hidden";
                break;
            }
        case 50:
            {
                num.style.visibility="visible";
                num.innerHTML="注意：子弹价格回落 请放心使用";
                break;
            }
        case 53://53-80s
            {
                num.style.visibility="hidden";
                xuemeiCre(180,250,10,"shepi");
                var stage2=setInterval(function(){
                    if(clock>92)
                    {
                        clearInterval(stage2);
                    }
                    else
                    {
                        xuemeiCre(30,20,40,"raid");
                    }
                },5000);
                break;
            }
        case 100:
            {
                alert("不愧是你！");
                localStorage.setItem("score",String(score));
                window.location="win.html";
            }
    }
}
//xuemeiCre(1000,200,5,"shepi");
// xuemeiCre(1000,500,10,"shepi");
//xuemeiCre(30,20,40,"raid");


//左右移动-------------------
// var bleft=document.getElementById("left");
// var bright=document.getElementById("right");
// var bstop=document.getElementById("stop");
// bleft.onmousedown=goleft;
// bright.onmousedown=goright;
// bstop.onmousedown=gostop;
// function goleft()
// {
//     FE.vx=-8;
// }
// function goright()
// {
//     FE.vx=8;
// }
// function gostop()
// {
//     FE.vx=0;
// }

//碰撞检测--------------------------------------
var bxBumpTimer=setInterval(bxBump,20);
function bxBump()
{
    var xlen=sisterlist.length;
    var blen=movelist.length;
    var b,x;
    for(b=0;b<=blen-1;b++)
    {
        for(x=0;x<=xlen-1;x++)
        {
            if(isBump(sisterlist[x],movelist[b]))
            {
                movelist[b].entity.remove();
                movelist.splice(b,1);
                if(b>=1)b--;
                sisterlist[x].entity.remove();
                sisterlist.splice(x,1);
                if(x>=1)x--;
                bulletNum+=2;
                score++;
                FE.hp+=1;
            }
        }
    }

}

var feBumpTimer=setInterval(feBump,10);
function feBump()
{
    var len=sisterlist.length;
    var i;
    for(i=0;i<=len-1;i++)
    {
        if(isBump(FE,sisterlist[i]))
        {
            FE.hp-=20;
            sisterlist[i].entity.remove();
            sisterlist.splice(i,1);
            if(i>=1)i--;
            
        }
    }
    if(FE.hp<0)
        {
            //alert("GG!");
            clearInterval(feBumpTimer);
            document.body.style.visibility="hidden";
            clearInterval(startTimer);
            clearInterval(clockTimer);
            clearInterval(feMoveIntervel);
            clearInterval(bxBumpTimer);
            clearInterval(moveTimer);
            clearInterval(xmMoveTimer);
            var j;
            for(j=1;j<=5;j++)
            {
                clearInterval(firelist[j]);
            }
            clearInterval(spTimer);
            clearInterval(wajieCDTimer);
            clearInterval(killTimer);
            clearInterval(xmKillTimer);
            window.location="GG.html";
        }
    title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
}


function isBump(a,b)
{
    var t1 = a.entity.offsetTop;
    var l1 = a.entity.offsetLeft;
    var r1 = a.entity.offsetLeft + a.entity.offsetWidth;
    var b1 = a.entity.offsetTop + a.entity.offsetHeight;
    var t2 = b.entity.offsetTop;
    var l2 = b.entity.offsetLeft;
    var r2 = b.entity.offsetLeft + b.entity.offsetWidth;
    var b2 = b.entity.offsetTop + b.entity.offsetHeight;
    if(b1<t2 || l1>r2 || t1>b2 || r1<l2)
    {
        return false;
    }
    else
    {
        return true;
    }
}



//Timer is here-------------------------------------------------------------
var moveTimer=setInterval(moveJudge,10);
function moveJudge()
{
    var len=movelist.length;
    //fe运动
    var feNext=Number(FE.entity.offsetLeft)+FE.vx;

    if(feNext>=0&&feNext<=theWidth-60)
    {
        FE.entity.style.left=(Number(FE.entity.offsetLeft)+FE.vx)+"px";
    }

    var i;
    for(i=0;i<=len-1;i++)//fe之后的Bumper运动
    {
        //var l=movelist[i].entity.style.left.indexOf("px");
        movelist[i].entity.style.left=(Number(movelist[i].entity.offsetLeft)+movelist[i].vx)+"px";
        movelist[i].entity.style.top=(Number(movelist[i].entity.offsetTop)+movelist[i].vy)+"px";
    }
}
var thetime=0;
var xmMoveTimer=setInterval(xmMoveJudge,20);
function xmMoveJudge()
{
    thetime++;
    var len=sisterlist.length;
    var i;
    for(i=0;i<=len-1;i++)
    {
        var nextx=Number(sisterlist[i].entity.offsetLeft)+sisterlist[i].vx;
        if((nextx>=0&&nextx<Number(FE.entity.offsetLeft)-60)||(nextx>Number(FE.entity.offsetLeft)+60&&nextx<theWidth-60))
        {
            sisterlist[i].entity.style.left=(Number(sisterlist[i].entity.offsetLeft)+sisterlist[i].vx)+"px";
        }
        sisterlist[i].entity.style.top=(Number(sisterlist[i].entity.offsetTop)+sisterlist[i].vy)+"px";
        if(sisterlist[i].type=="spxm"&&thetime%5==0)
        {
            sisterlist[i].vx=Math.floor(400*Math.random()-200);
        }
    }
}
//Fire----------------------------------
var fireTimer1,fireTimer2,fireTimer3,fireTimer4,fireTimer5;
var which=1;
var firelist=[which,fireTimer1,fireTimer2,fireTimer3,fireTimer4,fireTimer5];
firelist[1]=setInterval(fire,200);

function fire()
{
    title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
    if(bulletNum>0)
    {
        bulletNum-=1;
        var fex=Number(FE.entity.offsetLeft); 
        var fey=Number(FE.entity.offsetTop);
        var bullet=creBum(fex,fey-50,"pic/bullet.png",0,-10,10,'bullet');
        movelist.push(bullet);
        
    }
}
function addbulletfire()
{
    title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
    if(bulletNum>0)
    {
        bulletNum+=10;
        var fex=Number(FE.entity.offsetLeft); 
        var fey=Number(FE.entity.offsetTop);
        var bullet=creBum(fex,fey-50,"pic/bullet.png",0,-10,10,'bullet');
        movelist.push(bullet);
        
    }
}
function fire3()
{
    title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
    if(bulletNum>0)
    {
        bulletNum-=3;
        var fex=Number(FE.entity.offsetLeft);
        var fey=Number(FE.entity.offsetTop);
        var bullet=creBum(fex,fey-50,"pic/bullet.png",0,-10,10,'bullet');
        var bullet2=creBum(fex,fey-50,"pic/bullet.png",2,-10,10,'bullet');
        var bullet3=creBum(fex,fey-50,"pic/bullet.png",-2,-10,10,'bullet');
        movelist.push(bullet,bullet2,bullet3);
        
    }
}

function firesp()
{
    title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
    if(bulletNum>0&&FE.hp>0)
    {
        bulletNum-=1;
        FE.hp-=1;
        var fex=Number(FE.entity.offsetLeft);
        var fey=Number(FE.entity.offsetTop);
        var bullet=creBum(fex,fey-50,"pic/bullet.png",-10,-2,10,'bullet');
        splist.push(bullet);
        
    }
}

function changeFire(n)
{
    if(wajieing==0)
    {
        if(firelist[0]!=0)clearInterval(firelist[firelist[0]]);
        firelist[0]=n;
        switch(n)
            {
                case 1:firelist[1]=setInterval(addbulletfire,200);break;
                case 2:firelist[2]=setInterval(fire,40);break;
                case 3:firelist[3]=setInterval(fire3,100);break;
                case 4:firelist[4]=setInterval(firesp,100);break;
                case 5:firelist[5]=setInterval(Wajieshexian,20);break;
            }
    }
    
}


var bs1=document.getElementById("s1");
var bs3=document.getElementById("s3");
var bSanCha=document.getElementById("sancha");
var bShepi=document.getElementById("shepi");
var bWajie=document.getElementById("wajie");

bs1.onmousedown=cf1;
bs3.onmousedown=cf2;
bSanCha.onmousedown=cf3;
bShepi.onmousedown=cf4;
bWajie.onmousedown=cf5;
//注意 s1应该是最慢的射速 所以得对应最慢的“3档”

function cf1(){changeFire(1);}
function cf2(){changeFire(2);}
function cf3(){changeFire(3);}
function cf4(){changeFire(4);}
function cf5()
{   
    if(wajieing==0)
    {
        //hello();
        //wajiePicdiv=document.createElement("div");
        wajiePic=document.createElement("img");
        wajiePic.src="pic/wjsx.png";
        wajiePic.style.width=60+"px";
        wajiePic.style.height=theHeight-60+"px";
        wajiePic.style.position="absolute";
        wajiePic.style.left=Number(FE.entity.offsetLeft)+"px";
        wajiePic.style.bottom=0+"px";
        //document.getElementById("main").appendChild("wajiePic");我是傻逼
        document.getElementById("main").appendChild(wajiePic);
        changeFire(5);
        wajieTime=0;
        wajieing=1;
        tiao=document.getElementById('content');
        var outside=document.getElementById('outside');
        outside.style.position="absolute";
        tiaolen=theWidth-120;
        outside.style.width=theWidth-120+"px";
        outside.style.height=20+"px";
        outside.style.left=60+"px";
        outside.style.bottom=80+"px";
        outside.style.border="1px solid #ccc";
        outside.style.visibility="visible";
        tiao.style.width=outside.style.width;
        tiao.style.background="#1E90FF";
        tiao.style.position="absolute";
        sigezi=document.createElement("h6");
        document.getElementById("main").appendChild(sigezi);
        sigezi.innerHTML="瓦解射线";
        sigezi.style.display="inline-block";
        sigezi.style.position="absolute";
        sigezi.style.bottom="60px";
        sigezi.style.left=theWidth/2-20+"px";
        if(wajieNum>0)wajieNum-=1;
        wajieNumshow.innerHTML=wajieNum;
        if(wajieNum==0)
        {
            bWajie.style.visibility="hidden";
            wajie0.style.visibility="visible";
        }
        
    }

}
// var addTimer=setInterval(addBullet,100);

// function addBullet()
// {
//     bulletNum+=1;
//     title.innerHTML=`Bullet:${bulletNum} HP:${FE.hp}`;
// }

//sp mode——————————————————————————————————————————————————————————————————————————————————————————————————————————

var spTimer=setInterval(spFun,10);
function spFun()
{
    var i,i2;
    var len=splist.length;
    var len2=sisterlist.length;
    //num.innerHTML=len;
    for(i=0;i<=len;i++)
    {
        if(splist[i])
        {
            if(splist[i].type=="bullet")
            {
                if(Number(splist[i].entity.offsetTop)<0)
                {
                    splist[i].entity.remove();
                    splist.splice(i,1);
                    i--;
                }

                splist[i].entity.style.left=(Number(splist[i].entity.offsetLeft)+splist[i].vx)+"px";
                splist[i].entity.style.top=(Number(splist[i].entity.offsetTop)+splist[i].vy)+"px";

                if(Number(splist[i].entity.offsetLeft)<0)
                {
                    splist[i].vx=10;
                }
                if(Number(splist[i].entity.offsetLeft)>theWidth-60)
                {
                    splist[i].vx=-10;
                }
                for(i2=0;i2<=len2-1;i2++)
                {
                    if(isBump(sisterlist[i2],splist[i]))
                    {
                        splist[i].entity.remove();
                        splist.splice(i,1);
                        if(i>=1)i--;
                        sisterlist[i2].entity.remove();
                        sisterlist.splice(i2,1);
                        if(i2>=1)i2--;
                        bulletNum+=2;
                        score++;
                        FE.hp+=1;
                    }
                }
            }
        }
    }
}


//瓦解射线！——————————————————————————————————————————————————————————————————————

function Wajieshexian()
{
    wajieTime+=20;
    if(wajieTime>=3000)
    {
        clearInterval(firelist[5]);
        wajiePic.remove();
        wajieing=0;
        changeFire(2);
        outside.style.visibility="hidden";
        sigezi.remove();
    }
    else
    {
        tiaolen-=(theWidth-120)/150;
        tiao.style.width=tiaolen+"px";
        wajiePic.style.left=Number(FE.entity.offsetLeft)+"px";
        var len=sisterlist.length;
        var i;
        for(i=0;i<=len-1;i++)
        {
            var sisx=sisterlist[i].entity.offsetLeft;
            var fex=Number(FE.entity.offsetLeft);
            if(sisx>=fex-60&&sisx<=fex+60)
            {
                sisterlist[i].entity.remove();
                sisterlist.splice(i,1);
                if(i>=1)i--;
                bulletNum+=2;
                score++;
                FE.hp+=1;
            }
        }
    }
}

var wajie0=document.getElementById("wajie0");
var cdwajie=0;
bWajie.style.visibility="hidden";
var wajieCDTimer=setInterval(wajieCD,1000);
function wajieCD()
{
    cdwajie+=1;
    wajieCDshow.innerHTML=15-cdwajie%15;
    if(wajieNum==0)
    {
        bWajie.style.visibility="hidden";
        wajie0.style.visibility="visible";
    }
    else
    {
        wajie0.style.visibility="hidden";
        bWajie.style.visibility="visible";
    }
    if(cdwajie%15==0)wajieNum+=1;
    if(wajieNum>0)
    {
        wajie0.style.visibility="hidden";
        bWajie.style.visibility="visible";
    }
    
    wajieNumshow.innerHTML=wajieNum;
}

//移除无用元素--------------------------------------------------------------

var killTimer=setInterval(kill,10);
function kill()
{
    var i;
    var len=movelist.length;
    //num.innerHTML=len;
    for(i=0;i<=len;i++)//我改了这里啊啊啊 要是出bug来这——————————————————————————————————————————————————————————————————————————————————————————————————————
    {
        if(movelist[i])
        {
            if(movelist[i].type=="bullet")
            {
                if(Number(movelist[i].entity.offsetTop)<0||Number(movelist[i].entity.offsetLeft)<10||Number(movelist[i].entity.offsetLeft)>theWidth-60)
                {
                    movelist[i].entity.remove();
                    movelist.splice(i,1);
                    i--;
                }
            }
        }
    }
}



var xmKillTimer=setInterval(xmKill,10);
function xmKill()
{
        var xmlen=sisterlist.length;
        for(i=0;i<=xmlen;i++)
        {
            if(sisterlist[i])
            {
                if(sisterlist[i].type=="xm"||sisterlist[i].type=="spxm")
                {
                    if(Number(sisterlist[i].entity.offsetTop)>theHeight-60)
                    {
                        bulletNum-=5;
                        FE.hp-=5;
                        sisterlist[i].entity.remove();
                        sisterlist.splice(i,1);
                        i--;
                    }
                }
            }
        }
}

function hello()
{
    alert("Hello!");
}