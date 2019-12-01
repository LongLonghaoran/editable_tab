// 抽象tab类
(function(window){
    that = null
    class Tab {
        constructor(id){
            that = this;
            this.main = document.querySelector(id);
            this.lis = this.main.getElementsByTagName('li')
            this.sections = this.main.getElementsByTagName('section')
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('.fisrstnav ul:nth-of-type(1)');
            this.fsection = this.main.querySelector('.tabscon');
            this.init()
        }
    
        init(){
            this.add.onclick = this.addTab;
            // 初始化，让相关的元素绑定事件
            for(var i = 0; i < this.lis.length; i++){
                this.lis[i].dataset.index = i;
                this.sections[i].dataset.index = i;
                this.lis[i].onclick = this.toggleTab;
                this.lis[i].querySelector('.icon-guanbi').onclick = that.removeTab;
                this.lis[i].querySelector('span:nth-of-type(1)').ondblclick = that.editTab;
                this.sections[i].ondblclick = that.editTab;
            }
        }
        toggleTab(){
            that.clearClass();
            // 始终要记住,this指代的永远是当前调用该方法的那个对象，上面将该方法作为了li的点击事件的回调函数，所以这里this将会指代触发事件的那个li
            this.classList.add('liactive');
            let sections = [];
            for(let i = 0; i<that.sections.length;i++){
                sections.push(that.sections[i]);
            }
            sections.find(item => item.dataset.index === this.dataset.index).classList.add('conactive');
        }
        clearClass(){
            for(var i = 0; i < this.lis.length; i++){
                this.lis[i].classList.remove('liactive');
                this.sections[i].classList.remove('conactive');
            }
        }
        addTab(){
            var random = Math.random();
            that.clearClass();
            // 1.创建li元素和section
            var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
            var section = `<section class="conactive">测试${random}</section>`
    
            // 2.追加
            that.ul.insertAdjacentHTML('beforeend', li);
            that.fsection.insertAdjacentHTML('beforeend', section);
            that.init();
        }
        removeTab(e){
            e.stopPropagation();
            // 这个时候this指代关闭按钮
            this.parentElement.remove();
            let sections = [];
            for(let i = 0; i<that.sections.length;i++){
                sections.push(that.sections[i]);
            }
            sections.find(item => item.dataset.index === this.parentElement.dataset.index).remove();
            if(document.querySelector('.liactive')) return;
            that.lis[that.lis.length-1] && that.lis[that.lis.length-1].click();
        }
        editTab(){
            // 双击后清除选定的文字
            var str = this.innerHTML;
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty()
            this.innerHTML = `<input type="text" />`
            this.children[0].value = str;
            // 让文本框文字处于选定状态
            this.children[0].select();
            this.children[0].onkeyup = function(e){
                this.onblur = null;
                if(e.keyCode === 13){
                    this.parentElement.innerHTML = this.value;
                    this.onblur = function(){
                        this.parentElement.innerHTML = str;
                    }
                }
            }
            this.children[0].onblur = function(){
                this.parentElement.innerHTML = str;
            }
        }
    }
    
    let tab = new Tab('#tab');
})(window)