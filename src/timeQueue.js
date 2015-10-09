/**
 * timeQueue.js v0.3
 * https://github.com/TevinLi/timeQueue
 *
 * Copyright 2015, Tevin Li
 * Released under the MIT license.
 */

(function (window) {

    'use strict';

    //������
    var Q = function (pause) {
        //�ж�
        this.que = [];
        //�Ƿ���ͣ��Ĭ�ϲ���ͣ
        this.atPause = !!pause;
        //�Ƿ����ڲ���
        this.atPlay = false;
    };

    //���ִ���жӳ�Ա
    Q.prototype.delay = function (time, callback) {
        this.que.push([time, callback]);
        this.run();
        return this;
    };

    //����ӳ��жӲ���ֹ��ʱ
    Q.prototype.clean = function () {
        this.que = [];
        this.current = [0];
        this.atPlay = false;
        return this;
    };

    //��ִͣ���ж�
    Q.prototype.pause = function () {
        this.atPause = true;
        return this;
    };

    //����ͣ�ָ�
    Q.prototype.continue = function () {
        if (this.atPause == true) {
            this.atPause = false;
            this.step();
        }
        return this;
    };

    //ִ�ж���
    Q.prototype.step = function () {
        var that = this;
        if (this.que.length > 0 && !this.atPause) {
            this.atPlay = true;
            this.current = this.que.shift();
            setTimeout(function () {
                that.current[1] && that.current[1]();
                that.step();
            }, this.current[0]);
        } else {
            this.atPlay = false;
        }
        return this;
    };

    //����
    Q.prototype.run = function(){
        if (!this.atPlay && !this.atPause) {
            this.atPlay = true;
            this.step();
        }
        return this;
    };

    return window.TimeQueue = Q

})(window);