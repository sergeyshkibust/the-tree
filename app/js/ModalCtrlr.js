define('ModalCtrlr', function() {
    "use strict";

    function ModalCtrlr() {
        console.log('ModalCtrlr loaded');

        var confirmDialog = document.querySelector('.confirm');
        var promptDialog = document.querySelector('.prompt');
        var that = this;

        if (promptDialog) {
            promptDialog.querySelector('#pok').addEventListener('click', function() {
                promptDialog.style.display = 'none';
                that.callback(promptDialog.querySelector('#text').value);
            });
            promptDialog.querySelector('#pcancel').addEventListener('click', function() {
                promptDialog.style.display = 'none';
            });
        }

        if (confirmDialog) {
            confirmDialog.querySelector('#cok').addEventListener('click', function() {
                confirmDialog.style.display = 'none';
                that.callback();
            });
            confirmDialog.querySelector('#ccancel').addEventListener('click', function() {
                confirmDialog.style.display = 'none';
            });
        }
    };


    ModalCtrlr.prototype.callback = null;

    ModalCtrlr.prototype.confirm = function(callback) {
        var confirmDialog = document.querySelector('.confirm');
        confirmDialog.style.display = 'block';
        this.callback = callback;
    }

    ModalCtrlr.prototype.prompt = function(callback) {
        var promptDialog = document.querySelector('.prompt');
        promptDialog.style.display = 'block';
        this.callback = callback;
    }

    return ModalCtrlr;
});