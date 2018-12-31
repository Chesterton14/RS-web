$(function () {
    banner();
    intMobileTabs();
});
var banner = function () {
    //获取后台数据
    var getData = function (callback) {
        //判断是否已加载过数据
        if (window.data) {
            //以加载过数据，直接调用
            callback && callback(window.data);
        } else {
            //没有加载数据，重新加载
            $.ajax({
                type: 'GET',
                url: 'js/data.json',
                dataType: 'json',
                success: function (data) {
                    //console.log(data);
                    window.data = data;
                    callback && callback(window.data);
                }
            })
        }
    };
    var rander = function () {
        //把渲染函数传入getData中判断是否以加载过数据
        getData(function (data) {
            //获取屏幕宽度，用于判断是否移动端
            var isMobile = $(window).width() < 768;
            //console.log(isMobile);
            //使用模板引擎
            //template('id', 数据)
            var pointsTem = template('pointsTem', {list: data});
            var imgsTem = template('imgsTem', {list: data, isMobile: isMobile});
            //console.log(pointsTem);
            //console.log(imgsTem);
            //结果模板引擎得到html字符串
            //使用html字符串渲染页面
            $('.carousel-indicators').html(pointsTem);
            $('.carousel-inner').html(imgsTem);
        })
    };
    //执行渲染函数
    rander();
    //监听屏幕大小变化
    $(window).on('resize', function () {
        //当屏幕大小发生改变，重新执行渲染函数
        rander();
    });
    //设置移动端手势切换轮播图
    var startX = 0;//定义触摸点开始位置
    var distanceX = 0;//定义滑动距离
    var isMove = false;//定义是否滑动
    $('.wjs-banner').on('touchstart', function (e) {
        //给开始点赋值
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        //给移动后的点赋值
        var moveX = e.originalEvent.touches[0].clientX;
        //计算出移动的距离
        distanceX = moveX - startX;
        //发生滑动，赋值true
        isMove = true;
    }).on('touchend', function (e) {
        //触摸结束，判断是否发生滑动且滑动距离大于50px
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                //判断手势为左滑
                //console.log("左滑prve");
                //调用bootstrap切换上一张api
                $('.carousel').carousel('prev');
            } else {
                //判断手势为右滑
                //console.log("右滑next");
                //调用bootstrap切换下一张api
                $('.carousel').carousel('next');
            }
        }
        //重置所有参数
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
};
var intMobileTabs = function () {
    /*1 tab栏设置宽度，使其在移动端一行显示*/
    var $narTab = $('.wjs-product .nav-tabs');
    var width = 0;
    $narTab.find('li').each(function () {
        width += $(this).outerWidth(true);
    });
    $narTab.width(width);
    /*2 使用iscroll插件，能在移动端滑动*/
    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click: true
    })

};