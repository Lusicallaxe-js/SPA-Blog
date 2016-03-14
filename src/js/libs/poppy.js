var poppy = (function () {
    var CLOSE_BUTTON_TEXT = '×',
        POSITIONS = {
            'topLeft': 'poppy-top-left',
            'topRight': 'poppy-top-right',
            'bottomLeft': 'poppy-bottom-left',
            'bottomRight': 'poppy-bottom-right'
        },
        POPUP_TYPES = {
            'error': 'poppy-error',
            'info': 'poppy-info',
            'success': 'poppy-success',
            'warning': 'poppy-warning'
        };

    var createPopupView = function (popup) {
        var popupData = popup.popupData,
            positionClass = POSITIONS[popupData.position],
            typeClass = POPUP_TYPES[popupData.type],
            autoHide = popupData.autoHide || false,
            timeout = popupData.timeout,
            close = popupData.closeButton || false,
            title = popupData.title,
            message = popupData.message,
            callback = popupData.callback;

        var containerNode = document.createElement('div'),
            popupNode = document.createElement('div'),
            button = document.createElement('button'),
            titleNode = document.createElement('div'),
            messageNode = document.createElement('div');

        attachClasses();

        if (close === true) {
            button.innerText = CLOSE_BUTTON_TEXT;
            button.setAttribute('type', 'button');
            button.className += "poppy-close-button";
            popupNode.appendChild(button);
        }

        containerNode.appendChild(popupNode);
        popupNode.appendChild(titleNode);
        popupNode.appendChild(messageNode);

        return containerNode;

        function attachClasses() {
            containerNode.className += positionClass + ' poppy-container';
            popupNode.className += typeClass;
            titleNode.className += "poppy-title";
            titleNode.innerText = title;
            messageNode.className += "poppy-message";
            messageNode.innerText = message;
        }
    };

    Function.prototype.extends = function (parent) {
        "use strict";
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };
    var data = data || {};

    data = (function () {
        "use strict";
        var Popup = (function () {
                function Popup(title, message, type, position, autoHide, timeOut, closeButton, callback) {
                    this.popupData = {
                        title: title,
                        message: message,
                        type: type,
                        position: position,
                        autoHide: autoHide,
                        timeOut: timeOut,
                        closeButton: closeButton,
                        callback: callback
                    };
                }

                return Popup;
            }()),

            SuccessPop = (function () {
                function SuccessPop(title, message) {
                    Popup.call(this, title, message, 'success', 'bottomLeft', true, 3000);
                }

                SuccessPop.extends(Popup);
                return SuccessPop;
            }()),

            InfoPop = (function () {
                function InfoPop(title, message) {
                    Popup.call(this, title, message, 'info', 'topLeft', true, 1000, true);
                }

                InfoPop.extends(Popup);
                return InfoPop;
            }()),

            ErrorPop = (function () {
                function ErrorPop(title, message) {
                    Popup.call(this, title, message, 'error', 'topRight', true, 1000, true, false);
                    this.popupData.fadeOutOnClick = true;
                }

                ErrorPop.extends(Popup);
                return ErrorPop;
            }()),

            WarningPop = (function () {
                function WarningPop(title, message, callback) {
                    Popup.call(this, title, message, 'warning', 'bottomRight', true, 0, false, callback);
                }

                WarningPop.extends(Popup);
                return WarningPop;
            }());

        return {
            SuccessPop: SuccessPop,
            InfoPop: InfoPop,
            ErrorPop: ErrorPop,
            WarningPop: WarningPop
        };
    }());

    return (function () {
        function pop(type, title, message, callback) {
            "use strict";
            var popup, view;
            switch (type) {
                case 'success':
                    popup = new data.SuccessPop(title, message);
                    break;
                case 'info':
                    popup = new data.InfoPop(title, message);
                    break;
                case 'warning':
                    popup = new data.WarningPop(title, message, callback);
                    break;
                case 'error':
                    popup = new data.ErrorPop(title, message);
                    break;
            }

            view = createPopupView(popup);
            processPopup(view, popup);
        }

        function fadeIn(el) {
            el.style.transition = "opacity 1000ms";
            el.style.opacity = 0;
            document.getElementById('wrapper').appendChild(el);
            setTimeout(function () {
                el.style.opacity = 1;
            }, 300);
        }

        function fadeOut(domView) {
            var timeoutID = setTimeout(function () {
                domView.style.opacity = 0;
                clearTimeout(timeoutID);
            }, 1200);

            setTimeout(function () {
                $('.poppy-container').remove();
            }, 2700);
        }

        function processPopup(domView, popup) {
            "use strict";

            $('.poppy-' + popup.popupData.type).remove();

            fadeIn(domView);
            if (popup.popupData.closeButton) {
                var button = document.getElementsByClassName('poppy-close-button')[0];
                button.addEventListener('click', function () {
                    fadeOut(domView, popup.popupData.timeOut);
                });
            }
            if (popup.popupData.fadeOutOnClick) {
                domView.addEventListener('click', function () {
                    fadeOut(domView, popup.popupData.timeOut);
                });
            }
            if (popup.popupData.autoHide) {
                setTimeout(function () {
                    fadeOut(domView);
                }, popup.popupData.timeOut);
            }
            if (popup.popupData.callback) {
                domView.addEventListener('click', popup.popupData.callback);
            }
        }

        return {
            pop: pop
        };
    }());
}());