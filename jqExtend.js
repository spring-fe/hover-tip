 //注意的一点就是必须预先准备好一个容器
    $.hoverPopup = function(opts){

        var timer;

        function onIn(self, opts){
            var pos = $(self).offset(), x, y;
            var w = $(self).width(),
                h = $(self).height();

            timer && clearTimeout(timer);
            opts.onIn && opts.onIn(self);
            if (opts.dir == 'up') {

                x = pos.left - w;
                y = pos.top - h;


            } else if (opts.dir == 'right') {

                x = pos.left + w;
                y = pos.top;


            } else if (opts.dir == 'left') {

                x = pos.left - $(opts.popupEl).width();
                y = pos.top;

            } else {
                //down 或者不传
                x = pos.left;
                y = pos.top + h;
            }

            if (opts.drift) {
                if (opts.drift.x) {
                    x = x + opts.drift.x;
                }
                if (opts.drift.y) {
                    y = y + opts.drift.y;
                }
            }

            $(opts.popupEl).css({ left: x, top: y });
            $(opts.popupEl).show();
        }
        var timeout;
        $(document.body)
            .on('mouseenter', opts.hoverEl, function(){
                var self = this;
                if(opts.delay) {
                    timeout = setTimeout(function(){ onIn(self, opts) }, opts.delay);
                } else {
                    onIn(this, opts);
                }
            })
            .on('mouseleave', opts.hoverEl ,function(){
                clearTimeout(timeout);
                //out
                timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    opts.onOut && opts.onOut(that);
                    $(opts.popupEl).hide();
                }, 100);
            });

        $(opts.popupEl).hover(
            function(e){
                //in
                timer && clearTimeout(timer);
            },
            function(e){
                var that = this;
                timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    opts.onOut && opts.onOut(that);
                    $(opts.popupEl).hide();
                }, 100);
            }
        );
    };
