$(function () {
    //定义变量用于储存用户登录信息id值
    var userId;    
    //spa 单页
    window.onhashchange = show;
    window.onload = show;
    //定义函数
    function show() {
        if (!location.hash) {
            location.hash = '#/';
        }


        //获取hash值 并处理成数组  目的：数组便于提取 字段
        var hash = window.location.hash.split('/');
        //定义路由
        var routes = [
            { path: '/', component: 'index.html' },
            { path: '/invest', component: 'invest.html' ,
                children:[
                    {path:"/details",component:"invest/details.html"}
                ]
            },
            { path: '/borrow', component: 'borrow.html' },
            {path: '/personal', component: 'personal.html',
                children: [
                    { path: '/borrowObj', component: 'personal/borrowObj.html' },
                    { path: '/accountIn', component: 'personal/accountIn.html' },
                    { path: '/acountMsg', component: 'personal/acountMsg.html' },
                    { path: '/verify', component: 'personal/verify.html' },
                    { path: '/acountFlow', component: 'personal/acountFlow.html' },
                    { path: '/rechargeList', component: 'personal/rechargeList.html' },
                    { path: '/data', component: 'personal/data.html' },
                    { path: '/investAndborrow', component: 'personal/investAndborrow.html' },
                ]
            },
            { path: '/help', component: 'help.html' },
            { path: '/about', component: 'about.html' ,
                children:[
                    {path:'/comIntro',component:'about/comIntro.html'},
                    {path:'/rongyu',component:'about/rongyu.html'},
                    {path:'/falc',component:'about/falc.html'},
                ]
        },
            { path: '/logIn', component: 'logIn.html' },
        ]

        //建立联系发送请求
        //遍历路由数组对象  取得每一组对象进行处理
        $.each(routes, function (i, v) {
            if ("/" + hash[1] === v.path) {
                $.get('src/components/' + v.component, function (data) {
                    $('#main').html(data);
                        $('.nav a').each(function(i,v){
                            if($(v).attr('href')==='#/'+hash[1]){
                                $(v).closest('li').addClass('active');
                            }else{
                                $(v).closest('li').removeClass('active');
                            }
                        }) 
                    //如果子路由存在 则进行子路由操作
                    if (v.children) {
                        //遍历
                        //进入默认为accoun页面
                        if (hash[1]==='personal'&&!hash[2]) {
                            hash[2] = 'acountMsg'
                        }
                        
                        if (hash[1]==='about'&&!hash[2]) {
                            hash[2] = 'comIntro'
                        }
                        
                        $.each(v.children, function (j, k) {
                            
                            if ('/' + hash[2] === k.path) {
                                $.get('src/components/' + k.component, function (res) {
                                    
                                    if(hash[1]==='personal'){
                                        $('#perMsg').html(res);
                                    }
                                    else if(hash[1]==='about'){
                                        $('#mainRight').html(res);            
                                    }else if(hash[1]==='invest'){
                                        $('#main').html(res);  
                                       
                                    }
                                    $('.perLeftMenu a.can').each(function (i2, v2) {
                                        if ($(v2).attr('href') === '#/' + hash[1] + '/' + hash[2]) {
                                            $(v2).closest('li').addClass('active');
                                        } else {
                                            $(v2).closest('li').removeClass('active');
                                        }
                                    })

                                })
                            }
                        })
                    }
                })

            }
        })


    }






































































    // function show(){
    //     var hash = window.location.hash;
    //     // console.log(hash)
    //     switch (hash){
    //         case "#/":var file = "index";
    //         break;
    //         case "#/invest":var file = "invest";
    //         break;
    //         case "#/borrow":var file = "borrow";
    //         break;
    //         case "#/personal":var file = "personal";
    //         break;
    //         case "#/help":var file = "help";
    //         break;
    //         case "#/about":var file = "about";
    //         break;
    //         case "#/logIn":var file = "logIn";
    //         break;
    //         case "#/personal/acountMsg":var file = "personal/acountMsg";
    //         break;
    //         case "#/personal/borrowObj":var file = "personal/borrowObj";
    //         break;
    //         case "#/personal/verify":var file = 
    //         "personal/verify";
    //         break;
    //         case "#/personal/acountFlow":var file = "personal/acountFlow";
    //         break;
    //         case "#/personal/rechargeList":var file = "personal/rechargeList";
    //         break;
    //         case "#/personal/data":var file = "personal/data";
    //         break;
    //         default:var file = "index"
    //     }

    //     if(file.indexOf('/')!=-1){
    //         var fileBegin = file.substr(0,file.indexOf('/'));
    //     }
    //     $.get(
    //         'src/compoents/'+file+'.html',
    //         function (des) {
    //             //个人中心渲染
    //             if(fileBegin==="personal"){ 
    //                 //先渲染main 再发送请求渲染局部
    //                 $.get('src/compoents/personal.html',function(data){
    //                     $('#main').html(data);
    //                     $('#perMsg').html(des);
    //                     //切换个人中心菜单选中样式  由于ajax异步请求 这一步不能放在外面
    //                     $('.perLeftMenu a.can').each(function(i,v){
    //                         if($(v).attr('href')===hash){
    //                             $(v).closest('li').addClass('active');
    //                         }else{
    //                             $(v).closest('li').removeClass('active');
    //                         }
    //                     })
    //                 })       
    //             }else{
    //                 //如果没有点击页面中的hash 则渲染main
    //                 $('#main').html(des);
    //             }   
    //     });
    //     //切换菜单选中样式
    //     $('.nav a').each(function(i,v){
    //         if($(v).attr('href')===hash){
    //             $(v).closest('li').addClass('active');
    //         }else{
    //             $(v).closest('li').removeClass('active');
    //         }
    //     }) 
    // }






})



